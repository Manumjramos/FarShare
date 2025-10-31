async function enviarContato(event) {
  event.preventDefault();

  const nome     = document.getElementById('nome').value;
  const email    = document.getElementById('email').value;
  const mensagem = document.getElementById('mensagem').value;

  const data = { nome, email, mensagem };

  try {
    const response = await fetch('http://localhost:3001/contato/enviar', {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(data)
    });

    const result = await response.json();
    console.log(result);

    if (result.success) {
      alert(result.message);
      document.getElementById('contactForm').reset();
    } else {
      alert(result.message || "Erro ao enviar a mensagem.");
    }
  } catch (error) {
    console.error("Erro na requisição:", error);
    alert("Erro ao conectar com o servidor.");
  }
}

document.getElementById('contactForm').addEventListener('submit', enviarContato);

const currentTheme = localStorage.getItem("theme");
if (currentTheme === "dark") document.body.classList.add("dark-mode");
