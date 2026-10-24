const toggle = document.querySelector('#menu-toggle');
const menu = document.querySelector('#lessons');
const frame = document.querySelector('iframe');
const links = [...document.querySelectorAll('a[target="noi-dung"]')];
const groups = [...document.querySelectorAll('.nav-group')];

function setMenu(open) {
  menu.classList.toggle('is-open', open);
  toggle.setAttribute('aria-expanded', String(open));
  toggle.setAttribute('aria-label', open ? 'Đóng mục lục' : 'Mở mục lục');
}
function markPage(path) {
  links.forEach(link => {
    if (new URL(link.href).pathname === path) link.setAttribute('aria-current', 'page');
    else link.removeAttribute('aria-current');
  });
}
toggle.addEventListener('click', () => setMenu(!menu.classList.contains('is-open')));
links.forEach(link => link.addEventListener('click', () => {
  markPage(new URL(link.href).pathname);
  setMenu(false);
  groups.forEach(group => { group.open = false; });
  frame.title = link.textContent.trim();
}));
groups.forEach(group => group.addEventListener('toggle', () => {
  if (group.open) groups.forEach(other => { if (other !== group) other.open = false; });
}));
document.addEventListener('click', event => {
  groups.forEach(group => { if (!group.contains(event.target)) group.open = false; });
});
document.addEventListener('keydown', event => {
  if (event.key !== 'Escape') return;
  const openGroup = groups.find(group => group.open);
  if (openGroup) { openGroup.open = false; openGroup.querySelector('summary').focus(); }
  if (menu.classList.contains('is-open')) { setMenu(false); toggle.focus(); }
});
frame.addEventListener('load', () => {
  // File URLs may have separate origins; click handlers still track those visits.
  try { markPage(frame.contentWindow.location.pathname); } catch { /* file origin */ }
});
const music = document.querySelector('#music');
const sound = document.querySelector('#sound');
sound.addEventListener('click', async () => {
  if (music.paused) {
    try {
      await music.play();
      sound.textContent = '♫ Tắt nhạc nền';
      sound.setAttribute('aria-pressed', 'true');
    } catch { sound.textContent = 'Không thể phát nhạc'; }
  } else {
    music.pause();
    sound.textContent = '♫ Bật nhạc nền';
    sound.setAttribute('aria-pressed', 'false');
  }
});
