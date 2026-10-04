const music = document.querySelector('#background-music');
const musicToggle = document.querySelector('#music-toggle');
const menuStyle = document.querySelector('#menu-style');

menuStyle.addEventListener('change', () => {
    parent.postMessage({ type: 'change-menu', style: menuStyle.value }, '*');
});

window.addEventListener('message', (event) => {
    if (event.source === parent && event.data?.type === 'menu-style') {
        menuStyle.value = event.data.style;
    }
});

musicToggle.addEventListener('click', async () => {
    if (music.paused) {
        try {
            await music.play();
            musicToggle.textContent = 'Tắt nhạc';
            musicToggle.setAttribute('aria-pressed', 'true');
        } catch {
            musicToggle.textContent = 'Thử bật nhạc lại';
            musicToggle.setAttribute('aria-pressed', 'false');
        }
    } else {
        music.pause();
        musicToggle.textContent = 'Bật nhạc';
        musicToggle.setAttribute('aria-pressed', 'false');
    }
});
