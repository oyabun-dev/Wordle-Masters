const rows = document.querySelectorAll('.rows'); // Nodelist qui représente les lignes ou niveaux
const rowsArray = Array.from(rows); //  on crée un tableau à partir de rows, ils sont 6 et sont indexés de 0 à 5
var wordBuffer; var isInputValidated; var isValidated; var currentRowIndex;

init();

document.addEventListener('keyup', fillRow);

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
        isInputValidated = checkRow(wordBuffer, isInputValidated); // on donne la valeur de retour qui est un booléen a isInputValidated
        if (isInputValidated) { // si le input est validé alors
            const promise = await fetch('https://words.dev-apis.com/word-of-the-day');
            const wordObject = await promise.json();
            const word = wordObject.word;
            let wordMatch = checkWord(wordBuffer, word); // on passe a 'wordMatch' le booléen de retour de checkWord() qui vérifie si c'est le bon mot
            let columns = Array.from(rowsArray[currentRowIndex].children) // Crée un tableau à partir des colonnes de chaque ligne pour changer la couleur selon la validité de la réponse
            if (wordMatch){ // si c'est le bon mot alors
                document.removeEventListener('keyup', fillRow); // on supprime le listener
                columns.forEach(column => { // on update le background en vert si on trouve
                    column.style.backgroundColor = "limegreen";
                    column.style.color = "white";
                    column.style.borderColor = "green";
                }); 
                alert("Good job, you win! 🎉🎉🎉");
            } else { // si ce n'est pas le bon mot alors
                for (let i = 0; i < wordBuffer.length; i++) { // on parcours le mot saisi
                    for (let j = 0; j < word.length; j++) { // on parcours en même temps le mot du jour
                        if (wordBuffer[i] == word[j]) { // si on trouve des caractères se ressemblant alors, on update le background en orange
                            columns[i].style.backgroundColor = "orange";
                            columns[i].style.color = "white";
                            columns[i].style.borderColor = "#f5f5f5";
                            if (i == j) { // si en plus de se ressembler ils sont à la même position, on update le background en vert
                                columns[i].style.backgroundColor = "limegreen";
                                columns[i].style.color = "white";
                                columns[i].style.borderColor = "#f5f5f5";
                            }
                            break; // sans le break, toutes les réponse seront coloriés en rouge il attend que j se termine pour changer le background alors que nous on veut un update à chaque itération
                        } else { // sinon, on update le background en rouge pour les mauvaise réponses
                            columns[i].style.backgroundColor = "red";
                            columns[i].style.color = "white";
                            columns[i].style.borderColor = "green";
                        }
                        
                    }
                }
                wordBuffer = ""; // on vide le buffer
                wordArray = []; // on vide le tableau
                currentRowIndex++; // et on passe à la ligne suivante
            
            }
        }
    }
    // let wordArray = wordBuffer.split(""); // convertie la chaîne de caractère en tableau de caractères.

    // return wordArray; // on retourne le tableau et la valeur de retour de la vérification

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

    isValidated = (wordBuffer === word)? true : false; // si le mot saisi et le mot à deviner sont les mêmes, alors isValidated est vraie sinon elle est fausse 
    return isValidated; // on retourne la valeur de isValidated

}

function init() {
    wordBuffer = ""; // on vide le buffer
    wordArray = []; // on vide le tableau
    currentRowIndex = 0;
    isInputValidated = false;
    isValidated = false; 
}