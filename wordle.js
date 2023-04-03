const rows = document.querySelectorAll('.rows'); // Nodelist qui représente les lignes ou niveaux
const rowsArray = Array.from(rows); //  on crée un tableau à partir de rows, ils sont 6 et sont indexés de 0 à 5
const columns = document.querySelectorAll('.columns'); // on récupère les colonnes pour le thème sombre
let wordBuffer; let isInputValidated; let isWordOfTheDay; let currentRowIndex;

init(); // on initialise le jeu

document.querySelector('#switch').addEventListener('click', darkMode); // on ajoute un listener sur le bouton pour changer de thème
document.addEventListener('keyup', fillRow); // on ajoute un listener sur le document pour remplir les lignes

async function fillRow(e){ // à chaque fois qu'une touche est tapée

    letterBuffer = e.key; //cette touche est gardée dans letterBuffer
    if(isLetter(letterBuffer) && wordBuffer.length < 5) { // on vérifie si cette touche est une lettre et que la longueur du mot ne dépasse pas 5 lettres
        wordBuffer += letterBuffer.toLowerCase() // si oui on le concaténe à l'ancienne valeur de word buffer
        rowsArray[currentRowIndex].children[wordBuffer.length - 1].textContent = letterBuffer.toUpperCase(); // on remplit en même temps la colonne correspondante
    }
    if (letterBuffer === 'Backspace') { // on vérifie si la touche tapée est 'Backspace'
        console.log('there');
        wordBuffer = clearLast(wordBuffer); // alors on efface la dernière lettre saise
    }
    if (letterBuffer === 'Enter') { // si la touche saisie est 'Enter' alors on vérifie la réponse donnée
        const data = await fetch('https://words.dev-apis.com/validate-word', { // on vérifie si le mot saisi est valide
            method: 'POST',
            body : JSON.stringify({ word: wordBuffer })
        }); 
        const validate = await data.json(); // on récupère le résultat de la vérification
        const isValidWord = validate.validWord; // on récupère la valeur de validWord
        isInputValidated = checkRow(wordBuffer, isInputValidated); // on donne la valeur de retour qui est un booléen a isInputValidated
        if (isInputValidated && isValidWord) { // si le input est validé alors
            const promise = await fetch('https://words.dev-apis.com/word-of-the-day'); // on récupère le mot du jour
            const wordObject = await promise.json(); 
            const word = wordObject.word;
            let wordMatch = checkWord(wordBuffer, word); // on passe a 'wordMatch' le booléen de retour de checkWord() qui vérifie si c'est le bon mot
            let columns = Array.from(rowsArray[currentRowIndex].children) // Crée un tableau à partir des colonnes de chaque ligne pour changer la couleur selon la validité de la réponse
            if (wordMatch){ // si c'est le bon mot alors
                document.removeEventListener('keyup', fillRow); // on supprime le listener
                columns.forEach(column => { // on update le background en vert si on trouve
                    column.style.backgroundColor = "#538d4e";
                    column.style.color = "white";
                    column.style.border = "none";
                });
                setTimeout(() => { // on attend 1 secondes
                    alert("Good job, the word of the day was, " + word.toUpperCase() + ", you win! 🎉🎉🎉"); // on affiche une alerte
                    init(); // on réinitialise le jeu
                }, 1000);
            } else { // si ce n'est pas le bon mot alors
                for (let i = 0; i < wordBuffer.length; i++) { // on parcours le mot saisi
                    for (let j = 0; j < word.length; j++) { // on parcours en même temps le mot du jour
                        if (wordBuffer[i] == word[j]) { // si on trouve des caractères se ressemblant alors
                            changeStyle(columns[i], "#b59f3b", "white", "none"); // on update le style de la colonne avec une couleur orange
                            // columns[i] = null; // on supprime la colonne pour ne pas la reprendre dans la boucle

                            if (i == j) { // si en plus de se ressembler ils sont à la même position
                                changeStyle(columns[i], "#538d4e", "white", "none"); // on update le style de la colonne avec une couleur verte
                            }
                            break; // sans le break, toutes les réponse seront coloriés en rouge il attend que j se termine pour changer le background alors que nous on veut un update à chaque itération
                        } else { 
                            changeStyle(columns[i], "#3a3a3c", "white", "none"); // on update le style de la colonne avec une couleur grise foncée
                        }
                        
                    }
                }
                wordBuffer = ""; // on vide le buffer
                wordArray = []; // on vide le tableau
                currentRowIndex++; // et on passe à la ligne suivante
                
                if (currentRowIndex == 6) { // si on est à la dernière ligne alors
                    document.removeEventListener('keyup', fillRow); // on supprime le listener
                    setTimeout(() => { // on attend 1 secondes
                        alert("You lose, the word of the day was, " + word.toUpperCase() + " 😡😡😡"); // on affiche une alerte
                        init(); // on réinitialise le jeu
                    }, 1000);
                }
            }
        } else {
            alert('not a word 😡😡'); // si la réponse n'est pas valide, on affiche une alerte
        }
    }

}

