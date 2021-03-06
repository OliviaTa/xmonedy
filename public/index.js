// burger menu for mobile
let menuIcon = document.querySelector('.page-header .menu-icon');
let mainNav = document.querySelector('.page-header .main-nav');
let body = document.querySelector('body');
let mainNavElements = document.querySelectorAll('.page-header .main-nav a');

menuIcon.onclick = function () {
    mainNav.classList.remove('opacity');
    menuIcon.classList.toggle('change');
    mainNav.classList.toggle('change');
    body.classList.toggle('change');
}

for (let element of mainNavElements) {
    element.onclick = function () {
        if (mainNav.classList.contains('change')) {
            menuIcon.classList.remove('change');
            mainNav.classList.remove('change');
            body.classList.remove('change');
            mainNav.classList.add('opacity');
        }
    }
}

function upperButton() {
    // Yandex.Metrika
    ym(72874123, 'reachGoal', 'upperButton');
    return true;
    // Yandex.Metrika
}

function lowerButton() {
    // Yandex.Metrika
    ym(72874123, 'reachGoal', 'lowerButton');
    return;
    // Yandex.Metrika
}

// Realtime Database Firebase
(function() {
    let firebaseConfig = {
        apiKey: "AIzaSyB3IqbX1Epbda6iYXQQjvzksA54BbAt2xU",
        authDomain: "x-monedy.firebaseapp.com",
        databaseURL: "https://x-monedy-default-rtdb.firebaseio.com",
        projectId: "x-monedy",
        storageBucket: "x-monedy.appspot.com",
        messagingSenderId: "954249409400",
        appId: "1:954249409400:web:6ea04055fb79b4d268ce8d",
        measurementId: "G-0978LSP5X3"
    };
    firebase.initializeApp(firebaseConfig);
    let databaseUsers = firebase.database().ref('users/');
    let existingEmails = [];
    databaseUsers.on('value', (snapshot) => {
        const data = snapshot.val();
        existingEmails = [];
        for (const key in data) {
            if (Object.hasOwnProperty.call(data, key)) {
                existingEmails.push(data[key].email);
            }
        }
    });
    
    function writeFormInRD(email, comment) {
        databaseUsers.push({
            email: email,
            comment: comment
        });
    }
    
    // form processing
    let form = document.querySelector('.subscribe-form');
    form.onsubmit = function(event) {
        event.preventDefault();

        const email = event.target.email;
        const comment = event.target.comment;

        clearErrorSuccess();

        console.log(existingEmails.includes(email.value));
        if(existingEmails.includes(email.value)) {
            form.classList.add('error');
            setTimeout(clearErrorSuccess, 2000);
        } else {
            writeFormInRD(email.value, comment.value);
            form.reset();
            form.classList.add('success');
            setTimeout(clearErrorSuccess, 2000);
        }
        return false;
    }

    function clearErrorSuccess() {
        form.classList.remove('error');
        form.classList.remove('success');
    }
})();

