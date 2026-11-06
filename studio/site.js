(() => {
  const dialog = document.querySelector('#displaydj-preview');
  if (!dialog || typeof dialog.showModal !== 'function') return;
  let opener;
  let previousOverflow = '';
  document.querySelectorAll('[data-image-preview]').forEach(button => {
    button.addEventListener('click', () => {
      opener = button;
      const source = button.querySelector('img');
      const image = dialog.querySelector('img');
      const title = dialog.querySelector('#preview-title');
      image.src = source.src;
      image.setAttribute('width', source.getAttribute('width'));
      image.setAttribute('height', source.getAttribute('height'));
      image.dataset.i18nAlt = source.dataset.i18nAlt;
      image.alt = source.alt;
      title.dataset.i18n = button.dataset.previewTitle;
      title.textContent = window.portfolioI18n.t(button.dataset.previewTitle);
      dialog.querySelector('.image-preview-original').href = source.src;
      previousOverflow = document.body.style.overflow;
      dialog.showModal();
      document.body.style.overflow = 'hidden';
    });
  });
  dialog.querySelector('.image-preview-close')?.addEventListener('click', () => dialog.close());
  dialog.addEventListener('click', event => {
    if (event.target !== dialog) return;
    const rect = dialog.getBoundingClientRect();
    if (event.clientX < rect.left || event.clientX > rect.right || event.clientY < rect.top || event.clientY > rect.bottom) dialog.close();
  });
  dialog.addEventListener('close', () => {
    document.body.style.overflow = previousOverflow;
    opener?.focus({ preventScroll: true });
  });
})();
