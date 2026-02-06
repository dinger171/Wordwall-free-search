const URL = 'https://wordwall.net/en-us/community/';

const searchField = document.getElementById('input');
const iframe = document.getElementById('wordwalliframe');

function resizeIframe() {
    iframe.width = window.innerWidth;
    iframe.height = window.innerHeight;
}

resizeIframe();
window.addEventListener('resize', resizeIframe);

iframe.src = URL;

// simple debounce
let timeout;
searchField.addEventListener('input', () => {
    let magicNumber = 0;
    for (let i = 0; i < searchField.value.length; i++) {
        magicNumber += searchField.value.charCodeAt(i);
    }
    searchField.style.backgroundColor = `hsl(${magicNumber % 360}, 50%, 80%)`;
    clearTimeout(timeout);
    timeout = setTimeout(() => {
        const text = searchField.value.trim();
        const searchURL = URL + encodeURIComponent(text.replace(/\s+/g, '-'));
        iframe.src = searchURL;
    }, 2000);
});

iframe.addEventListener('load', () => {
    setTimeout(() => {
        searchField.focus({ preventScroll: true });
    }, 0);
});

