document.addEventListener('mousemove', function (e) {
    const chance = Math.random();

    if (chance < 0.05) {
        createPixel(e.pageX, e.pageY);
    }
});

function createPixel(x, y) {
    const pixel = document.createElement('div');

    pixel.classList.add('cursor-trail');

    if (Math.random() < 1 / 3) {
        if (Math.random() < 1 / 3){
            pixel.classList.add('cursor-trail-primarybis');
        } else {
            if (Math.random() < 1 / 3){
                pixel.classList.add('cursor-trail-secondary');
            } else pixel.classList.add('cursor-trail-secondarybis');
        }
    } else {
        pixel.classList.add('cursor-trail-primary');
    }

    // Taille aléatoire entre 5px et 20px
    const size = Math.random() * 15 + 5;
    pixel.style.width = `${size}px`;
    pixel.style.height = `${size}px`;

    pixel.style.left = `${x}px`;
    pixel.style.top = `${y}px`;

    document.body.appendChild(pixel);

    // Supprime le carré
    setTimeout(() => {
        pixel.remove();
    }, 1000);
}
