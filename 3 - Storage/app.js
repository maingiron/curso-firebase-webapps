/**
 * Variáveis com referencias dos inputs
 */
var fileInput = document.getElementById('file-input');
var stringInput = document.getElementById('string-input');

let ref = firebase.storage().ref('arquivos')

/**
 * Metodo que observa mudanças no input de arquivo
 */
fileInput.onchange = function (event) {
    let arquivo = event.target.files[0]

    /**
     * .child('nome') --> Acessa o caminho para inserir o arquivo
     * .put(arquivo) --> Adiciona o arquivo
     */
    ref.child('arquivo').put(arquivo).then(snapshot => {
        console.log('snapshot...', snapshot)
        // getDownloadURL() --> Retorna a url aonde o arquivo foi hospedado
        ref.child('arquivo').getDownloadURL().then(url => {
            console.log('string para download...', url)
        })
    })
}

/**
 * Metodo que observa mudanças no input de string
 */
stringInput.onchange = function (event) {
    let arquivo = event.target.files[0]

    const reader = new FileReader()
    reader.readAsDataURL(arquivo)
    reader.onload = function() {
        console.log(reader.result)
        const base64 = reader.result.split('base64,')[1]

        // putString(string, formato, metadados) Salva uma string (base64)
        ref.child('imagem').putString(base64, 'base64', { contentType: 'image/png' }).then(snapshot => {
            console.log('snapshot...', snapshot)
            ref.child('imagem').getDownloadURL().then(url => {
                console.log('string para download...', url)
            })
        })
    }
}
