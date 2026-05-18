// 1. Listen for requests from External Web App
chrome.runtime.onMessageExternal.addListener((request, sender, sendResponse) => {
    if (request.action === "download_icdc") {
        handleDownloadRequest(request, sendResponse);
        return true;
    }
});

// 2. The Logic Controller
async function handleDownloadRequest(requestData, sendResponse) {
    // Always save the date range AND credentials to memory immediately
    const startDate = requestData.startDate || requestData.date;
    const endDate = requestData.endDate || requestData.date;
    
    await chrome.storage.local.set({ 
        pendingStartDate: startDate,
        pendingEndDate: endDate,
        pendingDownloadDate: requestData.date, // fallback
        tempUserId: requestData.userId,
        tempPassword: requestData.password
    });

    // ALWAYS open a clean, new Chrome browser window for the extension run
    chrome.windows.create({ 
        url: "https://tgbcl.telangana.gov.in/ts/index.php/GOAPVENDORCREDIT/venddup",
        focused: true,
        state: "maximized"
    });

    sendResponse({ 
        status: "login_required", 
        message: "Opening portal in a new Chrome window. Auto-filling credentials..." 
    });
}

// 3. THE AUTO-RESUME WATCHER
chrome.tabs.onUpdated.addListener(async (tabId, changeInfo, tab) => {
    if (changeInfo.status === 'complete' && tab.url && tab.url.includes("tgbcl.telangana.gov.in")) {
        const data = await chrome.storage.local.get(["pendingStartDate", "pendingEndDate", "pendingDownloadDate"]);
        
        if (data.pendingStartDate || data.pendingDownloadDate) {
            const isVenddupPage = tab.url.includes("venddup");

            if (!isVenddupPage) {
                chrome.scripting.executeScript({
                    target: { tabId: tabId },
                    func: () => { return document.querySelector('input[type="password"]') !== null; }
                }, async (results) => {
                    if (results && results[0] && results[0].result === false) {
                        chrome.tabs.update(tabId, { url: "https://tgbcl.telangana.gov.in/ts/index.php/GOAPVENDORCREDIT/venddup" });
                    }
                });
            } else {
                const startDate = data.pendingStartDate || data.pendingDownloadDate;
                const endDate = data.pendingEndDate || data.pendingDownloadDate;
                
                // Clear the storage to prevent double execution
                await chrome.storage.local.remove(["pendingStartDate", "pendingEndDate", "pendingDownloadDate"]);
                
                setTimeout(() => { runInjectedScraper(tab, startDate, endDate); }, 4000);
            }
        }
    }
});

