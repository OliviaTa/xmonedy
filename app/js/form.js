// Realtime Database Firebase

// Your web app's Firebase configuration
var firebaseConfig = {
  apiKey: "AIzaSyAX5tSjxzvjI5RlB6weQ52u9dbudYNn2oI",
  authDomain: "x-monedy-991a7.firebaseapp.com",
  databaseURL: "https://x-monedy-991a7-default-rtdb.europe-west1.firebasedatabase.app",
  projectId: "x-monedy-991a7",
  storageBucket: "x-monedy-991a7.appspot.com",
  messagingSenderId: "948151740026",
  appId: "1:948151740026:web:e9021e333724445504bdc3",
  measurementId: "G-T888D44M3D"
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);
firebase.analytics();

const addUser = firebase.functions().httpsCallable('addUser');
const DBUsersCounter = firebase.database().ref('counter');
let usersCount = 0;

DBUsersCounter.on('value', (snapshot) => {
  usersCount = snapshot.val();
  console.log(`Count of active users: ${usersCount}`);
});

// form processing
function formOnsubmit(event) {
  event.preventDefault();

  const { target: form } = event;

  const loadButton = () => {
    button.disabled = true;
    button.classList.add('disabled');
    button.classList.add('loading');
    button.innerText = '';
  };

  const successButton = (msg) => {
    button.classList.remove('loading');
    button.innerText = msg;
  };

  const showPopup = (msg) => {
    const popup = document.querySelector('.popup');
    const popupText = popup.querySelector('.popup__text');

    popup.classList.add('show');
    popupText.innerText = msg;
  
    setTimeout(() => popup.classList.remove('show'), 3000);
  };

  const { email, comment, subscribe } = event.target;
  const button = form.querySelector('.btn');

  loadButton();

  addUser({
    email: email.value,
    comment: comment.value,
    subscribe: subscribe.checked
  }).then(x => {
    form.reset();
    console.log(event);
    successButton('Вы с нами!');
    showPopup(`Нас уже ${usersCount}. Спасибо за то что вы с нами.`);
  }).catch(error => {
    form.reset();
    successButton('Вы уже с нами!');
  });
}

