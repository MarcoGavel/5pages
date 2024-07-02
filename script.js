const paginazione = document.getElementById("paginazione");
const labels = document.querySelectorAll("#paginazione>label");
const pagine = document.getElementById("pagine");
const radioBtn = document.querySelectorAll("#pagine > input[type=radio]");
let toccoInizioX = 0;
let toccoFineX = 0;
let paginaCorrente = 0;

paginazione.addEventListener("click", changePage);
pagine.addEventListener("touchstart", touchStart, false);
pagine.addEventListener("touchend", touchEnd, false);
document.addEventListener("keydown", (e) => {
    if (e.key === "ArrowLeft" && paginaCorrente > 0) {
        goToPage(paginaCorrente - 1);
    } else if (e.key === "ArrowRight" && paginaCorrente < labels.length -1) {
        goToPage(paginaCorrente + 1);
    }
});

function changePage(e) {
    if (e.target.nodeName === "LABEL") {
        goToPage(e.target.dataset.page -1);
    }
}

function touchStart(e){
    toccoInizioX=e.changedTouches[0].screenX;
}

function touchEnd(e){
    toccoFineX = e.changedTouches[0].screenX;
    toccoFineX < toccoInizioX ? moveTo("next") : moveTo("prev");
}

function moveTo(direction){
    if(direction === "next" && paginaCorrente < labels.length -1) {
        goToPage(paginaCorrente + 1)
    } else if(direction === "prev" && paginaCorrente > 0){
        goToPage(paginaCorrente - 1)
    }
}

function goToPage(numPagina){
    labels[paginaCorrente].classList.remove("lab-sel");
    labels[numPagina].classList.add("lab-sel");
    radioBtn[numPagina].checked = true;
    paginaCorrente = numPagina;
}