function showPopup(title, text) {
    document.getElementById('popup-title').innerText = title;
    document.getElementById('popup-text').innerText = text;
    document.getElementById('popup').style.display = 'block';
}

function closePopup() {
    document.getElementById('popup').style.display = 'none';
}

// Abre o modal
function openModal(modalId) {
    document.getElementById(modalId).style.display = "block";
}
 
// Fecha o modal
function closeModal(modalId) {
    document.getElementById(modalId).style.display = "none";
}
 
// Fecha o modal ao clicar fora dele
window.onclick = function(event) {
    if (event.target.classList.contains('modal')) {
        event.target.style.display = "none";
    }
}
