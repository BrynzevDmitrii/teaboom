export function initImageGallery() {
  const productImage = document.getElementById('productImage');
  const imageTrigger = document.getElementById('imageTrigger');
  const imageDialog = document.getElementById('imageDialog');
  const imageDialogImg = document.getElementById('imageDialogImg');
  const imageDialogClose = document.getElementById('imageDialogClose');

  productImage.addEventListener('error', () => {
    productImage.src = productImage.dataset.fallback;
    productImage.classList.add('product__image--fallback');
  }, { once: true });

  imageTrigger.addEventListener('click', () => {
    imageDialogImg.src = productImage.currentSrc || productImage.src;
    imageDialogImg.alt = productImage.alt;
    imageDialog.showModal();
  });

  imageDialogClose.addEventListener('click', () => imageDialog.close());

  imageDialog.addEventListener('click', (event) => {
    if (event.target === imageDialog) imageDialog.close();
  });
}
