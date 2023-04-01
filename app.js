console.log("Konichiwa, nakama");
console.log("Omae wa mou shindeiru");
const input = document.querySelector('.input');
const columns = document.querySelectorAll('.columns');
const rows = document.querySelectorAll('.rows');
row_1 = rows[0];
row_2 = rows[1];
row_3 = rows[2];
row_4 = rows[3];
row_5 = rows[4];
row_6 = rows[5];
row_content_1 = [];
row_content_2 = [];
row_content_3 = [];
row_content_4 = [];
row_content_5 = [];
row_content_6 = [];

document.querySelector('#switch').addEventListener('click', darkMode);
// document.addEventListener('keypress', fillRows);

function darkMode() {
    document.querySelector('#main').classList.toggle('dark');
    input.classList.toggle('dark');
    if (input.classList.contains('dark')) {
        columns.forEach(column => {
            column.style.border = '1px solid var(--dark-theme-border)';
        })
    } else {
        columns.forEach(column => {
            column.style.border = '1px solid var(--light-theme-border)';
        })
    }
}
console.log(row_1.children);
document.addEventListener('keypress', fillRows);

function fillRows(e) {

    if (row_content_1.length < 5) {
        fillRow(row_content_1, row_1, e);
    } else if (row_content_2.length < 5) {
        fillRow(row_content_2, row_2, e)
    } else if (row_content_3.length < 5) {
        fillRow(row_content_3, row_3, e)
    } else if (row_content_4.length < 5) {
        fillRow(row_content_4, row_4, e)
    } else if (row_content_5.length < 5) {
        fillRow(row_content_5, row_5, e)
    } else if (row_content_6.length < 5) {
        fillRow(row_content_6, row_6, e)
    } else {
        removeEventListener('keypress', fillRows);
    }
}

function fillRow(rowContent, rowCollection, e) {
    rowContent.push(e.key);
    let columns = Array.from(rowCollection.children);
    for (let i = 0; i < columns.length; i++) {
        const column = columns[i];
        if (column.textContent === "") {
            column.textContent = e.key;
            break;
        }
    }
}

word = "oybun";
let wordArray = word.split("");
console.log(wordArray);
for (let i = 0; i < wordArray.length; i++) {
    const letter = wordArray[i];
    if (wordArray[i] === row_content_1) {
        
    }
}

// an array inside an array inside an array inside an array inside an array inside an array... it will be tiring😪.... it'ill make my head spin😵