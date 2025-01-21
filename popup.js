function init() {
  chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
    chrome.tabs
      .sendMessage(tabs[0].id, {
        type: "initSettings",
      })
      .then((response) => {
        if (chrome.runtime.lastError) {
          console.error(
            "Mesaj gönderilemedi:",
            chrome.runtime.lastError.message
          );
        } else {
          document.getElementById("showPhotos").checked =
            response.showPhotos === "true";

          document.getElementById("showVideos").checked =
            response.showVideos === "true";

          document.getElementById("showMedialess").checked =
            response.showMedialess === "true";
        }
      });
  });
}
function sendSettingsToContentScript() {
  const showPhotos = document.getElementById("showPhotos").checked;
  const showVideos = document.getElementById("showVideos").checked;
  const showMedialess = document.getElementById("showMedialess").checked;

  chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
    chrome.tabs
      .sendMessage(tabs[0].id, {
        type: "updateSettings",
        showPhotos: showPhotos,
        showVideos: showVideos,
        showMedialess: showMedialess,
      })
      .then((response) => {
        if (chrome.runtime.lastError) {
          console.error(
            "Mesaj gönderilemedi:",
            chrome.runtime.lastError.message
          );
        }
      });
  });
}

document
  .getElementById("showPhotos")
  .addEventListener("change", sendSettingsToContentScript);
document
  .getElementById("showVideos")
  .addEventListener("change", sendSettingsToContentScript);
document
  .getElementById("showMedialess")
  .addEventListener("change", sendSettingsToContentScript);

init();
