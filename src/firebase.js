import app from 'firebase/app';
import 'firebase/database';
import 'firebase/auth';
import 'firebase/storage';


let firebaseConfig = {
  apiKey: "AIzaSyB1Rl5HlcnXYvNjSZpr7QugUiiD_Nj7N10",
  authDomain: "reactapp-76536.firebaseapp.com",
  projectId: "reactapp-76536",
  storageBucket: "reactapp-76536.appspot.com",
  messagingSenderId: "623690341768",
  appId: "1:623690341768:web:0be363776812c147bdee3d",
  measurementId: "G-J8FJ0TE79D"
};

class Firebase {
  constructor(){

    if (!app.apps.length) {
       app.initializeApp(firebaseConfig);
    }else {
       app.app();
    }

    //Referenciando a database para acessar em outros locais
    this.app = app.database();
    this.storage = app.storage();

  }

  login(email, password){
    return app.auth().signInWithEmailAndPassword(email, password)
  }

  async register(nome, email, password){
    await app.auth().createUserWithEmailAndPassword(email, password);

    const uid = app.auth().currentUser.uid;

    return app.database().ref('usuarios').child(uid).set({
      nome: nome
    })
  }

  logout(){
    return app.auth().signOut();
  }

  isInitialized(){
    return new Promise(resolve =>{
        app.auth().onAuthStateChanged(resolve);
    })
  }

  getCurrent(){
    //&& -> se acondição anterior for bem sucedida
    return app.auth().currentUser && app.auth().currentUser.email
  }

  getCurrentUid(){
    //&& -> se acondição anterior for bem sucedida
    return app.auth().currentUser && app.auth().currentUser.uid
  }

  async getUserName(callback){
    if(!app.auth().currentUser){
      return null;
    }

    const uid = app.auth().currentUser.uid;
    await app.database().ref('usuarios').child(uid)
    .once('value').then(callback);

  }

}

export default new Firebase();
