
// 1. Mostrar Más Noticias

document.getElementById("verMasBtn").addEventListener("click", function () {
    const masNoticias = document.getElementById("masNoticias");
    masNoticias.classList.toggle("d-none");
    this.innerText = masNoticias.classList.contains("d-none") ? "Ver más noticias" : "Ver menos";
});



// 2. Carrusel 
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


// 3. Carrusel INFINITO
document.addEventListener("DOMContentLoaded", () => {
    const carrusel = document.getElementById("carrusel-modelos");
    const cardWidth = 330;
    const cantidadVisible = 3;
    let posicionActual = 0;

    if (!carrusel) return;

    // Duplicar las tarjetas
    const tarjetasOriginales = Array.from(carrusel.children);
    tarjetasOriginales.forEach(card => {
        carrusel.appendChild(card.cloneNode(true));
    });

    // Inicializar scroll al inicio
    carrusel.scrollLeft = 0;

    // Función global para mover el carrusel
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

// 4. Carrusel SLIDER 
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