// Contrôle de saisie: vérifie si la touche saisie est une lettre
function isLetter(letter) {

    return /^[a-zA-Z]$/.test(letter); // on vérifie si la touche 'letter' appartient à l'alphabet, majuscule ou minuscule puis on la retourne

}

// Contrôle de saisie: efface la dernière lettre saisie
function clearLast(word) {

    rowsArray[currentRowIndex].children[wordBuffer.length - 1].textContent = ""; // on vide la dernière colonne remplie
    return word.slice(0, -1); // on efface la dernière lettre du mot

}

// Contrôle de saisie: vérifie si le mot fait 5 lettres et existe sinon il renvoie une erreur.
function checkRow(wordBuffer, isInputValidated){

    if (wordBuffer.length < 5) { // on vérifie si il a remplie tous les colones, si non
        alert('not enough letters'); // on renvoie une alerte notifiant qu le nombre de lettre saisies est incomplet
        isInputValidated = false; // et on infirme la validation
    } else { // si on a 5 lettres alors
        isInputValidated = true; // on valide
    }
    return isInputValidated; // on retourne la valeur de isInputValidated

}

// Validation du mot de 5 caractère saisi
function checkWord(wordBuffer, word) {

    isWordOfTheDay = (wordBuffer === word)? true : false; // si le mot saisi et le mot à deviner sont les mêmes, alors isValidated est vraie sinon elle est fausse 
    return isWordOfTheDay; // on retourne la valeur de isValidated

}

// Fonction qui permet de réinitialiser le jeu
function init() {
    wordBuffer = ""; // on vide le buffer
    wordArray = []; // on vide le tableau
    currentRowIndex = 0; // on remet l'index de la ligne à 0
    isInputValidated = false; // on remet la validation de la saisie à false
    isWordOfTheDay = false;  // on remet la validation du mot à false
}

// Fonction qui permet de changer le thème
function darkMode() {
    document.querySelector('#main').classList.toggle('dark'); // on ajoute ou on supprime la classe 'dark' à l'élément 'main'
    const input = document.querySelector('.input'); // on récupère l'input pour le thème sombre
    input.classList.toggle('dark'); // on ajoute ou on supprime la classe 'dark' à l'élément 'input'
    if (input.classList.contains('dark')) { // si l'input contient la classe 'dark' alors
        columns.forEach(column => { // on parcours les colonnes pour changer la couleur de la bordure
            column.style.border = '1px solid var(--dark-theme-border)';
        })
    } else { // sinon on remet la couleur de la bordure par défaut
        columns.forEach(column => {
            column.style.border = '1px solid var(--light-theme-border)';
        })
    }
}

function changeStyle(element, backgroundColor, color, border) {
    element.style.backgroundColor = backgroundColor;
    element.style.color = color;
    element.style.border = border;
}

// petit bonus pour ouvrir le clavier mobile

// ouvrir directement le clavier mobile
function openKeyboard() {
    input.focus();
}
openKeyboard();