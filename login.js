// document.addEventListener('DOMContentLoaded', () => {
//     const cadastroForm = document.querySelector('.form-signup');

//     cadastroForm.addEventListener('submit', (event) => {
//         event.preventDefault(); 
//         createLogin();
//     });
// });
// const firebaseConfig = {
//     apiKey: "AIzaSyDFt9rbCz9G-QxetDWfSfEPjC4m3ZE4Z1c",
//     authDomain: "criancasemfoco-a0b2f.firebaseapp.com",
//     projectId: "criancasemfoco-a0b2f",
//     storageBucket: "criancasemfoco-a0b2f.appspot.com",
//     messagingSenderId: "683066524349",
//     appId: "1:683066524349:web:79187ddef2f8cbdc28edd4",
//     measurementId: "G-MD5KVCXSK8"
// };

// firebase.initializeApp(firebaseConfig);

// function createLogin() {
//     var email = document.getElementById('email').value;
//     var password = document.getElementById("password").value;

//     firebase.auth().createUserWithEmailAndPassword(email, password)
//         .then(userCredential => {
//             console.log('Usuário criado com sucesso', userCredential.user);
//             alert("Usuário criado. Login feito.");
//         })
//         .catch(error => {
//             console.error('Erro ao criar usuário:', error);
//         });
// }

// function loginEmail() {
//     var email = document.getElementById('email').value;
//     var password = document.getElementById("password").value;

//     firebase.auth().signInWithEmailAndPassword(email, password).then(() => {
//         alert('Login Efetuado com sucesso!')
//     }).catch(error => {
//         console.log('Erro:', error);
//     })
// }


// function deletaUsuario() {
//     var currentUser;
//     currentUser = firebase.auth().currentUser;
//     if (currentUser) {
//         currentUser.delete().then(() => {
//             alert("tomou R do veigar")
//         }).catch(error => {
//             console.log('Erro:', error);
//         })
//     }
// }

// function logout() {
//     firebase.auth().signOut().then(() => {
//         alert("Usuário deslogado")
//     })
// }