/**
 * Variáveis com referencias dos inputs
 */
var fileInput = document.getElementById('file-input');
var stringInput = document.getElementById('string-input');

let ref = firebase.storage().ref('arquivos')
let tarefaUpload

/**
 * Metodo que observa mudanças no input de arquivo
 */
fileInput.onchange = function (event) {
    let arquivo = event.target.files[0]
    // Cria um uid sem inserir nada do firebase realtime
    let uid = firebase.database().ref().push().key

    /**
     * .child('nome') --> Acessa o caminho para inserir o arquivo
     * .put(arquivo) --> Adiciona o arquivo
     */
    // ref.child(uid).put(arquivo, {
    //     customMetadata: {
    //         nome: 'Curriculo'
    //     }
    // }).then(snapshot => {
    //     console.log('snapshot...', snapshot)
    //     // getDownloadURL() --> Retorna a url aonde o arquivo foi hospedado
    //     ref.child(uid).getDownloadURL().then(url => {
    //         console.log('string para download...', url)
    //     })

    //     ref.child(uid).getMetadata().then(metadata => {
    //         console.log('metadata...', metadata)
    //     })
    // })

    // getMetadata() --> Retorna os metadata dos arquivos hospedados
    // ref.child('arquivo').getMetadata().then(metadata => {
    //     console.log(metadata)
    // })

    tarefaUpload = ref.child(uid).put(arquivo)

    /**
     * .on('state_changed', arquivo_observavel(), error(), completou())
     */
    tarefaUpload.on('state_changed', upload => {
        console.log('Mudou o estado', upload)
        // .state retorna o estado do upload (running, paused, success)
        if (upload.state == 'running') {
            let progresso = Math.round((upload.bytesTransferred / upload.totalBytes) * 100)
            console.log(`${progresso}%`)
        }
    }, error => {
        console.log('Aconteceu um erro...', error)
    }, () => {
        console.log('Completou o upload')
        ref.child(uid).getDownloadURL().then(url => {
            console.log(url)
        })
    })

    // tarefaUpload.then(snapshot => {
    //     console.log('snapshot...', snapshot)
    // }).catch(error => {
    //     console.log('error...', error)
    // })
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

/**
 * Funções abaixo para Pausar, Continuar e Cancelar o upload
 */
function pausar() {
    tarefaUpload.pause()
    console.log('Pausou tafera')
}

function continuar() {
    tarefaUpload.resume()
    console.log('Continuou tafera')
}

function cancelar() {
    tarefaUpload.cancel()
    console.log('Cancelou tafera')
}

function deletar() {
    ref.child('-LflCKL5YmoL1JKkuNNu').delete().then(() => {
        console.log("Deletou o arquivo")
    }).catch(error => {
        console.log('Error...', error)
    })
}