'use strict';

retrieveSavedSize();

var bgPage = chrome.extension.getBackgroundPage();
bgPage.paste();

document.getElementById("inc").addEventListener("click", function () {
    var size = getFontSize();
    setFontSize(Math.min(9,++size));
})

document.getElementById("dec").addEventListener("click", function () {
    var size = getFontSize();
    console.log(size);
    setFontSize(Math.max(1,--size));
})

function getFontSize () {
    var showStyle = document.getElementById("show").style;
    // "3em", extract the single-digit size
    return /\d/.exec(showStyle.fontSize);
}

function setFontSize (newSize) {
    var showStyle = document.getElementById("show").style;
    showStyle.fontSize = newSize + "em";
    // Save default for future popups
    chrome.storage.local.set({"emSize": newSize}, function() {
        console.log('Value is set to ' + newSize);
    });
}

// Retrieve saved font size and set in the DOM
function retrieveSavedSize() {
    chrome.storage.local.get("emSize", function (result) {
        var savedSize = result.emSize;
        if (savedSize) {
            setFontSize(savedSize);
        }
    });
}
