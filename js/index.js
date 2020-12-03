import galleryItem from './gallery-items.js';

const listGallery = document.querySelector('.js-gallery');
const modalRef = document.querySelector('.js-lightbox');
const imageModalRef = document.querySelector('.lightbox__image');
const closeModalButton = document.querySelector('button[data-action="close-lightbox"]');
const overlayRef = document.querySelector('.lightbox__overlay');
let indexCurrentImg;

listGallery.addEventListener('click', onOpenModal)


function createElemLi({ original, preview, description }, index) {
    const li = document.createElement('li');
    const a = document.createElement('a');
    const img = document.createElement('img');

    li.classList.add('gallery__item');
    a.classList.add('gallery__link');
    img.classList.add('gallery__image');

    a.href = original;
    img.src = preview;
    img.alt = description;
    img.setAttribute('data-source', original);
    img.setAttribute('data-index', index);


    a.append(img);
    li.append(a);

    return li;
}


function createGallery(galleryItem) {
    return galleryItem.map((liItem, index) => {
        return createElemLi({
                original: liItem.original,
                preview: liItem.preview,
                description: liItem.description
            },
            index,
        );

    });
};

listGallery.append(...createGallery(galleryItem));


function onOpenModal(event) {
    event.preventDefault();
    if (event.target.nodeName !== 'IMG') {
        return;
    }
    indexCurrentImg = Number(event.target.dataset.index);
    modalRef.classList.add('is-open');
    imageModalRef.src = event.target.dataset.source;
    imageModalRef.alt = event.target.alt;
    closeModalButton.addEventListener('click', onCloseModal);

    overlayRef.addEventListener('click', onCloseModal);
    window.addEventListener('keydown', onCloseModal);
}

function onCloseModal() {
    modalRef.classList.remove('is-open');
    closeModalButton.removeEventListener('click', onCloseModal);
    imageModalRef.src = '';
}