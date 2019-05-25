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
    let arquivo = event.target.files[0];

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

}
