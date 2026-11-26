// Validação do formulário (usada na home, no login e no cadastro)
const form = document.getElementById('formulario');
const alertaSucesso = document.getElementById('avisoSucesso'); // aviso de feedback da home
const avisoCadastro = document.getElementById('avisoCadastro');

if (form) {
    // corrige o campo, o vermelho some
    form.addEventListener('input', function (evento) {
        if (alertaSucesso) alertaSucesso.style.display = 'none';
        if (avisoCadastro) avisoCadastro.style.display = 'none';
        const avisoLogin = document.getElementById('avisoLogin');
        if (avisoLogin) avisoLogin.style.display = 'none';
        if (evento.target.checkValidity()) {
            evento.target.classList.remove('is-invalid');
        }
    });

    form.addEventListener('submit', function (evento) {
        evento.preventDefault(); // não deixa a página recarregar

        // pinta campo errado de vermelho
        let tudoCerto = true;
        form.querySelectorAll('input, textarea').forEach(function (campo) {
            const erro = !campo.checkValidity();
            campo.classList.toggle('is-invalid', erro);
            if (erro) {
                tudoCerto = false;
            }
        });

        if (!tudoCerto) {
            return;
        }

        // Se estiver tudo certo:
        if (form.dataset.tipo === 'login') {
            const avisoLogin = document.getElementById('avisoLogin');
            if (avisoLogin) avisoLogin.style.display = '';
            setTimeout(function () {
                window.location.href = 'home.html'; // depois de 1,5 s vai para a loja
            }, 1500);
        } else if (alertaSucesso) {
            // feedback enviado: exibe confirmação e limpa os campo
            alertaSucesso.style.display = '';
            form.reset();
            form.querySelectorAll('.is-invalid').forEach(campo => campo.classList.remove('is-invalid'));
        } else if (avisoCadastro) {
            // mensagem de cadastro concluido
            avisoCadastro.style.display = '';
            form.reset();
            form.querySelectorAll('.is-invalid').forEach(campo => campo.classList.remove('is-invalid'));
        }
    });
}

