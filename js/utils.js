// utils.js
export function isClickedOutsideModal(event, modal) {
  return !modal.contains(event.target);
}

export function handleClickOutsideModal(event, modal) {
  if (isClickedOutsideModal(event, modal)) {
    document.body.classList.remove("no-scroll");
    modal.style.display = "none";
  }
}
