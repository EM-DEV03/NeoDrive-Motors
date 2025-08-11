// Noticias
document.getElementById("verMasBtn").addEventListener("click", function () {
    let hayOcultas = false;

    document.querySelectorAll(".mas-noticia").forEach(function (card) {
        if (card.classList.contains("d-none")) {
            card.classList.remove("d-none");
            hayOcultas = true;
        } else {
            card.classList.add("d-none");
        }
    });

    this.innerText = hayOcultas ? "Ver menos" : "Ver más noticias";
});

// Carrusel
let posicion = 0;

function moverCarrusel(direccion) {
    const carrusel = document.getElementById("carrusel-modelos");
    const cardWidth = 320;
    const cantidadVisible = 3;
    const totalCards = carrusel.children.length;
    const totalPaginas = Math.ceil(totalCards / cantidadVisible);

    posicion += direccion;

    if (posicion < 0) posicion = 0;
    if (posicion >= totalPaginas) posicion = totalPaginas - 1;

    const desplazamiento = posicion * cardWidth * cantidadVisible;

    carrusel.scrollTo({
        left: desplazamiento,
        behavior: 'smooth'
    });
}

// Carrusel (Infinito)
document.addEventListener("DOMContentLoaded", () => {
    const carrusel = document.getElementById("carrusel-modelos");
    const cardWidth = 330;
    const cantidadVisible = 3;
    let posicionActual = 0;

    if (!carrusel) return;

    const tarjetasOriginales = Array.from(carrusel.children);
    tarjetasOriginales.forEach(card => {
        carrusel.appendChild(card.cloneNode(true));
    });

    carrusel.scrollLeft = 0;

    window.moverCarruselInfinito = (direccion) => {
        posicionActual += direccion;
        carrusel.scrollLeft += direccion * cardWidth * cantidadVisible;

        const maxScroll = cardWidth * tarjetasOriginales.length;

        if (carrusel.scrollLeft >= maxScroll) {
            carrusel.scrollLeft = 0;
            posicionActual = 0;
        }
    };
});

// Slider
let slideIndex = 0;
const slides = document.querySelectorAll('.slide');
const dots = document.querySelectorAll('.dot');
const prev = document.querySelector('.prev');
const next = document.querySelector('.next');

function showSlide(index) {
    slides.forEach((slide, i) => {
        slide.classList.remove('active');
        dots[i].classList.remove('active');
    });
    slides[index].classList.add('active');
    dots[index].classList.add('active');
}

if (prev && next && slides.length > 0) {
    prev.addEventListener('click', () => {
        slideIndex = (slideIndex - 1 + slides.length) % slides.length;
        showSlide(slideIndex);
    });

    next.addEventListener('click', () => {
        slideIndex = (slideIndex + 1) % slides.length;
        showSlide(slideIndex);
    });

    dots.forEach((dot, i) => {
        dot.addEventListener('click', () => {
            slideIndex = i;
            showSlide(i);
        });
    });

    // Autoplay
    setInterval(() => {
        slideIndex = (slideIndex + 1) % slides.length;
        showSlide(slideIndex);
    }, 5000);
}

document.addEventListener('contextmenu', event => event.preventDefault());

document.addEventListener('keydown', event => {
    if (event.ctrlKey && (event.key === 'u' || event.key === 'U')) {
        event.preventDefault();
    }
    if (event.ctrlKey && event.shiftKey && (event.key === 'i' || event.key === 'I')) {
        event.preventDefault();
    }
    if (event.key === 'F12') {
        event.preventDefault();
    }
});