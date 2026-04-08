// SELECT ELEMENTS
const slides = document.querySelectorAll('.carousel-item');
const clickers = document.querySelectorAll('.carousel-icon');

// MAIN FUNCTION (Reusable)
function updateCarousel(index) {
    // update clickers
    clickers.forEach(c => c.classList.remove('active'));
    clickers[index].classList.add('active');

    // reset slides
    slides.forEach(s => s.classList.remove('active', 'active-fade'));

    // set active slide
    slides[index].classList.add('active');

    // add active-fade to previous slides only
    for (let i = 0; i < index; i++) {
        slides[i].classList.add('active-fade');
    }
}

// CLICK FUNCTIONALITY
clickers.forEach((ele, index) => {
    ele.addEventListener('click', () => {
        updateCarousel(index);
    });
});

