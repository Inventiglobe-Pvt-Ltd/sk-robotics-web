document.getElementById('downloadBtn').addEventListener('click', () => {
    const targetDate = document.getElementById('dateInput').value.trim();
    const statusDiv = document.getElementById('status');

    if (!targetDate) {
        statusDiv.style.color = "red";
        statusDiv.textContent = "⚠️ Please enter a Date.";
        return;
    }

    statusDiv.style.color = "blue";
    statusDiv.textContent = "Starting background sync...";

    // Send a message to our own background.js file
    chrome.runtime.sendMessage({ action: "download_icdc", date: targetDate }, (response) => {
        if (response && response.status === "success") {
            statusDiv.style.color = "green";
            statusDiv.textContent = "✅ Process started! Check your downloadsss.";
        } else {
            statusDiv.style.color = "red";
            statusDiv.textContent = "❌ Extension error.";
        }
    });
});