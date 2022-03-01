import React from 'react';
import "./Subtotal.css";
import CurrencyFormat from "react-currency-format"
import { useStateValue } from './StateProvider';
import { getBasketTotal } from "./reducer"
import { useHistory } from 'react-router-dom/cjs/react-router-dom.min';

function Subtotal() {

  const history=useHistory(); // we can get the history of the browser
  const [{basket},dispatch] = useStateValue();

  return <div className='subtotal'>
      <CurrencyFormat 
        renderText={(value) => (
            <>
            <p>
                Subtotal ({basket.length} items):
                <strong>{value}</strong>
            </p>
            <small className="subtotal__gift">
                <input type="checkbox" />This order contains a gift
            </small>
            </>
        )}
        decimalScale={2} // displays number upto 2 decimal spaces
        // let cost={dispatch[1].price}
        value={getBasketTotal(basket)}  // value to the number format. can be float number or string.
        displayType={"text"} // this will display the text and not allow the user to type to it.
        thousandSeparator={true} /// a large value will have commas after each thousand place value.
        prefix={"€"} /// this will always be attached to the value
      />
      <button onClick={e => history.push('/payment')}>Proceed to Checkout</button>
  </div>;
}
/// so we are basically pushing a page into the brower history and including it in our web page . it is similar to 
// routing and we could have done it by <Link to="./payment"> but we don't want the checkout button to look like
// a link .

export default Subtotal;
