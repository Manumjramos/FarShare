async function cadastrar(event) {
  event.preventDefault();
 
  const name     = document.getElementById('nome').value;
  const email    = document.getElementById('email').value;
  const password = document.getElementById('senha').value;
 
  const data = {name,email,password}
 
  const response = await fetch('http://localhost:3001/usuario/cadastrar', {
    method: "POST",
    headers: {
      "Content-Type":"application/json"
    },
    body: JSON.stringify(data)
  })
 
  const results = await response.json();
  console.log(results)
  if(results.success) {
    alert(results.message)
    window.location.href = "./primeira_pagina.html"
  } else {
    alert(alert.message)
  }
}
 
 
async function login(event) {
    event.preventDefault();
 
    const email = document.getElementById('email_login').value;
    const password = document.getElementById('password_login').value;
 
    const data = { email, password }
 
    const response = await fetch("http://localhost:3001/login", {
      method: "POST",
      headers: {
        "Content-Type":"application/json"
      },
      body: JSON.stringify(data)
    })
 
    let results = await response.json();
 
    if(results.success) {
      let userData = results.data;
 
      localStorage.setItem('informacoes', JSON.stringify(userData))
 
      window.location.href = "./primeira_pagina.html"
 
      let html = document.getElementById('informacoes')
      let dados = JSON.parse(localStorage.getItem('informacoes'))
 
 
      alert(results.message)
      window.location.href = "./primeira_pagina.html"

    } else {
      alert(results.message)
    }
  }
  
 
  