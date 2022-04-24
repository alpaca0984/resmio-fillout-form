async function fillOutInformation() {
  const data = await chrome.storage.sync.get(null);
  Object.entries(data).forEach(([name, value]) => {
    $elem = document.body.querySelector(`input[name='${name}']`);
    if ($elem != null) {
      $elem.value = value;
    }
  });
}
