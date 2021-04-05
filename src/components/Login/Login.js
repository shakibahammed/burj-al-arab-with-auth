import React, { useContext } from 'react';
import firebase from "firebase/app";
import "firebase/auth";
import firebaseConfig from './firebase.config';
import { UserContext } from '../../App';
import { useHistory, useLocation } from 'react-router';


const Login = () => {
    const [loggedInUser,setLogInUser] = useContext(UserContext)
    const history = useHistory();
    const location = useLocation(); 
    const { from } = location.state || { from: { pathname: "/" } };

    if (!firebase.apps.length) {
        firebase.initializeApp(firebaseConfig);  
       }else {
        firebase.app(); 
     }
   const handleGoogleSignIn =() => {
    const googleProvider = new firebase.auth.GoogleAuthProvider();
    firebase.auth().signInWithPopup(googleProvider).then((result) => {
    const {displayName,email} = result.user;
    const signInUser ={name:displayName,email}
   setLogInUser(signInUser)
    history.replace(from)

}).catch((error) => {
    var errorCode = error.code;
    var errorMessage = error.message;
    var email = error.email;
    var credential = error.credential;

   
  });
   }

    return (

        <div>
<h3>This is loggedIn </h3>
            <button onClick={handleGoogleSignIn}>signIn google</button>
        </div>
    )
};

export default Login;