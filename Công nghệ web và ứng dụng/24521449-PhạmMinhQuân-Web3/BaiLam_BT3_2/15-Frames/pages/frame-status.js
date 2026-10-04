function reportCurrentExercise() {
    if (parent !== window) {
        parent.postMessage({ type: 'exercise-loaded', page: location.pathname }, '*');
    }
}

window.addEventListener('pageshow', reportCurrentExercise);
reportCurrentExercise();
