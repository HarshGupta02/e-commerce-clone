import React from 'react';
import "./Checkout.css"
import Subtotal from './Subtotal';
import { useStateValue } from './StateProvider'
import CheckoutProduct from './CheckoutProduct';

function Checkout() {

  const [{ basket, user },dispatch] = useStateValue();

  return ( // why used user.email ??
    <div className="checkout">
        <div className="checkout__left">
          <div className="checkout_left_inner"> 
            <h3>Hello , {user?.email}</h3>
            <h2 className="checkout__title">
              Your Shopping Basket
            </h2>
            
            {basket.map(item => (
              // <div className='CheckoutProd'>
                <CheckoutProduct 
                  id={item.id} // these values will be added as the props for checkoutproduct.js
                  image={item.image}
                  title={item.title}
                  price={item.price}
                  rating={item.rating}
                />
              // </div>
            ))}

          </div>
        </div>

        <div className="checkout__right">
          <Subtotal />
        </div>
    </div>
  );
}

export default Checkout;
