console.log("TGBCL Autofill: Waiting for credentials from Web App...");

let attempts = 0;
const maxAttempts = 10; // Try for 5 seconds total

const waitInterval = setInterval(() => {
    attempts++;
    
    // Check memory for the credentials
    chrome.storage.local.get(['tempUserId', 'tempPassword'], function(data) {
        if (data.tempUserId && data.tempPassword) {
            clearInterval(waitInterval); // Stop waiting, we found them!
            console.log("Credentials received! Scanning page for the login form...");
            executeAutofill(data.tempUserId, data.tempPassword);
        } else if (attempts >= maxAttempts) {
            clearInterval(waitInterval);
            console.log("No credentials arrived from Web App. Manual login required.");
        }
    });
}, 500); // Check every half-second

function executeAutofill(userId, password) {
    const autofillInterval = setInterval(() => {
        const passBox = document.querySelector('input[type="password"]');

        if (passBox) {
            let userBox = document.querySelector('input[name*="username" i], input[name*="userid" i], input[id*="username" i]');
            
            if (!userBox) {
                const allInputs = Array.from(document.querySelectorAll('input:not([type="hidden"])'));
                const passIndex = allInputs.indexOf(passBox);
                if (passIndex > 0) userBox = allInputs[passIndex - 1];
            }

            let captchaBox = document.querySelector('input[name*="captcha" i], input[name*="verify" i], input[id*="captcha" i]');
            
            if (!captchaBox) {
                 const allInputs = Array.from(document.querySelectorAll('input:not([type="hidden"])'));
                 const passIndex = allInputs.indexOf(passBox);
                 if (passIndex !== -1 && passIndex + 1 < allInputs.length) {
                     captchaBox = allInputs[passIndex + 1];
                 }
            }

            const fillField = (element, text) => {
                if (element && !element.value) {
                    element.focus();
                    element.value = text;
                    element.dispatchEvent(new Event('input', { bubbles: true }));
                    element.dispatchEvent(new Event('change', { bubbles: true }));
                    element.blur();
                }
            };

            // Inject the dynamic credentials
            fillField(userBox, userId);
            fillField(passBox, password);

            if (captchaBox) {
                captchaBox.focus();
                captchaBox.style.border = "3px solid #4CAF50"; 
            }

            console.log("Credentials successfully auto-filled!");
            
            // SECURITY: Instantly wipe them from memory
            chrome.storage.local.remove(['tempUserId', 'tempPassword']);
            clearInterval(autofillInterval); 
        }
    }, 1000);
}