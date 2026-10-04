const menuImage = document.querySelector('#paper-menu');
const areas = [...document.querySelectorAll('area')];
const originalCoordinates = areas.map((area) => area.coords.split(',').map(Number));
const currentOutline = document.querySelector('#current-outline');

function updateSelectedOutline() {
    const selectedIndex = areas.findIndex((area) => area.getAttribute('aria-current') === 'page');
    const points = selectedIndex === -1 ? '' : originalCoordinates[selectedIndex].join(' ');
    currentOutline.setAttribute('points', points);
}

function resizeImageMap() {
    const scale = menuImage.clientWidth / 256;
    areas.forEach((area, index) => {
        area.coords = originalCoordinates[index].map((coordinate) => Math.round(coordinate * scale)).join(',');
    });
}

menuImage.addEventListener('load', resizeImageMap);
window.addEventListener('resize', resizeImageMap);
new MutationObserver(updateSelectedOutline).observe(document.querySelector('#exercise-map'), {
    attributes: true,
    attributeFilter: ['aria-current'],
    subtree: true
});
resizeImageMap();
updateSelectedOutline();
