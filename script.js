const paginazione = document.getElementById("paginazione");
const pagine = document.getElementById("pagine");
const labels = document.querySelectorAll("section#paginazione > label");

let paginaCorrente = 1;
const numPagine = labels.length;

paginazione.addEventListener("click", e => {
    const item = e.target;
    if (item.nodeName === "LABEL") {
        setCheckedLabel(item.dataset.page);
    }
});

function setCheckedLabel(numeroPaginaSelezionata) {
    labels[paginaCorrente - 1].classList.remove("lab-sel");
    labels[numeroPaginaSelezionata - 1].classList.add("lab-sel");

    pagine.style.marginLeft = `-${(numeroPaginaSelezionata - 1) * 100}vw`;

    paginaCorrente = numeroPaginaSelezionata;
}

// Gestione dello scorrimento delle pagine con il touch su dispositivi mobili
let touchStartX = 0;
let touchEndX = 0;

pagine.addEventListener("touchstart", e => {
    touchStartX = e.changedTouches[0].screenX;
});

pagine.addEventListener("touchend", e => {
    touchEndX = e.changedTouches[0].screenX;
    handleGesture();
});

function handleGesture() {
    if (touchEndX < touchStartX && paginaCorrente < numPagine) {
        setCheckedLabel(parseInt(paginaCorrente) + 1);
    }

    if (touchEndX > touchStartX && paginaCorrente > 1) {
        setCheckedLabel(parseInt(paginaCorrente) - 1);
    }
}

// Gestione dello scorrimento delle pagine con le frecce della tastiera
document.addEventListener("keydown", e => {
    if (e.key === "ArrowLeft" && paginaCorrente > 1) {
        setCheckedLabel(parseInt(paginaCorrente) - 1);
    }

    if (e.key === "ArrowRight" && paginaCorrente < numPagine) {
        setCheckedLabel(parseInt(paginaCorrente) + 1);
    }
});
