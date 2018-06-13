var config = {
  apiKey: 'AIzaSyBSc7hMzlaLzleB_6nNfqJXgcdvhN2PUyk',
  authDomain: 'worktracker-8404d.firebaseapp.com',
  databaseURL: 'https://worktracker-8404d.firebaseio.com',
  projectId: 'worktracker-8404d',
  storageBucket: 'worktracker-8404d.appspot.com',
  messagingSenderId: '255941365467'
};
firebase.initializeApp(config);

var bigOne = document.querySelector('#bigOne');
var dbRef = firebase
  .database()
  .ref()
  .child('text');
dbRef.on('value', snap => (bigOne.innerText = snap.val()));

const inputEmail = document.querySelector('#inputEmail');
const inputPassword = document.querySelector('#inputPassword');
const btnLogIn = document.querySelector('#btnLogIn');
const btnLogOut = document.querySelector('#btnLogOut');
const btnSignUp = document.querySelector('#btnSignUp');
const btnFacebookLogIn = document.querySelector('#btnFacebookLogIn');
const errorMessageContainer = document.querySelector('#error-message');
const userContainer = document.querySelector('#user-container');
errorMessageContainer.classList.add('hidden');
userContainer.classList.add('hidden');

const auth = firebase.auth();

var facebookAuth = new firebase.auth.FacebookAuthProvider();

btnFacebookLogIn.addEventListener('click', () => {
  auth
    .signInWithPopup(facebookAuth)
    .then(result => {
      const user = result.user;
      console.log(result);
    })
    .catch(err => {
      console.log(err);
      showError(err.message);
    });
});

btnLogIn.addEventListener('click', () => {
  clearError();
  const email = inputEmail.value;
  const password = inputPassword.value;
  auth
    .signInWithEmailAndPassword(email, password)
    .catch(err => showError(err.message));
});
btnLogOut.addEventListener('click', () => {
  clearError();
  auth.signOut().catch(err => showError(err.message));
});
btnSignUp.addEventListener('click', () => {
  clearError();
  const email = inputEmail.value;
  const password = inputPassword.value;
  auth
    .createUserWithEmailAndPassword(email, password)
    .catch(err => showError(err.message));
});

auth.onAuthStateChanged(user => {
  if (user) {
    userContainer.classList.remove('hidden');
    userContainer.innerText = JSON.stringify(user, null, 2);
    console.log({ user });
    btnLogIn.classList.add('hidden');
    btnSignUp.classList.add('hidden');
    btnFacebookLogIn.classList.add('hidden');
    btnLogOut.classList.remove('hidden');
  } else {
    console.log('not logged in');
    userContainer.classList.add('hidden');
    btnLogIn.classList.remove('hidden');
    btnSignUp.classList.remove('hidden');
    btnFacebookLogIn.classList.remove('hidden');
    btnLogOut.classList.add('hidden');
  }
});

function clearError() {
  errorMessageContainer.classList.add('hidden');
}

function showError(message) {
  errorMessageContainer.innerText = message;
  errorMessageContainer.classList.remove('hidden');
}
