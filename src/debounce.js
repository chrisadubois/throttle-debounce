let id;

export function debounce(cb, time) {
  if (id) {
    clearTimeout(id);
  }
  id = setTimeout(cb, time);
}
