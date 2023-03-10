import { galleryItems } from "./gallery-items.js";
// Change code below this line

const gallery = document.querySelector(".gallery");
const result = createGallary(galleryItems);

gallery.insertAdjacentHTML("beforeend", result);

gallery.addEventListener("click", imageContainerClick);

function createGallary(galleryItems) {
  return galleryItems.reduce(
    (acc, { preview, original, description }) =>
      acc +
      `<div class="gallery__item">
        <a class="gallery__link" href=${original}>
          <img
            class="gallery__image"
            src=${preview}
            data-source=${original}
            alt=${description}
          />
        </a>
        </div>`,
    ""
  );
}

console.log(galleryItems);

function imageContainerClick(event) {
  event.preventDefault();
  const isImageEl = event.target.nodeName === "IMG";
  if (!isImageEl) {
    return;
  }

  const selectedImage = event.target.getAttribute("data-source");

  const instance = basicLightbox.create(
    `
    <img src="${selectedImage}" width="800" height="600">`,
    {
      onShow: (instance) => { document.addEventListener("keydown", closeEsc); },

      onClose: (instance) => { document.removeEventListener("keydown", closeEsc); }
    }
  );

  instance.show();

  function closeEsc(event) {
    if (event.code == "Escape") {
      instance.close();
    }
  };
}
