/**
 * Váriaveis usadas durante o desenvolvimento
 */
var CARD_CONTAINER = document.getElementsByClassName('card-container')[0];
var NOMES = ["Anderson", "Beatriz", "Caio", "Daniela", "Everton", "Fabiana", "Gabriel", "Hortencia", "Igor", "Joana"];
let cards = []

/**
 * firebase: objeto global
 * database(): método para acesso ao realtime database
 * ref(): url em string para referência do caminho no banco
 */
let ref = firebase.database().ref('card')

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
     * set(): método que cria dados na url passada
     * child(): acessa o nó filho passado por parâmetro
     */
    // ref.child(card.nome).set(card).then(() => {
    //     adicionaCardATela(card)
    // })

    /**
     * push(): cria um uid único e insere os dados dentro deste uid
     */
    // ref.push(card).then(snapshot => {
    //     // adicionaCardATela(card, snapshot.key)
    // })    

    /**
     * Usando fetch para criar card
     */
    fetch('https://curso-firebase-webapps-b61eb.firebaseio.com/card.json', {
        body: JSON.stringify(card),
        method: 'POST',
        mode: 'no-cors'
    }).catch((err) => {
        console.log(`Erro... ${err}`)
    })
};

/**
 * Recebe a referencia do card e exclui do banco de dados
 * @param {String} id Id do card
 */
function deletar(id) {
    let card = document.getElementById(id)


    /**
     * remove(): remove o nó que é passado por parâmetro, remove também os seus filhos
     */
    ref.child(id).remove().then(() => {
        card.remove()
    })

    /**
     * set(null): ao setar um nó em null, exclui este nó do firebase (melhor usar o remove acima)
     */
    // ref.child(id).set(null).then(() => {
    //     card.remove()
    // })
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
     * set(): cadastra ou atualiza com o valor passado no parâmetro
     */
    ref.child(id + '/curtidas').set(countNumber).then(() => {
        count.innerHTML = countNumber
    }, err => {
        console.log(`Erro ao curtir... ${err}`)
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

        /**
         * update(): recebe um objeto (e apenas um objeto) para atualizar APENAS as propriedades desse objeto
         */
        ref.child(id).update({ curtidas: countNumber }).then(() => {
            count.innerHTML = countNumber
        }).catch((err) => {
            console.log(`Erro ao curtir... ${err}`)
        })
    }
};

/**
 * Espera o evento de que a DOM está pronta para executar algo
 */
document.addEventListener("DOMContentLoaded", function () {

    // Logger do firebase
    // firebase.database.enableLogging(msg => {
    //     console.log('[FIREBASE]', msg)
    // })

    /**
     * once(): retorna os dados de uma url
     * snapshot: objeto retornado pela leitura (por conversão padrão, essa é o nome dado ao objeto de retorno)
     */
    // ref.once('value').then(snapshot => {
        // acessa um nó filho
        // console.log('child...', snapshot.child('-LduwwFmQMs8kkqqUab0').val())

        // verifica se existe algo dentro do snapshot
        // console.log('exists...', snapshot.exists())

        // verifica se existe o filho passado na url
        // console.log('hasChild...', snapshot.hasChild('-LduwwFmQMs8kkqqUab0/nome'))
        // console.log('hasChild...', snapshot.hasChild('-LduwwFmQMs8kkqqUab0/nao-tem-esse-filho'))

        // verifica se existe algum filho no nó
        // console.log('hasChildren...', snapshot.child('-LduwwFmQMs8kkqqUab0').hasChildren())
        // console.log('hasChildren...', snapshot.child('-LduwwFmQMs8kkqqUab0/nome').hasChildren())
        
        // verifica o número de filhos nó no snapshot
        // console.log('numChildren...', snapshot.numChildren())

        // retorna a chave do snapshot/caminho
        // console.log('key...', snapshot.key)

    //     snapshot.forEach(value => {
    //         console.log('key...', value.key)

    //         adicionaCardATela(value.val(), value.key)
    //     })
    // })

    // ORDERNAÇÃO
    /**
     * Ordernação
     * .orderByChild('filho'): Orderna pelo propriedade filho passado como parâmetro
     * .orderByKey(): Orderna pela chave dos nós (que são um "timestamp")
     * .orderByValue(): Orderna pelo o valor de cada propriedade dentro do nó, não vale para nós que tenha como filho outros nós
     * ATENÇÂO: Só é possível utilizar apenas um método de ordernação por vez!
     */
    // ref.child('-LeKAMRGG9Hc7MserH3V').orderByValue().on('child_added', snapshot => {
    //     // adicionaCardATela(snapshot.val(), snapshot.key)
    //     console.log(`valor da chave ${snapshot.key} é ${snapshot.val()}`)
    // })


    /**
     * Filtros
     * .startAt(): Retorna valores aparti do parâmetro informado
     * .endAt(): Retorna valores menores do parâmetro informado
     * .equalTo(): Retorna o valor igual do parâmetro informado
     */
    // ref.orderByChild('idade').equalTo(21).on('child_added', snapshot => {
    //     adicionaCardATela(snapshot.val(), snapshot.key)
    // })

    /**
     * Limites
     * .limitToFirst(): os 5 primeiros
     * .limitToLast(): os 5 últimos
     */
    // ref.orderByChild('idade').startAt(0).limitToLast(20).on('child_added', snapshot => {
    //     adicionaCardATela(snapshot.val(), snapshot.key)
    // })

    // ref.on('value', snapshot => {
    //     snapshot.forEach(value => {
    //         adicionaCardATela(value.val(), value.key)
    //     })
    //     ref.off('value')
    // }, err => {
    //     console.log(`Erro no on... ${err}`)
    // })

    /**
     * Usando fetch no lugar do firebase
     */
    fetch('https://curso-firebase-webapps-b61eb.firebaseio.com/card.json')
        .then(res => res.json())
        .then(res => {
            for (let key in res) {
                adicionaCardATela(res[key], res)
            }
        })

    /**
     * on(value): retorna tudo que tem assim que um novo objeto for salvo no firebase
     */
    // ref.on('value', snapshot => {
    //     snapshot.forEach(value => {
    //         adicionaCardATela(value.val(), value.key)
    //     })
    // })

    // /**
    //  * 
    //  */
    // ref.on('child_added', snapshot => {
    //     adicionaCardATela(snapshot.val(), snapshot.key)
    // })

    // /**
    //  * 
    //  */
    // ref.on('child_changed', (snapshot, uid) => {
    //     console.log(snapshot.key, uid)
    // })

    // /**
    //  * 
    //  */
    // ref.on('child_removed', snapshot => {
    //     console.log('removed...', snapshot.key)
    // })
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