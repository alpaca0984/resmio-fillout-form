const fieldNames = ["name", "email", "phone"];

async function fillOutInformation(fields = fieldNames) {
  const data = await chrome.storage.sync.get(fields);
  Object.entries(data).forEach(([name, value]) => {
    $elem = document.body.querySelector(`input[name='${name}']`);
    if ($elem != null) {
      $elem.value = value;
    }
  });
}
