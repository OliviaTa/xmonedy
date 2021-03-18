// Yandex.Metrika

function upperButton() {
    ym(72874123, 'reachGoal', 'upperButton');
    return true;
}

function lowerButton() {
    ym(72874123, 'reachGoal', 'lowerButton');
    return;
}

// slow scroll
const anchors = document.querySelectorAll('a[href*="#"]');

for (const anchor of anchors) {
    anchor.addEventListener('click', function(e) {
        e.preventDefault();

        const blockID = anchor.getAttribute('href').substr(1);

        document.getElementById(blockID).scrollIntoView({
            behavior: 'smooth',
            block: 'start'
        });
    });
}

