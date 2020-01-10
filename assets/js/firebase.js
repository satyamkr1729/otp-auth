/* eslint-disable linebreak-style */
/* eslint-disable max-len */
const firebaseConfig = {
  authDomain: 'dracarys-6788a.firebaseapp.com',
  databaseURL: 'https://dracarys-6788a.firebaseio.com',
  projectId: 'dracarys-6788a',
  storageBucket: 'dracarys-6788a.appspot.com',
  messagingSenderId: '247047365435',
  appId: '1:247047365435:web:996bd9b00b1e907fed0d1e',
};

try {
  const xhr = new XMLHttpRequest();
  xhr.open('GET', '/firebase/apikey');
  xhr.onreadystatechange = function() {
    if (this.readyState == 4 && this.status == 200) {
      const response = JSON.parse(this.responseText);
      firebaseConfig.apiKey = response.apiKey;
      // Initialize Firebase
      firebase.initializeApp(firebaseConfig);
      firebase.auth().useDeviceLanguage();
      window.recaptchaVerifier = new firebase.auth.RecaptchaVerifier('recaptcha-container');
      document.querySelector('div#busy').style.display = 'none';
    }
  };

  xhr.onerror = function() {
    console.log('Failed to fetch firebase apikey');
  };
  xhr.send();
} catch (err) {
  console.log(err);
};

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
