const quoteContainer = document.getElementById('quote-container');
const quoteText = document.getElementById('quote');
const authorText = document.getElementById('author');
const twitterButton = document.getElementById('twitter');
const newQuoteButton = document.getElementById('new-quote');
const loader = document.getElementById('loader');

let apiQuotes = [];

function showLoadingSpinner() {
    loader.hidden = false;
    quoteContainer.hidden = true;
}


function removeLoadingSpinner() {
    quoteContainer.hidden = false;
    loader.hidden = true;
}

//montre la nouvelle citation
function newQuote() {
    showLoadingSpinner();
    //choisir une citation aleatoire à partir de l'array ApiQuotes
    const quote = apiQuotes[Math.floor(Math.random() * apiQuotes.length)];
    // verifier si le champs "auteur" est vide, et le remplacer par "unknown"
    if (!quote.author) {
        authorText.textContent = "Unknown";
    } else {
        authorText.textContent = quote.author;
    }
    //verifier la longueur de la citation et appliquer le style en fonction
    if (quote.text.length > 120) {
        quoteText.classList.add("long-quote");
    } else {
        quoteText.classList.remove("long-quote");
    }
    // afficher la citation et cacher le loader
    removeLoadingSpinner();
    quoteText.textContent = quote.text;
}

// Obtenir les citations depuis d'API
async function getQuotes() {
    showLoadingSpinner();
    const apiUrl = 'https://type.fit/api/quotes';
    try {
        const response = await fetch(apiUrl);
        apiQuotes = await response.json();
        newQuote();
    } catch (error) {
        // Attrape l'erreur ici
    }
}

// Tweeter une citation
function tweetQuote() {
    const twitterUrl = `https://twitter.com/intent/tweet?text=${quoteText.textContent} - ${authorText.textContent}`;
    window.open(twitterUrl, '_blank');
}

// Event Listeners
newQuoteButton.addEventListener('click', newQuote);
twitterButton.addEventListener('click', tweetQuote);

// pendant le chargement
getQuotes();
