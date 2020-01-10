/* eslint-disable linebreak-style */
/* eslint-disable max-len */
const firebaseConfig = {
  apiKey: 'AIzaSyAfbf_wnJiuakat0Wvb-xFlDuBL-oVd8N0',
  authDomain: 'dracarys-6788a.firebaseapp.com',
  databaseURL: 'https://dracarys-6788a.firebaseio.com',
  projectId: 'dracarys-6788a',
  storageBucket: 'dracarys-6788a.appspot.com',
  messagingSenderId: '247047365435',
  appId: '1:247047365435:web:996bd9b00b1e907fed0d1e',
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);

firebase.auth().useDeviceLanguage();

window.recaptchaVerifier = new firebase.auth.RecaptchaVerifier('recaptcha-container');

document.querySelector('div.phonenumber form').addEventListener('submit', (ev) => {
  ev.preventDefault();
  const form = document.querySelector('div.phonenumber form');
  const number = form['countryCode'].value + form['mobile'].value;
  const appVerifier = window.recaptchaVerifier;
  firebase.auth().signInWithPhoneNumber(number, appVerifier).then((confirmationResult) => {
    window.confirmationResult = confirmationResult;
    document.querySelector('div.phonenumber').style.display = 'none';
    document.querySelector('div.otp').style.display = 'block';
  }).catch((error) => {
    // Error; SMS not sent
    // ...
    console.log(error);
  });
});

document.querySelector('div.otp form').addEventListener('submit', (ev) => {
  ev.preventDefault();
  window.confirmationResult.confirm(ev.srcElement['otp'].value).then((result) => {
    document.querySelector('div.otp form').style.display = 'none';
    document.querySelector('div.welcome').style.display = 'block';
  }).catch((error) => {
    alert('Incorrect otp!!');
  });
});
