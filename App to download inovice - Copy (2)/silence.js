const originalAlert = window.alert;

window.alert = function(msg) {
    if (msg && typeof msg === 'string' && msg.toLowerCase().includes("applet")) {
        console.log("Extension Shield: Blocked Applet Popup.");
    } else {
        originalAlert(msg);
    }
};