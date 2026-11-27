const motionPreference = window.matchMedia('(prefers-reduced-motion: reduce)');

for (const button of document.querySelectorAll('.alem-play')) {
    button.addEventListener('click', () => {
        const video = button.previousElementSibling;
        video.src = video.dataset.video;
        video.controls = true;
        video.play().catch(() => {});
        button.hidden = true;
        video.focus();
    });
}

for (const gallery of document.querySelectorAll('.alem-gallery')) {
    const track = gallery.querySelector('.alem-track');
    const slides = [...track.children];

    function move(direction) {
        const start = slides[0].offsetLeft;
        const positions = slides.map(slide => slide.offsetLeft - start);
        const end = track.scrollWidth - track.clientWidth;
        const stops = [...new Set(positions.map(position => Math.min(position, end)))];
        const next = direction > 0
            ? stops.find(position => position > track.scrollLeft + 2) ?? 0
            : stops.findLast(position => position < track.scrollLeft - 2) ?? end;
        track.scrollTo({ left: next, behavior: motionPreference.matches ? 'instant' : 'smooth' });
    }

    for (const button of gallery.querySelectorAll('[data-step]')) {
        button.addEventListener('click', () => move(Number(button.dataset.step)));
    }

    const toggle = gallery.querySelector('[data-toggle]');
    if (!toggle) continue;

    let active = !motionPreference.matches;
    let visible = false;
    function updateToggle() {
        toggle.textContent = active ? 'Pausar avance' : 'Reanudar avance';
    }

    updateToggle();
    toggle.addEventListener('click', () => {
        active = !active;
        updateToggle();
    });
    motionPreference.addEventListener('change', event => {
        active = !event.matches;
        updateToggle();
    });
    new IntersectionObserver(([entry]) => {
        visible = entry.isIntersecting;
    }).observe(track);
    window.setInterval(() => {
        if (!active || !visible || document.hidden || gallery.matches(':hover, :focus-within')) return;
        if ([...track.querySelectorAll('video')].some(video => !video.paused)) return;
        move(1);
    }, 4500);
}
