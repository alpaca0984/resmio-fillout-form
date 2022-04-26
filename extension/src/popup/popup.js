const fieldNames = ["name", "email", "phone"];

async function save() {
  const entries = Array.from(document.body.querySelectorAll("input"))
    .filter((elem) => fieldNames.includes(elem.name))
    .map((elem) => [elem.name, elem.value]);
  await chrome.storage.sync.set(Object.fromEntries(entries));
}

async function fillOut(fields = fieldNames) {
  const data = await chrome.storage.sync.get(fields);
  const inputEvent = new Event("input");
  Object.entries(data).forEach(([name, value]) => {
    const $elem = document.body.querySelector(`input[name='${name}']`);
    if ($elem != null) {
      $elem.value = value;
      $elem.dispatchEvent(inputEvent);
    }
  });
}

document.getElementById("fillInformation")
  .addEventListener("click", async () => {
    await save();

    const [tab] = await chrome.tabs.query({
      active: true,
      currentWindow: true,
    });
    chrome.scripting.executeScript({
      target: { tabId: tab.id },
      // The `func` doesn't carry over any of the current execution context of the function.
      //  https://developer.chrome.com/docs/extensions/reference/scripting/#runtime-functions
      func: fillOut,
      args: [fieldNames]
    });
  });

document.addEventListener('DOMContentLoaded', async function () {
  // Fill extension form
  await fillOut();
}, false);
