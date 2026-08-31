const htmlElement = document.documentElement;
const bodyElement = document.body;
const btnAumentar = document.getElementById('btn-aumentar');
const btnDiminuir = document.getElementById('btn-diminuir');
const btnContraste = document.getElementById('btn-contraste');
const btnOuvir = document.getElementById('btn-ouvir');

let tamanhoAtual = parseInt(localStorage.getItem('fontSizeTamanho')) || 100;
const contrasteSalvo = localStorage.getItem('altoContrasteAtivo');

function aplicarConfiguracoesIniciais() {
    htmlElement.style.fontSize = `${tamanhoAtual}%`;
    if (contrasteSalvo === 'true') {
        bodyElement.classList.add('alto-contraste');
    }
}
aplicarConfiguracoesIniciais();

btnAumentar.addEventListener('click', () => {
    if (tamanhoAtual < 150) { 
        tamanhoAtual += 10;
        htmlElement.style.fontSize = `${tamanhoAtual}%`;
        localStorage.setItem('fontSizeTamanho', tamanhoAtual);
    }
});

btnDiminuir.addEventListener('click', () => {
    if (tamanhoAtual > 80) { 
        tamanhoAtual -= 10;
        htmlElement.style.fontSize = `${tamanhoAtual}%`;
        localStorage.setItem('fontSizeTamanho', tamanhoAtual);
    }
});

btnContraste.addEventListener('click', () => {
    bodyElement.classList.toggle('alto-contraste');
    const estaAtivo = bodyElement.classList.contains('alto-contraste');
    localStorage.setItem('altoContrasteAtivo', estaAtivo);
});

btnOuvir.addEventListener('click', () => {
    window.speechSynthesis.cancel();
    let textoParaLer = document.getElementById('conteudo-principal').innerText;
    
    const cardsVirados = document.querySelectorAll('.flashcard.flipped .card-back');
    cardsVirados.forEach(card => {
        textoParaLer += " . Conteúdo ativado: " + card.innerText;
    });

    const utterance = new SpeechSynthesisUtterance(textoParaLer);
    utterance.lang = 'pt-BR'; 
    utterance.rate = 1.0;     
    window.speechSynthesis.speak(utterance);
});

// FUNÇÃO ATUALIZADA: CONTROLADORA DE FLUXO SEGURO
function virarCard(card) {
    card.classList.toggle('flipped');
    const estaVirado = card.classList.contains('flipped');
    card.setAttribute('aria-expanded', estaVirado);
}

