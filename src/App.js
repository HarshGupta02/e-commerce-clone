import "./App.css";
import Header from "./Header";
import Home from "./Home";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Checkout from './Checkout'
import Login from "./Login"
import { useEffect } from "react";
import { auth } from "./firebase";
import { useStateValue } from "./StateProvider";
import Payment from "./Payment";
import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";
import Orders from "./Orders";

// stripe is used for payment related stuff like enter card number div etc. 

const promise = loadStripe('pk_test_51KR8R1SIj9g28rKLoublcGWKYTSVVnGEqAPy2HorkcYA3er9HabaZSBZs2yV37nakwLfv7NtnOjAyETW3yOVD8iN00Wtujn5Wj')

function App() {

  const [{},dispatch] =useStateValue();

  useEffect(() => {
    auth.onAuthStateChanged(authuser => { /// if a user is logged in or logged out of the page then the state of the
      // auth got changed and useEffect runs just a single time , whenever the app component loads so as to include
      // fresh changes.
      console.log('the user is ',authuser);
      if(authuser){
        // the user just logged in then push the user in the data layer and when logged out, push the user out of
        // the data layer and user logged in changed the state of the auth.
        dispatch({
          type:'SET_USER',
          user:authuser
        })
      }else{   //// the user logged out so set user = null and leaving the database changed the state of the auth.
        dispatch({
          type:'SET_USER',
          user: null
        })
      }
    })
  }, [])


  return (
    <Router>
      <div className="app">
        <Switch>
          <Route path="/orders">
            <Header/>
            <Orders />
          </Route>
          <Route path="/login">
            <Login />
          </Route>
          <Route path="/checkout">
            <Header/>
            <Checkout />
          </Route>
          <Route path="/payment">
            <Header/>
            <Elements stripe={promise}>  
              <Payment />
            </Elements>            
          </Route>
          <Route path="/">
            <Header/>
            <Home />
          </Route>
        </Switch>
      </div>
    </Router>
  );
}

export default App;
