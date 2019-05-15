/**
 * Váriaveis usadas durante o desenvolvimento
 */
var CARD_CONTAINER = document.getElementsByClassName('card-container')[0];
var NOMES = ["Anderson", "Beatriz", "Caio", "Daniela", "Everton", "Fabiana", "Gabriel", "Hortencia", "Igor", "Joana"];

/**
 * Botão para cria um card no card-contaier
 */
function criarCard() {
    let card = {
        nome: NOMES[Math.floor(Math.random() * NOMES.length - 1)],
        idade: Math.floor(Math.random() * 22 + 18),
        curtidas: 0
    }

    /**
     * .collection('coleção') --> referência da coleção
     * .doc('documento') --> referência do documento
     * .set({dados}) --> grava o objeto passado por parâmetro
     */
    // firebase.firestore().collection('cards').doc('1').set(card).then(() => {
    //     console.log('dados adicionado')
    //     adicionaCardATela(card, 1)
    // })

    /**
     * .add({dados}) --> Adiciona os dados dentro de um UID gerado de forma automática
     */
    firebase.firestore().collection('cards').add(card).then(() => {
        console.log('dados adicionado')
        adicionaCardATela(card, 1)
    })
    
};

/**
 * Recebe a referencia do card e exclui do banco de dados
 * @param {String} id Id do card
 */
function deletar(id) {
    
};

/**
 * Incrementa o numero de curtidas
 * @param {String} id Id do card
 */
function curtir(id) {

    let card = document.getElementById(id)
    let count = card.getElementsByClassName('count-number')[0]
    let countNumber = +count.innerHTML
    countNumber++
    
    /**
     * .update({dados}) --> Atualiza todos os dados passado no parâmetro (pode ser usado somente em docs)
     */
    firebase.firestore().collection('cards').doc(id).update({curtidas: countNumber}).then(() => {
        count.innerHTML = countNumber
    })
    
};

/**
 * Decrementa o numero de curtidas
 * @param {String} id Id do card
 */
function descurtir(id) {

    let card = document.getElementById(id)
    let count = card.getElementsByClassName('count-number')[0]
    let countNumber = +count.innerHTML
    
    if (countNumber > 0) {
        countNumber--

        firebase.firestore().collection('cards').doc(id).update({curtidas: countNumber}).then(() => {
            count.innerHTML = countNumber
        })
    }
    
};

/**
 * Espera o evento de que a DOM está pronta para executar algo
 */
document.addEventListener("DOMContentLoaded", function () {
    
    /**
     * .get() --> busca o resultado apenas uma vez
     */
    firebase.firestore().collection('cards').get().then(snapshot => {

        // Pega os documentos dentro da coleção, retorna um objeto e precisa de um foreach
        // snapshot.docs()

        // Verifica se o snapshot está vazio
        // snapshot.empty

        // Pega os metadados da coleção
        // snapshot.metadata()

        // Retorna a query utilizada para esse get
        // snapshot.query()

        // Retorna o número de documentos dentro da coleção
        // snapshot.size()

        // Retorna um array com todas as mudanças que a coleção teve desde a última leitura
        // snapshot.docChanges()

        // snapshot.docs.forEach(card => {
            
        //     // card.data() --> retorna os dados do documento
        //     // card.id --> retorna o UID
        //     // card.isEqual(doc) --> Verifica se o conteudo do documento é igual ao passado por parâmetro (serve para docs e collections)

        //     adicionaCardATela(card.data(), card.id)
        // })
    })

    /**
     * .onSnapshot() --> Observa em tempo real
     */
    firebase.firestore().collection('cards').onSnapshot(snapshot => {

        // Usar dessa forma é equivalente ao .on('value') do Realtime database
        // snapshot.docs.forEach()

        // Retorna todos os dados do evento "added" na primeira chamada e depois
        // retorna apenas novos documentos ou documentos que sofreram alterações
        snapshot.docChanges().forEach(card => {
            if (card.type === "added") {
                adicionaCardATela(card.doc.data(), card.doc.id)
            }

            if (card.type === "modified") {
                console.log("modified")
            }

            if (card.type === "removed") {
                console.log("removed")
            }
        })
    })

});

/**
 * Adiciona card na tela
 * @param {Object} informacao Objeto contendo dados do card
 * @param {String} id UID do objeto inserido/consultado
 */
function adicionaCardATela(informacao, id) {
    /**
     * HEADER DO CARD
     */
    let header = document.createElement("h2");
    header.innerText = informacao.nome;
    header.classList.add('card-title');
    // ===================================

    /**
     * CONTENT DO CARD
     */
    let content = document.createElement("p");
    content.classList.add('card-text');
    content.innerText = informacao.idade + ' anos.';
    // ===================================

    /**
     * BOTÕES DO CARD
     */
    let inner = document.createElement("div");
    inner.classList.add('row')
    // Botão adicionar
    let button_add = document.createElement("button");
    button_add.classList.add('btn', 'btn-link', 'col-3');
    button_add.setAttribute('onclick', "curtir('" + id + "')");
    button_add.innerText = '+';
    inner.appendChild(button_add);

    // Contador de curtidas
    let counter = document.createElement("span");
    counter.innerHTML = informacao.curtidas;
    counter.classList.add('col-3', 'text-center', 'count-number');
    inner.appendChild(counter);

    // Botão de subtrair
    let button_sub = document.createElement("button");
    button_sub.classList.add('btn', 'btn-link', 'col-3');
    button_sub.setAttribute('onclick', "descurtir('" + id + "')");
    button_sub.innerText = '-';
    inner.appendChild(button_sub);
    // ===================================

    // Botão de excluir
    let button_del = document.createElement("button");
    button_del.classList.add('btn', 'btn-danger', 'col-3');
    button_del.setAttribute('onclick', "deletar('" + id + "')");
    button_del.innerText = 'x';
    inner.appendChild(button_del);
    // ===================================

    /**
     * CARD
     */
    let card = document.createElement("div");
    card.classList.add('card');
    card.id = id;
    let card_body = document.createElement("div");
    card_body.classList.add('card-body');
    // ===================================

    // popula card
    card_body.appendChild(header);
    card_body.appendChild(content);
    card_body.appendChild(inner);
    card.appendChild(card_body);

    // insere no container
    CARD_CONTAINER.appendChild(card);
}