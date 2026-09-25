export function scrollToHash(event, hash) {
  const target = document.querySelector(hash);
  if (!target) return;

  event.preventDefault();
  window.history.replaceState(null, '', hash);
  target.scrollIntoView();
}
