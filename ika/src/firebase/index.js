import firebase from 'firebase/app';
import 'firebase/storage';

//Inicializa Firebase
const config = {
    apiKey: "AIzaSyDfizq1VcqBP71aFDGnTSWIaUu7nhKaBCM",
    authDomain: "ikastorage.firebaseapp.com",
    databaseURL: "https://ikastorage.firebaseio.com",
    projectId: "ikastorage",
    storageBucket: "gs://ikastorage.appspot.com/",
    messagingSenderId: "281368325520",
    appId: "1:281368325520:web:57d158b6aef2131a0e5715",
    measurementId: "G-3CC50ZN5LK"
  }
  firebase.initializeApp(config);

  const storage = firebase.storage();

  export{
      storage, firebase as default
    }