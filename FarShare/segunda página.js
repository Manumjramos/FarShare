document.getElementById('contactForm').addEventListener('submit', function(event) {
    event.preventDefault();

    const nome = document.getElementById('nome').value;
    const email = document.getElementById('email').value;
    const mensagem = document.getElementById('mensagem').value;

    const mailtoLink = `mailto:manunjramos@gmail.com?subject=Contato%20de%20${encodeURIComponent(nome)}&body=Nome:%20${encodeURIComponent(nome)}%0AEmail:%20${encodeURIComponent(email)}%0AMensagem:%20${encodeURIComponent(mensagem)}`;

    window.location.href = mailtoLink;
});
