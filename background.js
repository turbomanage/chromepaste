'use strict';

/**
 * Retrieve the current content of the system clipboard.
 */
function getContentFromClipboard() {
    var result = '';
    var receiver = document.getElementById('paste_receiver');
    receiver.value = '';
    receiver.select();
    if (document.execCommand('paste')) {
        result = receiver.value;
    }
    receiver.value = '';
    return result;
}

/**
 * Send the value to be shown to the popup page's DOM
 */
function sendPasteToPopup(toBePasted) {
    // strip prefixing http/s
    var matchedURL = /^https?:\/\/(.*)/.exec(toBePasted);
    if (matchedURL)
        // Add newlines to slashes so it can wrap links across lines
        toBePasted = matchedURL[1].replace(new RegExp("/", 'g'),"/\n");
    // based on https://stackoverflow.com/questions/13546778/how-to-communicate-between-popup-js-and-background-js-in-chrome-extension
    var views = chrome.extension.getViews({
        type: "popup"
    });
    views[0].document.getElementById("show").innerText = toBePasted;
}

/**
 * Called from popup.js on click
 */
function paste() {
    sendPasteToPopup(getContentFromClipboard());
}