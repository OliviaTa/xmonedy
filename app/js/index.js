// Yandex.Metrika

function reachGoalYM(key) {
    ym(72874123, 'reachGoal', key);
    return true;
}

// slow scroll
const anchors = document.querySelectorAll('a[href*="#"]');

for (const anchor of anchors) {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();

        const blockID = anchor.getAttribute('href').substr(1);

        document.getElementById(blockID).scrollIntoView({
            behavior: 'smooth',
            block: 'start'
        });
    });
}

