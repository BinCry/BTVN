const contentFrame = document.querySelector('frame[name="noi-dung"]');
const menuFrame = document.querySelector('frame[name="menu"]');
const headerFrame = document.querySelector('frame[name="header"]');
const bodyFrames = document.querySelector('#body-frames');
let currentPage = new URL(contentFrame.src).pathname;
const menuPages = {
    paper: 'menu-paper.html',
    leaves: 'menu-leaves.html',
    buttons: 'menu.html'
};
const requestedStyle = new URLSearchParams(location.search).get('menu');
let menuStyle = Object.hasOwn(menuPages, requestedStyle) ? requestedStyle : 'buttons';

function updateStyleControl() {
    headerFrame.contentWindow.postMessage({ type: 'menu-style', style: menuStyle }, '*');
}

function changeMenu(style) {
    if (!Object.hasOwn(menuPages, style)) {
        return;
    }

    menuStyle = style;
    menuFrame.src = menuPages[style];
    const address = new URL(location.href);
    address.searchParams.set('menu', style);
    history.replaceState(null, '', address);
    updateStyleControl();
}

function updateMenu() {
    menuFrame.contentWindow.postMessage({ type: 'current-exercise', page: currentPage }, '*');
}

function resizeFrames() {
    const menuWidth = Math.min(256, Math.max(176, Math.round(window.innerWidth * 0.2)));
    bodyFrames.cols = menuWidth + ',*';
}

window.addEventListener('message', (event) => {
    if (event.source === headerFrame.contentWindow && event.data?.type === 'change-menu') {
        changeMenu(event.data.style);
        return;
    }

    if (event.source !== contentFrame.contentWindow || event.data?.type !== 'exercise-loaded') {
        return;
    }

    if (typeof event.data.page !== 'string') {
        return;
    }

    currentPage = event.data.page;
    updateMenu();
});

menuFrame.addEventListener('load', updateMenu);
headerFrame.addEventListener('load', updateStyleControl);
window.addEventListener('resize', resizeFrames);
if (menuStyle !== 'buttons') {
    menuFrame.src = menuPages[menuStyle];
}
resizeFrames();
