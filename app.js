console.log("Konichiwa, nakama");
console.log("Omae wa mou shindeiru");
const main = document.querySelector('#main');
const input = document.querySelector('.input');
const columns = document.querySelectorAll('.columns');
const themeSwitcher = document.querySelector('#switch');

themeSwitcher.addEventListener('click', darkMode);
function darkMode () {
    main.classList.toggle('dark');
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