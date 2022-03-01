import React ,{ useState }from 'react';
import { Link , useHistory } from 'react-router-dom';
import './Login.css'
import logo from './logo1.png'
import {auth} from "./firebase"


function Login() {

    const history=useHistory(); /// useHistory helps us to change the url 
    const [email,setEmail] = useState(''); // initially there is an empty state .
    const [password,setPassword] = useState('');

    // whenever a user types something in the email box then a change in the value of the button has occured
    // and then the Onchange triggers an event and what it does is that it calls the function setEmail which 
    // sets the value in the box as specified by the user and gets stored in the form of e.target.value .
    // and then it is mapped to the value parameter of the input tag and the state is updated.

    const signIn = e =>{
        e.preventDefault(); //prevents the page from reloading
        auth.signInWithEmailAndPassword(email,password).then(auth=>{ // if the email and password exist already then
            // redirect to the home page.
            history.push('/');
        }).catch(error => alert(error.message));
    }

    const register = e =>{
        e.preventDefault();
        console.log('email is ',email);
        console.log('password is',password);
        auth.createUserWithEmailAndPassword(email,password).then((auth) => {
            // it successfully created a new user with email and password.
            console.log(auth);
            if(auth){
                history.push('/'); // if the account is successfully created then redirect to the home page.
            }
        }).catch(error => alert(error.message))
        // if an error occurs then an event will be triggered and that error will be displayed in the form of an alert.
        // but if no error occurs then no such event will be triggered.
    }

    return (
        <div className='login'>
            <Link to="/">
                <img className="login__logo" src={logo}/>
            </Link>
            <div className="login__container">
                <h1>Sign-In</h1>
                <form>
                    <h5>E-mail</h5>
                    <input type='text' value={email} onChange={e => setEmail(e.target.value)}/>
                    <h5>Password</h5>
                    <input type='password' value={password} onChange={e => setPassword(e.target.value)}/>
                    <button type='submit' onClick={signIn} className='login__signInButton'>SignIn</button>
                </form>
                <p>
                    By signing-in you agree to amazon's condition of use and sales. please see our private Notice , our Cookies Notice and our Interest -Based Ads.
                </p>
                <button onClick={register} className='login__registerButton'>Create your amazon account</button>
            </div>
        </div>
    )
}

export default Login;
