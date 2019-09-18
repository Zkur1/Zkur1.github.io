// Listens for auth status changes.
auth.onAuthStateChanged(user => {
    // If user is logged in. 
    if(user){
        console.log("User signed in: ", user.email);
    }

    else{
        console.log("User logged out. ")
        if(sPage.trim() != "lockscreen.html"){
            window.open('/tar/Fagraf/vefsida/lockscreen/lockscreen.html','_self');
        }
    }
});


// User signup.
function createUser(email, password){
    auth.createUserWithEmailAndPassword(email, password).then(cred =>{
        console.log(cred.user);
    });
}


// User login. 
function loginUser(email, password){
    auth.signInWithEmailAndPassword(email, password).then(cred =>{
    });
}


// User logout.
function logoutUser(){
    auth.signOut().then(()=> {
    });
}