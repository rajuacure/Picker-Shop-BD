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
/*=========================================
Route Guard
=========================================*/

function requireLogin(){

onAuthStateChanged(auth,(user)=>{

if(!user){

window.location.href="login.html";

}

});

}

function guestOnly(){

onAuthStateChanged(auth,(user)=>{

if(user){

window.location.href="dashboard.html";

}

});

}

/*=========================================
Email Verification Check
=========================================*/

function checkEmailVerification(){

onAuthStateChanged(auth,(user)=>{

if(!user) return;

if(!user.emailVerified){

showAlert(

"Please verify your email before continuing."

);

}

});

}

/*=========================================
Dashboard User Information
=========================================*/

const dashboardName =
get("dashboardName");

const dashboardEmail =
get("dashboardEmail");

const dashboardPhoto =
get("dashboardPhoto");

onAuthStateChanged(auth,(user)=>{

if(!user) return;

if(dashboardName){

dashboardName.textContent =

user.displayName || "User";

}

if(dashboardEmail){

dashboardEmail.textContent =

user.email;

}

if(

dashboardPhoto &&

user.photoURL

){

dashboardPhoto.src =

user.photoURL;

}

});

/*=========================================
Profile Dropdown
=========================================*/

const profileMenu =
get("profileMenu");

const profileToggle =
get("profileToggle");

if(profileMenu && profileToggle){

profileToggle.addEventListener("click",()=>{

profileMenu.classList.toggle("show");

});

document.addEventListener("click",(e)=>{

if(

!profileToggle.contains(e.target) &&

!profileMenu.contains(e.target)

){

profileMenu.classList.remove("show");

}

});

}

/*=========================================
Session Manager
=========================================*/

function getCurrentUser(){

return auth.currentUser;

}

function isLoggedIn(){

return auth.currentUser !== null;

}

/*=========================================
Redirect Helpers
=========================================*/

function redirectIfLoggedIn(){

if(isLoggedIn()){

window.location.href="dashboard.html";

}

}

function redirectIfLoggedOut(){

if(!isLoggedIn()){

window.location.href="login.html";

}

}

/*=========================================
Auto Route Protection
=========================================*/

const currentPage =

window.location.pathname;

if(

currentPage.includes("dashboard")

){

requireLogin();

}

if(

currentPage.includes("login") ||

currentPage.includes("register")

){

guestOnly();

}

/*=========================================
Auth Helpers
=========================================*/

window.authHelpers={

getCurrentUser,

isLoggedIn,

requireLogin,

guestOnly,

redirectIfLoggedIn,

redirectIfLoggedOut,

checkEmailVerification

};

console.log("Auth Part 3 Loaded");
/*=========================================
Picker Shop BD
Authentication System
Part 4 (Final)
=========================================*/

import {

updateProfile,

updatePassword,

reauthenticateWithCredential,

EmailAuthProvider

} from "https://www.gstatic.com/firebasejs/11.10.0/firebase-auth.js";

/*=========================================
Loading Helper
=========================================*/

function showLoading(button){

if(!button) return;

button.disabled = true;

button.classList.add("loading");

}

function hideLoading(button){

if(!button) return;

button.disabled = false;

button.classList.remove("loading");

}

/*=========================================
Update Profile
=========================================*/

async function updateUserProfile(name){

try{

const user = auth.currentUser;

if(!user) return false;

await updateProfile(user,{

displayName:name

});

showAlert("Profile updated successfully.");

return true;

}catch(error){

console.error(error);

showAlert(error.message);

return false;

}

}

/*=========================================
Change Password
=========================================*/

async function changePassword(

currentPassword,

newPassword

){

try{

const user = auth.currentUser;

if(!user){

showAlert("Please login first.");

return false;

}

const credential =

EmailAuthProvider.credential(

user.email,

currentPassword

);

await reauthenticateWithCredential(

user,

credential

);

await updatePassword(

user,

newPassword

);

showAlert("Password updated successfully.");

return true;

}catch(error){

console.error(error);

showAlert(error.message);

return false;

}

}

/*=========================================
Global Error Handler
=========================================*/

function handleAuthError(error){

const code = error.code || "";

switch(code){

case "auth/user-not-found":

showAlert("No account found.");

break;

case "auth/wrong-password":

showAlert("Incorrect password.");

break;

case "auth/email-already-in-use":

showAlert("Email already registered.");

break;

case "auth/weak-password":

showAlert("Password must be at least 6 characters.");

break;

case "auth/invalid-email":

showAlert("Invalid email address.");

break;

case "auth/network-request-failed":

showAlert("Network error. Please check your internet.");

break;

default:

showAlert(error.message);

}

}

/*=========================================
Initialization
=========================================*/

document.addEventListener("DOMContentLoaded",()=>{

console.log("Authentication Initialized");

});

/*=========================================
Export Helpers
=========================================*/

window.authService = {

updateUserProfile,

changePassword,

getCurrentUser,

isLoggedIn,

requireLogin,

guestOnly,

redirectIfLoggedIn,

redirectIfLoggedOut,

checkEmailVerification,

showLoading,

hideLoading,

handleAuthError

};

/*=========================================
Authentication Ready
=========================================*/

console.log(

"%cPicker Shop BD Authentication Ready",

"color:#16a34a;font-size:16px;font-weight:bold;"

);

/*=========================================
End Authentication System
=========================================*/
