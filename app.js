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
// function fillRows (e) {
//     rows.forEach(row => {  // We have 6 rows
//         if (e.key !== "Enter") { // If the key pressed is not the enter key
//             for (let i = 0; i < row.children.length; i++) { // We have 5 columns
//                 const column = row.children[i]; // We have 5 columns
//                 if (column.textContent === "") { // If the column is empty
//                     console.log(column);
//                     column.textContent = e.key; // Fill the column with the key pressed
//                 }
//             }
//         }
//     })
// }

// We have an array of strings, and the array length is 5, for each keypress event, we want to fill the first column with the first string, the second column with the second string, and so on.
//  If the array length is 5, and we press the enter key, we want to start over again with the first string in the first column of the next row.
//  We have 6 rows. When all the rows are filled, we will check if the word made by the strings in the columns is a valid word, else we will clear the row and start over again.

// let row = Array.from(row_1.children)
// for (let i = 0; i < row.length; i++) {
//     const column = row[i];
//     if (column.textContent === "") {
//         document.addEventListener('keypress', (e) => {
//             column.textContent = e.key;
//             console.log(row);
//             row.shift();
//             console.log(row);
//         });
//     } else {
//         row.shift();
//         break;
//     }
// }
// let buffer = [];
// document.addEventListener('keypress', (e) => {
//     while (buffer.length < 5) {
//         buffer.push(e.key);
//     }
//     if (buffer.length === 5) {
//         console.log(buffer);
//         buffer = [];
//     }
// });
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