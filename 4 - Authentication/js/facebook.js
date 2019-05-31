// Precisa configurar o Facebook for develop para pegar APP ID e APP SECRET
function loginFacebook() {
    // Cria uma instancia do provedor de login do facebook
    let provider = new firebase.auth.facebookAuthProvider()

    firebase.auth().signInWithPopup(provider).then(resposta => {
        console.log("Usuário...", resposta.user)
        console.log("Token...", resposta.credential.accessToken)
    }).catch(err => {
        console.log("Erro...", err)
    })
}

// Para testar, precisa subir um servidor
// http-server é bom para isto: npm i -g http-server