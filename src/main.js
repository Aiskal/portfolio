import dataSkins from "./skins.js";
import dataProjects from "./projects.js";

//PIXELS SUR SOURIS
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


// DYNAMIC ELEMENTS
document.addEventListener('DOMContentLoaded', async () => {
    /// SKINS
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
    /// --- SKINS

    /// PROJECTS
    const levelsSection = document.querySelector("#levels");
    const MIN_PROJECTS = 5;

    let levelsUl = levelsSection.querySelector("ul");
    if (!levelsUl) {
        levelsUl = document.createElement("ul");
        levelsSection.appendChild(levelsUl);
    }

    Object.entries(dataProjects.projects).forEach(([category, projects], index) => {
        if (projects.length > 0) {
            const li = document.createElement("li");
    
            const h4 = document.createElement("h4");
            h4.textContent = category === "What do I play?" ? "World bonus" : `World ${index + 1}`;
            li.appendChild(h4);
    
            const iElement = document.createElement("i");
            iElement.textContent = category;
            li.appendChild(iElement);

            const projectContainer = document.createElement("div");
            projectContainer.classList.add("carousel");

            projects.forEach((project) => {
                if (project.img) {
                    const projectDiv = document.createElement("div");
                    projectDiv.classList.add("carousel-item");

                    const img = document.createElement("img");
                    img.src = project.img;
                    img.alt = project.name;

                    const overlay = document.createElement("div");
                    overlay.classList.add("overlay");
                    overlay.innerHTML = `
                        <h4>${project.name}</h4>
                        <p>${project.description}</p>
                    `;

                    const plusDiv = document.createElement("div");
                    plusDiv.classList.add("plus");
                    Object.entries(project).forEach(([key, value]) => {
                        if (!['img', 'name', 'description', 'link'].includes(key)) {
                            const p = document.createElement("p");
                            p.innerHTML = `<strong>${key}:</strong> ${value}`;
                            plusDiv.appendChild(p);
                        }
                    });

                    overlay.appendChild(plusDiv);
                    overlay.innerHTML += `
                        <a href="${project.link}" target="_blank">See More</a>
                    `;

                    img.addEventListener("click", () => {
                        const isActive = overlay.classList.contains("active");

                        document.querySelectorAll(".overlay").forEach((overlay) => overlay.classList.remove("active"));
                        document.querySelectorAll(".carousel-item").forEach((item) => item.classList.remove("active"));
                    
                        if (!isActive) {
                            overlay.classList.add("active");
                            projectDiv.classList.add("active");
                        }
                    });

                    projectDiv.appendChild(img);
                    projectDiv.appendChild(overlay);
                    projectContainer.appendChild(projectDiv);
                }
            });

            const projectsToAdd = MIN_PROJECTS - projects.length;
            if (projectsToAdd > 0) {
                for (let i = 0; i < projectsToAdd; i++) {
                    const lockDiv = document.createElement("div");
                    lockDiv.classList.add("carousel-item", "lock");

                    const lockImg = document.createElement("span");
                    lockImg.classList.add("img-lock");

                    lockDiv.appendChild(lockImg);
                    projectContainer.appendChild(lockDiv);
                }
            }

            li.appendChild(projectContainer);
            levelsUl.appendChild(li);
        }
    });
    /// --- PROJECTS

    /// GRAB CAROUSEL
    const carousels = document.querySelectorAll('.carousel');

    carousels.forEach((carousel) => {
        let isDragging = false;
        let startX, scrollLeft;

        carousel.addEventListener('mousedown', (e) => {
            isDragging = true;
            startX = e.pageX - carousel.offsetLeft;
            scrollLeft = carousel.scrollLeft;
            carousel.style.cursor = 'grabbing';
        });

        carousel.addEventListener('mouseleave', () => {
            isDragging = false;
            carousel.style.cursor = 'grab';
        });

        carousel.addEventListener('mouseup', () => {
            isDragging = false;
            carousel.style.cursor = 'grab';
        });

        carousel.addEventListener('mousemove', (e) => {
            if (!isDragging) return;
            e.preventDefault();

            const x = e.pageX - carousel.offsetLeft; 
            const walk = (x - startX) * 2;
            carousel.scrollLeft = scrollLeft - walk;
        });
    })
    /// --- GRAB CAROUSEL
});
