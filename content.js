const showPhotos = localStorage.getItem("showPhotos");
const showVideos = localStorage.getItem("showVideos");
const showMedialess = localStorage.getItem("showMedialess");
chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
  if (message.type === "updateSettings") {
    localStorage.setItem("showPhotos", message.showPhotos);
    localStorage.setItem("showVideos", message.showVideos);
    localStorage.setItem("showMedialess", message.showMedialess);
    sendResponse({
      showPhotos: message.showPhotos,
      showVideos: message.showVideos,
      showMedialess: message.showMedialess,
    });
  } else if (message.type === "initSettings") {
    sendResponse({
      showPhotos: localStorage.getItem("showPhotos"),
      showVideos: localStorage.getItem("showVideos"),
      showMedialess: localStorage.getItem("showMedialess"),
    });
  }
});

function removeTweetPhotos() {
  var query = [];
  if (showVideos === "false") {
    query.push('div[data-testid="placementTracking"]');
  }
  if (showPhotos === "false") {
    query.push('img[src*="?format=jpg"], img[src*="?format=png"]');
  }
  if (showMedialess === "false") {
    query.push('div[data-testid="tweetText"]');
  }
  if (query.length === 0) {
    return;
  }
  query = query.join(", ");
  let text = "";
  let attribute = "";
  document.querySelectorAll(query).forEach((div) => {
    let parent = div;
    let steps = 0;
    attribute = div.getAttribute("data-testid");
    if (attribute === "tweetText") {
      steps = 1;
      text = "Text Deleted";
    } else if (attribute === "placementTracking") {
      steps = 4;
      text = "Video Deleted";
    } else {
      steps = 4;
      text = "Photo Deleted";
    }
    while (steps > 0 && parent) {
      parent = parent.parentElement;
      steps--;
    }
    if (parent) {
      const separator = document.createElement("div");
      separator.setAttribute("role", "separator");
      separator.style.margin = "15px";
      separator.style.fontFamily = "Roboto, sans-serif";
      separator.innerHTML = "<p>" + text + "</p>";
      parent.replaceWith(separator);
    }
  });
}

const observer = new MutationObserver(() => {
  removeTweetPhotos();
});

observer.observe(document.body, { childList: true, subtree: true });

removeTweetPhotos();
