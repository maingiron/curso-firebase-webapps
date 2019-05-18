function logout() {
    firebase.auth().signOut().then(() => {
        alert("Usuário deslogou...")
    })
}