(async () => {
  document.getElementById("fillInformation")
    .addEventListener("click", async () => {
      const [tab] = await chrome.tabs.query({
        active: true,
        currentWindow: true,
      });
      chrome.scripting.executeScript({
        target: { tabId: tab.id },
        // @see utils.js
        function: fillOutInformation,
      });
    });
})();
