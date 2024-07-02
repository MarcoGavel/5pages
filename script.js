const paginazione = document.getElementById("paginazione");
const pagine = document.getElementById("pagine");
const labels = document.querySelectorAll("section#paginazione > label");

let paginaCorrente = 1;
const numPagine = labels.length;

// Inizializzazione

paginazione.addEventListener("click", (e) => {
    e.preventDefault(); 
    const label = e.target.closest("label");
    if (!label) return;
  
    // Rimuovi la classe "lab-sel" da tutte le etichette
    const labels = paginazione.querySelectorAll("label");
    labels.forEach(label => label.classList.remove("lab-sel"));
  
    // Aggiungi la classe "lab-sel" all'etichetta cliccata
    label.classList.add("lab-sel");
  
    const numeroPagina = parseInt(label.dataset.page);
    navigateToPage(numeroPagina);
});

// Gestore per lo swipe (touch) sulle pagine
let startX = null;
let touchThreshold = 50; // Soglia di movimento orizzontale per considerare uno swipe

pagine.addEventListener("touchstart", touchStart, false);

function touchStart(e) {
    startX = e.touches[0].clientX;
}

pagine.addEventListener("touchmove", touchMove, false);

function touchMove(e) {
    if (!startX) return;
    let currentX = e.touches[0].clientX;
    let diff = startX - currentX;

    if (Math.abs(diff) > touchThreshold) { // Soglia di movimento orizzontale superata
        if (diff > 0) {
            // Swipe a sinistra (passa alla pagina successiva)
            navigatePage(1);
        } else {
            // Swipe a destra (passa alla pagina precedente)
            navigatePage(-1);
        }
        startX = null;
    }
}

document.addEventListener("keydown", (e) => {
    if (e.key === "ArrowLeft") {
        // Freccia sinistra (passa alla pagina precedente)
        navigatePage(-1);
    } else if (e.key === "ArrowRight") {
        // Freccia destra (passa alla pagina successiva)
        navigatePage(1);
    }
});

function navigatePage(direction) {
    let newPage = paginaCorrente + direction;
    if (newPage < 1) newPage = numPagine;
    if (newPage > numPagine) newPage = 1;
    navigateToPage(newPage);
}

function navigateToPage(numeroPaginaSelezionata) {
    if (numeroPaginaSelezionata < 1 || numeroPaginaSelezionata > numPagine) return;
  
    // Identifica l'etichetta precedentemente selezionata
    const labelPrecedente = paginazione.querySelector(`label[data-page="${paginaCorrente}"]`);
  
    // Rimuovi la classe "lab-sel" dall'etichetta precedente
    labelPrecedente.classList.remove("lab-sel");
  
    // Aggiungi la classe "lab-sel" all'etichetta appena selezionata
    const labelSelezionata = paginazione.querySelector(`label[data-page="${numeroPaginaSelezionata}"]`);
    labelSelezionata.classList.add("lab-sel");
  
    // Aggiorna la pagina corrente
    paginaCorrente = numeroPaginaSelezionata;
  
    // Sposta il contenuto delle pagine
    const offsetX = (paginaCorrente - 1) * -100;
    pagine.style.transform = `translateX(${offsetX}vw)`;
}
