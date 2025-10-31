// Aguarda o DOM estar completamente carregado para executar o script
document.addEventListener('DOMContentLoaded', () => {

    // --- 1. Seleção dos Elementos ---
    const userForm = document.getElementById('userForm');
    const nomeInput = document.getElementById('nome');
    const emailInput = document.getElementById('email');
    const senhaInput = document.getElementById('senha');
    
    const editarBtn = document.getElementById('editar');
    const excluirBtn = document.getElementById('excluir');
    
    const toggleDarkModeBtn = document.getElementById('toggle-dark-mode');
    
    const enviarMensagemBtn = document.getElementById('enviarMensagem');
    const mensagemInput = document.getElementById('mensagem');
    
    const salvarNotaBtn = document.getElementById('salvarNota');
    const excluirNotaBtn = document.getElementById('excluirNota');
    const notaTextoInput = document.getElementById('notaTexto');
    const listaNotas = document.getElementById('listaNotas');

    let userData = null;

    // --- 2. Funções de Anotações (Usando localStorage) ---
    
    // Carrega e exibe as notas salvas
    function carregarNotas() {
        const notas = JSON.parse(localStorage.getItem('minhasNotas')) || [];
        listaNotas.innerHTML = ''; // Limpa a lista antes de adicionar
        notas.forEach((nota, index) => {
            const li = document.createElement('li');
            li.textContent = nota;
            // Adiciona um botão de excluir para cada nota individual
            const btnExcluirIndividual = document.createElement('button');
            btnExcluirIndividual.textContent = 'X';
            btnExcluirIndividual.classList.add('excluir-nota-item'); // Adicione estilo para este botão no CSS
            btnExcluirIndividual.onclick = () => excluirNotaEspecifica(index);
            li.appendChild(btnExcluirIndividual);
            listaNotas.appendChild(li);
        });
    }

    // Salva uma nova nota
    salvarNotaBtn.addEventListener('click', () => {
        const texto = notaTextoInput.value.trim();
        if (texto) {
            const notas = JSON.parse(localStorage.getItem('minhasNotas')) || [];
            notas.push(texto);
            localStorage.setItem('minhasNotas', JSON.stringify(notas));
            notaTextoInput.value = ''; // Limpa o campo
            carregarNotas(); // Atualiza a lista
        }
    });

    // Exclui uma nota específica pelo seu índice
    function excluirNotaEspecifica(index) {
        if (confirm('Tem certeza que deseja excluir esta anotação?')) {
            const notas = JSON.parse(localStorage.getItem('minhasNotas')) || [];
            notas.splice(index, 1); // Remove a nota no índice específico
            localStorage.setItem('minhasNotas', JSON.stringify(notas));
            carregarNotas(); // Atualiza a lista
        }
    }

    // Botão "Excluir" (exclui TODAS as notas)
    excluirNotaBtn.addEventListener('click', () => {
        if (confirm('Tem certeza que deseja excluir TODAS as anotações?')) {
            localStorage.removeItem('minhasNotas');
            carregarNotas(); // Limpa a lista na tela
        }
    });

    // --- 3. Funcionalidades do Perfil (CRUD) ---

    // Habilita os campos do formulário para edição
    editarBtn.addEventListener('click', () => {
        nomeInput.disabled = false;
        emailInput.disabled = false;
        senhaInput.disabled = false;
        senhaInput.placeholder = "Digite a NOVA senha (ou deixe em branco)";
        nomeInput.focus();
    });

    // Salva as alterações (Submit do Formulário)
    userForm.addEventListener('submit', async (event) => {
        event.preventDefault(); // Impede o envio padrão do formulário

        if (!userData || !userData.id) {
            alert('Erro: Usuário não identificado. Faça login novamente.');
            return;
        }

        const id = userData.id;
        const nomeAtualizado = nomeInput.value;
        const emailAtualizado = emailInput.value;
        const senhaAtualizada = senhaInput.value;

        // **IMPORTANTE**: O seu endpoint PUT só atualiza o NOME.
        // O ideal seria atualizar todos os campos.
        // Este código vai chamar o endpoint que você forneceu.
        const bodyData = {
            name: nomeAtualizado,
            // Se fosse atualizar tudo, seria:
            // name: nomeAtualizado,
            email: emailAtualizado,
            password: senhaAtualizada
        };

        try {
            const response = await fetch(`http://localhost:3001/usuario/editar/${id}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(bodyData),
            });

            const result = await response.json();

            if (result.sucess) {
                alert('Dados atualizados com sucesso!');
                
                // Atualiza o localStorage local
                userData.name = nomeAtualizado;
                userData.email = emailAtualizado; // Assumindo que o back-end atualizaria
                localStorage.setItem('informacoes', JSON.stringify(userData));

                // Desabilita os campos novamente
                nomeInput.disabled = true;
                emailInput.disabled = true;
                senhaInput.disabled = true;
                senhaInput.value = ''; // Limpa o campo senha por segurança
                senhaInput.placeholder = "Digite sua senha";

            } else {
                alert('Erro ao atualizar dados: ' + result.message);
            }
        } catch (error) {
            console.error('Erro na requisição:', error);
            alert('Ocorreu um erro de conexão.');
        }
    });

    // Exclui a conta do usuário
    excluirBtn.addEventListener('click', async () => {
        if (!userData || !userData.id) {
            alert('Erro: Usuário não identificado. Faça login novamente.');
            return;
        }

        if (!confirm('ATENÇÃO: Tem certeza que deseja excluir sua conta? Esta ação é irreversível.')) {
            return; // Usuário cancelou
        }

        const id = userData.id;

        try {
            const response = await fetch(`http://localhost:3001/usuario/deletar/${id}`, {
                method: 'DELETE',
            });

            const result = await response.json();

            if (result.sucess) {
                alert('Conta excluída com sucesso.');
                // Limpa os dados locais e redireciona
                localStorage.removeItem('informacoes');
                localStorage.removeItem('minhasNotas'); // Limpa também as notas
                window.location.href = 'login.html'; // Mude para sua página de login/principal
            } else {
                alert('Erro ao excluir conta: ' + result.message);
            }
        } catch (error) {
            console.error('Erro na requisição:', error);
            alert('Ocorreu um erro de conexão.');
        }
    });

    // --- 4. Funcionalidades Extras ---

    // Dark Mode
    toggleDarkModeBtn.addEventListener('click', () => {
        document.body.classList.toggle('dark-mode');
        // Salva a preferência no localStorage
        if (document.body.classList.contains('dark-mode')) {
            localStorage.setItem('darkMode', 'enabled');
            toggleDarkModeBtn.textContent = '☀️'; // Sol
        } else {
            localStorage.removeItem('darkMode');
            toggleDarkModeBtn.textContent = '🌙'; // Lua
        }
    });

    // Enviar Mensagem WhatsApp
    enviarMensagemBtn.addEventListener('click', () => {
        const mensagem = mensagemInput.value;
        if (mensagem) {
            // Abre o WhatsApp para iniciar uma conversa (não envia direto)
            const numero = '5511000000000'; // **Substitua pelo número de destino**
            const textoCodificado = encodeURIComponent(mensagem);
            window.open(`https://wa.me/${numero}?text=${textoCodificado}`, '_blank');
        } else {
            alert('Por favor, digite uma mensagem.');
        }
    });

    // --- 5. Inicialização da Página ---
    function inicializarPagina() {
        // Carrega dados do usuário
        const dadosLocais = localStorage.getItem('informacoes');
        if (dadosLocais) {
            userData = JSON.parse(dadosLocais);
            
            // Preenche o formulário
            nomeInput.value = userData.name || '';
            emailInput.value = userData.email || '';
            
            // Deixa os campos desabilitados por padrão
            nomeInput.disabled = true;
            emailInput.disabled = true;
            senhaInput.disabled = true;
        } else {
            // Se não há dados, desabilita tudo e avisa
            alert('Você não está logado. Redirecionando...');
            // window.location.href = 'login.html'; // Redireciona para o login
        }

        // Carrega as notas salvas
        carregarNotas();

        // Verifica preferência de Dark Mode
        if (localStorage.getItem('darkMode') === 'enabled') {
            document.body.classList.add('dark-mode');
            toggleDarkModeBtn.textContent = '☀️';
        }
    }

    // Executa a inicialização
    inicializarPagina();
});

enviarMensagemBtn.addEventListener('click', () => {
    const mensagem = mensagemInput.value.trim();

    if (mensagem === '') {
        alert('Por favor, digite uma mensagem antes de enviar.');
        return;
    }

    // ⚙️ Substitua pelo seu número real
    const meuNumeroWhatsApp = '5551991977351';

    const mensagemCodificada = encodeURIComponent(mensagem);

    // Abre o WhatsApp Web ou app no celular direto para você
    const linkWhatsApp = `https://wa.me/${meuNumeroWhatsApp}?text=${mensagemCodificada}`;
    window.open(linkWhatsApp, '_blank');
});
