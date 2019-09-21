// Initialize Firebase
let userId = "";
var firebaseConfig = {
    apiKey: "AIzaSyATeth0_FV3JfWq2cX6MMqloaUYFOlmyBM",
    authDomain: "track-ba5bb.firebaseapp.com",
    databaseURL: "https://track-ba5bb.firebaseio.com",
    projectId: "track-ba5bb",
    storageBucket: "",
    messagingSenderId: "125717041194",
    appId: "1:125717041194:web:72fa849b47e23e96"
};

firebase.initializeApp(firebaseConfig);
const auth = firebase.auth();
const db = firebase.firestore();



// User SignIn/SignOut/SingUp Methods
function userLogIn(){
    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;
    auth.signInWithEmailAndPassword(email , password).then( cred => {
        if(cred.user.uid)window.location='dashboard.html'
    }).catch( err => {
        if ( err.code === "auth/wrong-password"){
            alert("Usuario ou Senha Inválida")
        } else if ( err.code === "auth/user-not-found" ){
            alert("Usuário Inexistente")
        }
    });  
}

function userLogOut(){
    auth.signOut();
    window.location='../index.html';
}

function userSignUp() {
    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;
    const nameLastName = document.getElementById("name").value;

    if ( email.length >= 13 )  { 
        if ( password.length > 5 ){
            if ( nameLastName.length >= 9 ){
                auth.createUserWithEmailAndPassword(email , password).then(cred => {
                    return db.collection(`users/${cred.user.uid}/userInfo`).doc('info').set({
                        name : nameLastName,
                        uid: cred.user.uid,
                        email: cred.user.email
                    }).then( () =>  {
                        window.location="dashboard.html";
                    })
                  })
            } else{
                alert("Insira seu Nome e Sobrenome")
            }
        } else{
            document.getElementById("password").value = "";
            alert("A senha deve conter mais de 5 caracteres")
        }
     } else { 
         alert("E-mail Muito Curto")
     }
} 

auth.onAuthStateChanged( user => {
    userId = user.uid;
    showIdeas();
})