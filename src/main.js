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
    //SUB SECTION CV
    const menuItems = document.querySelectorAll('#hero-menu li:not(.cv)');
    const sections = document.querySelectorAll('.sub-section-cv');

    menuItems.forEach((item) => {
        item.addEventListener('click', () => {
            const index = item.getAttribute('data-index');

            // Activer l'élément de menu
            menuItems.forEach((el) => el.classList.remove('active'));
            item.classList.add('active');

            // Activer la sous-section correspondante
            sections.forEach((section) => {
                if (section.getAttribute('data-index') === index) {
                    section.classList.add('active');
                } else {
                    section.classList.remove('active');
                }
            });
        });
    });
    
    /// SKINS
    const heroUl = document.querySelector('#hero-ul');
    const heroImage = document.querySelector('#right picture img');
    const textHero = document.querySelector('#text-hero i');

    Object.entries(dataSkins.skins).forEach(([name, details], index) => {
        const li = document.createElement('li');
        li.dataset.cursor = "pointer";

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
    const MIN_PROJECTS = 7;

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
                    img.dataset.cursor = "pointer";
                    img.src = project.img;
                    img.alt = project.name;

                    const overlay = document.createElement("div");
                    overlay.classList.add("overlay");
                    overlay.innerHTML = `
                        <h4>${project.name}</h4>
                    `;
                    if (project.description) {
                        overlay.innerHTML += `
                            <p>${project.description}</p>
                        `;
                    }

                    const plusDiv = document.createElement("div");
                    plusDiv.classList.add("plus");
                    Object.entries(project).forEach(([key, value]) => {
                        if (!['img', 'name', 'description', 'link', "download"].includes(key)) {
                            const p = document.createElement("p");
                            p.innerHTML = `<strong>${key}:</strong> ${value}`;
                            plusDiv.appendChild(p);
                        }
                    });

                    overlay.appendChild(plusDiv);

                    const linksDiv = document.createElement("div");
                    linksDiv.classList.add("links");
                    
                    if (project.link) {
                        const seeMoreLink = document.createElement("a");
                        seeMoreLink.href = project.link;
                        seeMoreLink.target = "_blank";
                        seeMoreLink.textContent = "See More";
                        linksDiv.appendChild(seeMoreLink);
                    }
                    
                    if (project.download) {
                        const downloadLink = document.createElement("a");
                        downloadLink.href = project.download;
                        downloadLink.download = "";
                        downloadLink.textContent = "Download Zip";
                        linksDiv.appendChild(downloadLink);
                    }
                    
                    if (linksDiv) overlay.appendChild(linksDiv);

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
        carousel.addEventListener("wheel", function (e) {
            e.preventDefault();
            if (e.deltaY > 0) carousel.scrollLeft += 600;
            else carousel.scrollLeft -= 600;
        });
    });
    /// --- GRAB CAROUSEL

    // FOOTER
    const footer = document.querySelector('footer');
    const toggleButtons = document.querySelectorAll('.toggle-footer');

    toggleButtons.forEach(toggleButton => {
        toggleButton.addEventListener('click', () => {
            footer.classList.toggle('active');
        });
    });

    //CURSOR
    const customCursor = document.createElement('div');
    customCursor.id = 'custom-cursor';
    document.body.appendChild(customCursor);

    document.addEventListener('mousemove', (e) => {
        customCursor.style.left = `${e.pageX}px`;
        customCursor.style.top = `${e.pageY}px`;
    });

    document.querySelectorAll('[data-cursor="pointer"]').forEach((element) => {
        element.style.cursor = 'none'; 

        element.addEventListener('mouseover', () => {
            customCursor.classList.add('pointer');
        });

        element.addEventListener('mouseout', () => {
            customCursor.classList.remove('pointer');
        });
    });
});
