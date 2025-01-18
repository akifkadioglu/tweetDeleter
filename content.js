function removeTweetPhotos() {
  document.querySelectorAll('div[data-testid="videoPlayer"]').forEach((div) => {
    let parent = div;
    let steps = 18;
    while (steps > 0 && parent) {
      parent = parent.parentElement;
      steps--;
    }
    if (parent) {
      parent.remove();
    }
  });
}
const observer = new MutationObserver(() => {
  removeTweetPhotos();
});
observer.observe(document.body, { childList: true, subtree: true });
removeTweetPhotos();
