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

});