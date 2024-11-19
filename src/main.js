import dataSkins from "./skins.js";

document.addEventListener('mousemove', function (e) {
    const chance = Math.random();

    if (chance < 0.3) {
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

document.addEventListener('DOMContentLoaded', async () => {
    const heroUl = document.querySelector('#hero-ul');
    const heroImage = document.querySelector('#right picture img');
    const textHero = document.querySelector('#text-hero i');

    Object.entries(dataSkins.skins).forEach(([name, details], index) => {
        const li = document.createElement('li');
        if (index === 0) li.classList.add('active');

        const img = document.createElement('img');
        img.src = `./src/img/${details.img}.png`;
        img.alt = name;

        li.appendChild(img);
        heroUl.appendChild(li);

        li.addEventListener('click', () => {
            heroImage.src = `./src/img/${details.img}.png`;
            textHero.textContent = name;

            document.querySelectorAll('#hero-ul li').forEach((item) => item.classList.remove('active'));
            li.classList.add('active');
        });

        if (index === 0) {
            heroImage.src = `./src/img/${details.img}.png`;
            textHero.textContent = name;
        }
    });
});
