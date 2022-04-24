(async () => {
  const setPageBackgroundColor = async () => {
    const data = await chrome.storage.sync.get(null);
    Object.entries(data).forEach(([name, value]) => {
      $elem = document.body.querySelector(`input[name='${name}']`);
      if ($elem != null) {
        $elem.value = value;
      }
    });
  };

  document.getElementById("fillInformation")
    .addEventListener("click", async () => {
      const [tab] = await chrome.tabs.query({
        active: true,
        currentWindow: true,
      });
      chrome.scripting.executeScript({
        target: { tabId: tab.id },
        function: setPageBackgroundColor,
      });
    });
})();
