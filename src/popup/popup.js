// Requires content.js

document.getElementById("fillInformation")
  .addEventListener("click", async () => {
    const [tab] = await chrome.tabs.query({
      active: true,
      currentWindow: true,
    });
    chrome.scripting.executeScript({
      target: { tabId: tab.id },
      // The `func` doesn't carry over any of the current execution context of the function.
      //  https://developer.chrome.com/docs/extensions/reference/scripting/#runtime-functions
      func: fillOutInformation,
      args: [fieldNames],
    });
  });
