import React, {useState} from "react";
import "./Header.css";
import SearchIcon from "@mui/icons-material/Search";
import LocationOnIcon from '@mui/icons-material/LocationOn';
import ShoppingBasketIcon from '@mui/icons-material/ShoppingBasket';
import {Link} from "react-router-dom";
import { useStateValue } from './StateProvider';
import { auth } from "./firebase";

function Header() {

  const [{basket,user},dispatch] = useStateValue(); // now we have the current state of the basket and the item (which is dispatch here) which has to be inserted.

  const handleAuthentication = () => {
    if(user){ /// so if the user is already logged in and i click that div so i have to sign out and set user=null and
      // now if the site loads then using useeffect the user is set to null and in the div we see sign in and and on
      // clicking sign in we are redirected to the sign in page to either sign in or create a new account/
      auth.signOut();
    }
  }


  return (
    // amazon logo
    <div className="header">
      <Link to="/">
        <img className="header_logo" src={ require('./final.png') } />
      </Link>
      <div className="header_option">
          <span className="header_optionLineOne" id="header_deliver">Deliver To</span>
          <div className="header_showAddress">
            <LocationOnIcon className="header_LocationOnIcon"/>
            <span className="header_optionLineTwo">Ghaziabad 201017</span>
          </div>
      </div>
      <div className="header_search">
        <input className="header_search_Input" input="text" />
        <SearchIcon className="header_searchIcon" />
      </div>
      <div className="header_nav">
        <Link to={user ? "/" : "/login"}>
          <div className="header_option" onClick={handleAuthentication}>
            <span className="header_optionLineOne">Hello {user ? user.email : 'Guest'}</span>
            <span className="header_optionLineTwo">{user ? 'Sign Out' : 'Sign In'}</span>
          </div>
        </Link>
        <div className="header_option">
          <span className="header_optionLineOne">Returns</span>
          <span className="header_optionLineTwo">& Orders</span>
        </div>
        <div className="header_option">
          <span className="header_optionLineOne">Your</span>
          <span className="header_optionLineTwo">Prime</span>
        </div>
        <Link to="/checkout">
          <div className="header_option_basket">
              <ShoppingBasketIcon className="header_ShoppingBasketIcon"/>
              <span className="header_optionLineTwo header_basket_count">{basket?.length}</span>
          </div>
        </Link>
      </div>
    </div>
  );
}

export default Header;
