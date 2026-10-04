const links = document.querySelectorAll('a[target="noi-dung"], area[target="noi-dung"]');

function markCurrentPage(page) {
    links.forEach((link) => {
        const exerciseFolder = new URL('.', link.href).pathname;
        if (page.startsWith(exerciseFolder)) {
            link.setAttribute('aria-current', 'page');
        } else {
            link.removeAttribute('aria-current');
        }
    });
}

links.forEach((link) => {
    link.addEventListener('click', () => markCurrentPage(new URL(link.href).pathname));
});

window.addEventListener('message', (event) => {
    if (event.source === parent && event.data?.type === 'current-exercise' && typeof event.data.page === 'string') {
        markCurrentPage(event.data.page);
    }
});
