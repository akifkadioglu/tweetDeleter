function removeTweetPhotos() {
  document.querySelectorAll('div[data-testid="videoPlayer"]').forEach((div) => {
    let parent = div;
    let steps = 18;
    while (steps > 0 && parent) {
      parent = parent.parentElement;
      steps--;
    }
    if (parent) {
      const separator = document.createElement('div');
      separator.setAttribute('role', 'separator');
      separator.style.margin = '15px';
      separator.style.fontFamily = 'Roboto, sans-serif';
      separator.innerHTML = "<p>This tweet contains a video.</p>";
      parent.replaceWith(separator);
    }
  });
}

const observer = new MutationObserver(() => {
  removeTweetPhotos();
});

observer.observe(document.body, { childList: true, subtree: true });

removeTweetPhotos();
