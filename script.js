const paginazione = document.getElementById("paginazione");
let paginaCorrente = 1;

paginazione.addEventListener("click", e =>{
    const item = e.target;
    if(item.nodeName === "LABEL"){
        setCheckedLabel(item.dataset.page);
    }
});

function setCheckedLabel(numeroPaginaSelezionata){
    const labels = document.querySelectorAll("section#paginazione > label");
    
    labels[paginaCorrente-1].classList.remove("lab-sel");
    labels[numeroPaginaSelezionata-1].classList.add("lab-sel");
    
    paginaCorrente=numeroPaginaSelezionata;
}
