function showPopup(title, text) {
    document.getElementById('popup-title').innerText = title;
    document.getElementById('popup-text').innerText = text;
    document.getElementById('popup').style.display = 'block';
}

function closePopup() {
    document.getElementById('popup').style.display = 'none';
}

function openModal(modalId) {
    document.getElementById(modalId).style.display = "block";
}
 
function closeModal(modalId) {
    document.getElementById(modalId).style.display = "none";
}
 
window.onclick = function(event) {
    if (event.target.classList.contains('modal')) {
        event.target.style.display = "none";
    }
}