// import galleryItems from './gallery-items.js';
// import galleryItems from './gallery-items.js';
import galleryItem from './gallery-items.js';

const listGalleryRef = document.querySelector('.js-gallery');
const modalRef = document.querySelector('.js-lightbox');
const imageModalRef = document.querySelector('.lightbox__image');
// const contentModalRef = document.querySelector('.lightbox__content');
const closeModalButton = document.querySelector('button[data-action="close-lightbox"]');
const overlayRef = document.querySelector('.lightbox__overlay');
let indexCurrentImage;

listGalleryRef.addEventListener('click', onOpenModal)


// function createGallery() {
//     let markup = '';
//     for (let i = 0; i < galleryItem.length; i += 1) {
//         // console.log(galleryItem[i]);
//         markup += `<li class="gallery__item">
//         <a 
//         class="gallery__link" 
//         href= "${galleryItem[i].original}"
//         >
//         <img 
//         class="gallery__image"
//          src="${galleryItem[i].preview}"
//         data-source="${galleryItem[i].original}"
//         alt="${galleryItem[i].description}"
//         data-index ="${i}" />
//             </a>
//         </li>`
//     }
//     listGalleryRef.innerHTML = markup

// }


function createLi({ original, preview, description }, index) {
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

    // console.log('img', img);
    // console.log('li', li);
    // console.log('a', a);
}


function createGallery(galleryItem) {
    return galleryItem.map((liItem, index) => {
        return createLi({
                original: liItem.original,
                preview: liItem.preview,
                description: liItem.description
            },
            index,
        );

    });
};
// createGallery(galleryItem);
listGalleryRef.append(...createGallery(galleryItem));


// const galleryItem = {
//         preview: 'https://cdn.pixabay.com/photo/2019/05/14/22/05/container-4203677__340.jpg',
//         original: 'https://cdn.pixabay.com/photo/2019/05/14/22/05/container-4203677_1280.jpg',
//         description: 'Container Haulage Freight',
//     },

//     createGallery({ galleryItem }, 0);






function onOpenModal(event) {
    event.preventDefault();
    // console.log(event.target.dataset);
    // console.log(event.target.alt);
    if (event.target.nodeName !== 'IMG') {
        return;
    }
    indexCurrentImage = Number(event.target.dataset.index);
    modalRef.classList.add('is-open');
    imageModalRef.src = event.target.dataset.source;
    imageModalRef.alt = event.target.alt;
    // console.log(event.target.nodeName);
    closeModalButton.addEventListener('click', onCloseModal);
    overlayRef.addEventListener('click', onCloseModal);
    window.addEventListener('keydown', onCloseModal);
}




function onCloseModal() {
    modalRef.classList.remove('is-open');
    imageModalRef.src = '';
}

function onPressKey(event) {
    switch (event.code) {
        case 'Escape':
            onCloseModal();
            break;
        case 'ArrowRight':
            indexCurrentImage + 1 === galleryItems.length ?
                (indexCurrentImage = 0) :
                (indexCurrentImage += 1);
            imageModalRef.src = galleryItems[indexCurrentImage].original;
            break;
        case 'ArrowLeft':
            indexCurrentImage === 0 ?
                (indexCurrentImage = galleryItems.length - 1) :
                (indexCurrentImage -= 1);
            imageModalRef.src = galleryItems[indexCurrentImage].original;
            break;

        default:
            break;
    }
}



// createGallery();