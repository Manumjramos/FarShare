document.getElementById('loginForm').addEventListener('submit', function(event) {
  event.preventDefault(); 

  const username = document.getElementById('username').value.trim();
  const password = document.getElementById('password').value;

  const message = document.getElementById('message');

  
  const correctUser = 'admin';
  const correctPass = '1234';

  if (username === correctUser && password === correctPass) {
    message.style.color = 'green';
    message.textContent = 'Login realizado com sucesso!';
    
  } else {
    message.style.color = 'red';
    message.textContent = 'Usuário ou senha incorretos!';
  }
});

