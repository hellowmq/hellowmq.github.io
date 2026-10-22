(() => {
  const dialog = document.querySelector('#displaydj-preview');
  if (!dialog || typeof dialog.showModal !== 'function') return;
  const open = document.querySelector('[data-image-preview]');
  let previousOverflow = '';
  open?.addEventListener('click', () => {
    previousOverflow = document.body.style.overflow;
    dialog.showModal();
    document.body.style.overflow = 'hidden';
  });
  dialog.querySelector('.image-preview-close')?.addEventListener('click', () => dialog.close());
  dialog.addEventListener('click', event => {
    if (event.target !== dialog) return;
    const rect = dialog.getBoundingClientRect();
    if (event.clientX < rect.left || event.clientX > rect.right || event.clientY < rect.top || event.clientY > rect.bottom) dialog.close();
  });
  dialog.addEventListener('close', () => {
    document.body.style.overflow = previousOverflow;
    open?.focus({ preventScroll: true });
  });
})();
