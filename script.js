let apiFrases = [];

const fraseContainer = document.getElementById('quote-container');

const fraseTexto = document.getElementById('quote');

const autorTexto = document.getElementById('author');

const twitterBtn = document.getElementById('twitter');

const novaFraseBtn = document.getElementById('new-quote');

const loader = document.getElementById('loader');

//mostrar o loader

function loading(){

    loader.hidden = false;

    fraseContainer.hidden = true;
}

//esconder o loader

function loadingCompleto(){

    fraseContainer.hidden = false;

    loader.hidden = true;

}

//mostra nova frase

function novaFrase(){

    loading();

    //captura uma frase randomica

    const frase = apiFrases[Math.floor(Math.random() * apiFrases.length)];

    //verifica se autor está vazio e coloca como 'desconhecido

    if(!frase.author){

        autorTexto.textContent = 'Autor Desconhecido';

    } else{

        autorTexto.textContent = frase.author;

    }

    //verifica o tamanho do texto para ajustar o estilo
    
    if (frase.text.length>120){

        fraseTexto.classList.add('long-quote');

    } else{

        fraseTexto.classList.remove('long-quote');
        
    }

    //Definir frase e esconder o loader
    
    fraseTexto.textContent = frase.text;

    loadingCompleto();
}

//Pega frases da API

async function pegaFrases(){

    loading();
    
    const apiUrl='https://type.fit/api/quotes';

    try{

        const resposta = await fetch(apiUrl);

        apiFrases = await resposta.json();

        novaFrase();

    } catch(error){
        //captura o erro

    }

}

//tweetar frase
function twittarFrase(){

    const twitterURL = `https://twitter.com/intent/tweet?text="${fraseTexto.textContent}" - ${autorTexto.textContent}`;

    window.open(twitterURL, '_blank');
}

//Event Listeners

novaFraseBtn.addEventListener('click', novaFrase)

twitterBtn.addEventListener('click', twittarFrase)


//ao carregar

pegaFrases();
