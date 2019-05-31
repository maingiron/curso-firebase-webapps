let currentUser;

/**
 * Função para cadastro com email e senha
 */
function createLogin() {
    let email = document.getElementById("email").value
    let senha = document.getElementById("senha").value

    firebase.auth().createUserWithEmailAndPassword(email, senha).then(user => {
        console.log("Usuário...", user)
        alert("Usuário criado e logado.")
    }).catch(err => {
        console.log("Erro:", err)
    })
}

/**
 * Função para login
 */
function loginEmail() {
    let email = document.getElementById("email").value
    let senha = document.getElementById("senha").value
    
    firebase.auth().signInWithEmailAndPassword(email, senha).then(() => {
        alert("Usuário logado")
    }).catch(err => {
        console.log("Erro:", err)
    })
}

/**
 * Listener de dom ready
 */
document.addEventListener("DOMContentLoaded", function () {
    // Verifica se existe um usuário logado e as mudanças na autentificação (login e logout)
    firebase.auth().onAuthStateChanged((usuario) => {
        if (usuario) {
            console.log('Usuário logado...', usuario)
            currentUser = usuario

            // Mudando o idioma do firebase
            firebase.auth().languageCode = "pt"
            // Muda o idioma para o utilizado no aparalho
            firebase.auth().useDeviceLanguage()
            // if (usuario.emailVerified) {
            //     // Envia um email de verificação
            //     usuario.sendEmailVerification().then(() => {
            //         alert("Email de verificação enviado")
            //     })
            // }

            // firebase.auth().sendPasswordResetEmail(usuario.email).then(() => {
            //     alert("Email de reset de senha enviado")
            // })

        } else {
            console.log('Não há usuário logado')
        }
    })

    currentUser = firebase.auth().currentUser;

    if (currentUser) {
        console.log('currentUser...', currentUser)
        // Metodos para update do usuário criado no auth()
        currentUser.updateProfile({
            displayName: "Raphael Giron",
            photoURL: ""
        })

        // currentUser.updateEmail("novoemail@gmail.com")
        // currentUser.updatePassword("novasenha")
        // currentUser.updatePhoneNumber("+5522123456789")
    }
});

function deletaUsuario() {
    if (currentUser) {
        currentUser.delete().then(() => {
            alert("Usuário excluido")
        })
    }
}