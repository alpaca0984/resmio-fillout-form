{
  const saveDefault = () => {
    return new Promise((resolve, _reject) => {
      chrome.storage.sync.set({
        name: "foo",
        email: "foo@example.com",
      }, () => {
        resolve();
      });
    });
  }
  const loadData = () => {
    return new Promise((resolve, _reject) => {
      chrome.storage.sync.get(null, (items) => {
        resolve(items);
      });
    })
  };

  chrome.runtime.onInstalled.addListener(async () => {
    await saveDefault();
    const items = await loadData();
    console.error(JSON.stringify(items));
  });
}
