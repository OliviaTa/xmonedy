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

DBUsersCounter.on('value', (snapshot) => {
  const count = snapshot.val();
  console.log(`Count of active users: ${count}`);
});

// form processing
function formOnsubmit(event) {
  event.preventDefault();

  const { target: form } = event;

  const clearErrorSuccess = () => {
    email.classList.remove('error');
    email.classList.remove('success');
  }

  const { email, comment, subscribe } = event.target;

  clearErrorSuccess();

  addUser({
    email: email.value,
    comment: comment.value,
    subscribe: subscribe.checked
  }).then(x => {
    form.reset();
    email.classList.add('success');
    setTimeout(clearErrorSuccess, 2000);
  }).catch(error => {
    email.classList.add('error');
    setTimeout(clearErrorSuccess, 2000);
  });
}

