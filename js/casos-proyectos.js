const results = document.querySelector('.project-results');
const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');

if (results && !reducedMotion.matches && 'IntersectionObserver' in window) {
    const numbers = Array.from(results.querySelectorAll('[data-count]'), element => ({
        element,
        target: Number(element.dataset.count),
        finalText: element.textContent
    }));
    const format = new Intl.NumberFormat('es-AR');

    const observer = new IntersectionObserver(entries => {
        if (!entries.some(entry => entry.isIntersecting)) return;
        observer.disconnect();

        const start = performance.now();
        const duration = 1400;

        function tick(now) {
            const progress = Math.min(1, Math.max(0, (now - start) / duration));
            const finished = progress === 1 || reducedMotion.matches;
            const eased = 1 - (1 - progress) ** 3;

            for (const { element, target, finalText } of numbers) {
                element.textContent = finished ? finalText : format.format(Math.round(target * eased));
            }

            if (!finished) requestAnimationFrame(tick);
        }

        requestAnimationFrame(tick);
    }, { threshold: .2 });

    observer.observe(results);
}
