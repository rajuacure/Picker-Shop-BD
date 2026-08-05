/*=========================================
Google Login
=========================================*/

import {

GoogleAuthProvider,

signInWithPopup,

sendPasswordResetEmail,

signOut,

onAuthStateChanged,

setPersistence,

browserLocalPersistence,

browserSessionPersistence

} from "https://www.gstatic.com/firebasejs/11.10.0/firebase-auth.js";

const googleProvider = new GoogleAuthProvider();

/*=========================================
Google Sign In
=========================================*/

const googleLoginBtn =
get("googleLogin") || get("googleRegister");

if(googleLoginBtn){

googleLoginBtn.addEventListener("click",async()=>{

try{

const result = await signInWithPopup(

auth,

googleProvider

);

showAlert(

"Welcome " +

(result.user.displayName || "User")

);

window.location.href="dashboard.html";

}catch(error){

showAlert(error.message);

}

});

}

/*=========================================
Forgot Password
=========================================*/

const forgotForm =
get("forgotPasswordForm");

if(forgotForm){

forgotForm.addEventListener("submit",async(e)=>{

e.preventDefault();

const email =
get("resetEmail").value.trim();

const button =
forgotForm.querySelector("button");

button.classList.add("loading");

try{

await sendPasswordResetEmail(

auth,

email

);

showAlert(

"Password reset email sent."

);

forgotForm.reset();

}catch(error){

showAlert(error.message);

}

button.classList.remove("loading");

});

}

/*=========================================
Remember Me
=========================================*/

const rememberMe =
get("rememberMe");

async function applyPersistence(){

try{

if(

rememberMe &&

rememberMe.checked

){

await setPersistence(

auth,

browserLocalPersistence

);

}else{

await setPersistence(

auth,

browserSessionPersistence

);

}

}catch(error){

console.error(error);

}

}

/*=========================================
Logout
=========================================*/

const logoutBtn =
get("logoutBtn");

if(logoutBtn){

logoutBtn.addEventListener("click",async()=>{

try{

await signOut(auth);

localStorage.removeItem("userPhone");

window.location.href="login.html";

}catch(error){

showAlert(error.message);

}

});

}

/*=========================================
Authentication State
=========================================*/

onAuthStateChanged(auth,(user)=>{

if(user){

console.log(

"Logged In:",

user.email

);

}else{

console.log(

"User Logged Out"

);

}

});

console.log("Auth Part 2 Loaded");
