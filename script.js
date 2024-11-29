document.addEventListener('DOMContentLoaded', function() {
    // Simulação de usuários para login
    const usuarios = [
        { email: 'admin@condominio.com', senha: '123456' }
    ];

    const formLogin = document.getElementById('form-login');
    const loginStatus = document.getElementById('login-status');
    let usuarioLogado = false;

    formLogin.addEventListener('submit', function(event) {
        event.preventDefault();
        const email = document.getElementById('email').value;
        const senha = document.getElementById('senha').value;

        const usuario = usuarios.find(user => user.email === email && user.senha === senha);
        if (usuario) {
            usuarioLogado = true;
            loginStatus.textContent = 'Login bem-sucedido!';
            loginStatus.style.color = 'green';
        } else {
            loginStatus.textContent = 'E-mail ou senha incorretos!';
            loginStatus.style.color = 'red';
        }
    });

    // Função para adicionar agendamentos
    const formRegistro = document.getElementById('form-registro');
    const listaHistorico = document.getElementById('lista-historico');
    const qrCodeDiv = document.getElementById('qrcode');

    formRegistro.addEventListener('submit', function(event) {
        event.preventDefault();
        if (!usuarioLogado) {
            alert('Você precisa estar logado para registrar um visitante.');
            return;
        }

        const nomeVisitante = document.getElementById('nome-visitante').value;
        const apartamento = document.getElementById('apartamento').value;
        const dataHora = new Date().toLocaleString();

        // Adiciona entrada no histórico
        const itemHistorico = document.createElement('li');
        itemHistorico.textContent = `${dataHora} - Visitante: ${nomeVisitante}, Apartamento: ${apartamento}`;
        listaHistorico.appendChild(itemHistorico);

        // Gera QR code
        const qrCodeData = `${nomeVisitante}-${apartamento}-${dataHora}`;
        qrCodeDiv.innerHTML = '';
        QRCode.toCanvas(document.getElementById('canvas'), qrCodeData, function (error) {
            if (error) console.error(error);
            console.log('QR code gerado!');
        });

        // Envia notificação (simulação simples)
        alert(`Notificação enviada para o morador do apartamento ${apartamento}`);

        // Limpa o formulário
        formRegistro.reset();
    });

    // Adicionar um elemento canvas ao HTML para gerar o QR code
    const canvas = document.createElement('canvas');
    canvas.id = 'canvas';
    qrCodeDiv.appendChild(canvas);
});
