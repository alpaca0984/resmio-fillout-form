(async () => {
  const handleButtonClick = async function() {
    const entries = Array.from(document.body.querySelectorAll("input"))
      .map((elem) => [elem.name, elem.value]);
    await chrome.storage.sync.set(Object.fromEntries(entries));
    alert("saved!")
  };
  document.getElementById("save")
    .addEventListener("click", handleButtonClick);

  const loadData = async function() {
    const data = await chrome.storage.sync.get(null);
    Object.entries(data).forEach(([key, value]) => {
      const $elem = document.body.querySelector(`input[name='${key}']`);
      if ($elem != null) {
        $elem.value = value;
      }
    });
  };
  await loadData();
})();