// 4. THE SCRAPER, CSV EXPORTER & AUTO-LOGOUT
async function runInjectedScraper(tab, startDate, endDate) {
    try {
        await chrome.scripting.executeScript({
            target: { tabId: tab.id },
            func: async (startD, endD) => {
                // Robust date parsing helper
                function parseDateString(str) {
                    if (!str) return null;
                    str = str.trim();
                    const months = ["jan", "feb", "mar", "apr", "may", "jun", "jul", "aug", "sep", "oct", "nov", "dec"];
                    const parts = str.split('-');
                    if (parts.length === 3) {
                        const day = parseInt(parts[0], 10);
                        const year = parseInt(parts[2], 10);
                        const monthStr = parts[1].toLowerCase();
                        let month = months.indexOf(monthStr);
                        if (month !== -1) {
                            return new Date(year, month, day);
                        }
                        month = parseInt(parts[1], 10) - 1;
                        if (!isNaN(month) && month >= 0 && month < 12) {
                            return new Date(year, month, day);
                        }
                    }
                    const parsed = new Date(str);
                    return isNaN(parsed.getTime()) ? null : parsed;
                }

                const start = parseDateString(startD);
                const end = parseDateString(endD);
                const startCompare = start ? new Date(start.getFullYear(), start.getMonth(), start.getDate()) : null;
                const endCompare = end ? new Date(end.getFullYear(), end.getMonth(), end.getDate()) : null;

                const rows = document.querySelectorAll('table tbody tr');
                if (rows.length === 0) return;

                let foundIds = [];
                rows.forEach(row => {
                    const cells = row.querySelectorAll('td');
                    if (cells.length >= 5) {
                        const cellDateStr = cells[1].innerText.trim();
                        const cellDate = parseDateString(cellDateStr);
                        if (cellDate) {
                            const currentCompare = new Date(cellDate.getFullYear(), cellDate.getMonth(), cellDate.getDate());
                            let inRange = true;
                            
                            if (startCompare && currentCompare < startCompare) inRange = false;
                            if (endCompare && currentCompare > endCompare) inRange = false;
                            
                            if (inRange) {
                                const match = row.innerHTML.match(/IND-TS\d+/);
                                if (match && !foundIds.includes(match[0])) foundIds.push(match[0]);
                            }
                        }
                    }
                });

                if (foundIds.length === 0) {
                    console.log("No invoices found within the specified date range.");
                    return;
                }

                console.log(`Found ${foundIds.length} invoices to scrape:`, foundIds);

                for (let i = 0; i < foundIds.length; i++) {
                    const currentId = foundIds[i];
                    try {
                        const payload = new URLSearchParams();
                        payload.append("icdc_id", currentId);
                        payload.append("printtype", "print"); 

                        const response = await fetch("/ts/index.php/site/printicdcs", {
                            method: 'POST', body: payload, headers: { 'Content-Type': 'application/x-www-form-urlencoded' }
                        });

                        const htmlContent = await response.text();
                        if (!htmlContent.includes('Invoice') && !htmlContent.includes('INVOICE')) continue;

                        let icdcTitle = currentId; 
                        const icdcMatch = htmlContent.match(/ICDC\d+/);
                        if (icdcMatch) icdcTitle = icdcMatch[0];

                        const parser = new DOMParser();
                        const doc = parser.parseFromString(htmlContent, 'text/html');
                        
                        let csvRows = [];
                        csvRows.push([`"${icdcTitle}"`]);
                        csvRows.push([]); 
                        csvRows.push(["Sl.No", "Brand Number", "Brand Name", "Product Type", "Pack Type", "Pack Qty", "Qty (Cases)", "Qty (Bottles)", "Rate / Case", "Total"]);

                        const allRows = doc.querySelectorAll('tr');
                        let totalCases = 0, totalBottles = 0;

                        allRows.forEach(row => {
                            const cells = row.querySelectorAll('td');
                            if (cells.length >= 8 && /^\d+$/.test(cells[0].textContent.trim())) { 
                                let rowData = [];
                                for(let c = 0; c < 10; c++) {
                                    rowData.push(`"${(cells[c] ? cells[c].innerText.replace(/(\r\n|\n|\r)/gm, ' ').trim() : "").replace(/"/g, '""')}"`);
                                }
                                csvRows.push(rowData);
                                totalCases += parseInt(cells[6] ? cells[6].innerText.replace(/,/g, '') : 0) || 0;
                                totalBottles += parseInt(cells[7] ? cells[7].innerText.replace(/,/g, '') : 0) || 0;
                            }
                        });

                        csvRows.push([], ["", "", "", "", "", `"GRAND TOTAL:"`, `"${totalCases}"`, `"${totalBottles}"`, "", ""], []);

                        let textBody = doc.body.innerText.replace(/\s+/g, ' '); 
                        function getFinVal(labelPattern) {
                            let match = textBody.match(new RegExp(labelPattern + "\\s*(?:Rs\\.?\\s*)?([\\d,]+(?:\\.\\d{2})?)", "i"));
                            return match ? match[1] : "";
                        }

                        const footerItems = [
                            { label: "Invoice Value:", regex: "Invoice Value:" },
                            { label: "T C S:", regex: "T\\s*C\\s*S\\s*:" },
                            { label: "Net Invoice Value:", regex: "Net Invoice Value:" }
                        ];
                        footerItems.forEach(item => {
                            let val = getFinVal(item.regex);
                            if (val) csvRows.push(["", "", "", "", "", "", "", `"${item.label}"`, `"${val}"`, ""]);
                        });

                        const blob = new Blob(["\uFEFF" + csvRows.map(r => r.join(",")).join("\n")], { type: 'text/csv;charset=utf-8;' }); 
                        const blobUrl = URL.createObjectURL(blob);
                        const link = document.createElement('a'); 
                        link.href = blobUrl; 
                        link.download = `${icdcTitle}.csv`; 
                        document.body.appendChild(link); 
                        link.click(); 
                        document.body.removeChild(link); 
                        URL.revokeObjectURL(blobUrl);

                        await new Promise(r => setTimeout(r, 1500));
                    } catch (err) { console.error("Fetch error:", err); }
                }

                await new Promise(resolve => {
                    setTimeout(() => {
                        const logoutBtn = document.querySelector('a[href*="logout" i]');
                        if (logoutBtn) logoutBtn.click();
                        else window.location.href = "/ts/index.php/site/logout";
                        resolve(); 
                    }, 1000);
                });
            },
            args: [startDate, endDate]
        });

        // Close the window's active tab after execution is complete
        setTimeout(() => { chrome.tabs.remove(tab.id).catch(() => {}); }, 2000);

    } catch (error) { console.error("Extension Error:", error); }
}