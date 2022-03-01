import React, { useEffect } from 'react'
import CheckoutProduct from './CheckoutProduct';
import './Payment.css'
import { useStateValue } from './StateProvider'
import {Link ,useHistory } from "react-router-dom";
import { CardElement, Elements, useElements, useStripe } from '@stripe/react-stripe-js';
import { useState } from 'react';
import CurrencyFormat from 'react-currency-format';
import { getBasketTotal } from './reducer';
import axios from './axios';
import { db } from './firebase';
import { BiotechSharp } from '@mui/icons-material';

function Payment() {
  
  const [{basket,user},dispatch] = useStateValue();

  const stripe = useStripe();
  const elements = useElements();
  const history = useHistory();

  const [succeeded,setSuceeded] = useState(false);
  const [processing,setProcessing] = useState("");
  const [error,setError] = useState(null);
  const [disabled,setDisabled] = useState(true); // initially the button will be disabled but as soon as we enter
  // some card details, it becomes enabled.
  const [clientSecret,setClientSecret] = useState(true);

  // so whenever basket changes , request stripe for special stripe client secret which allows us to charge a 
  // customer.

  useEffect(() => { // this will run each time the payment component is loaded into the web page.
    // await means waiting for a response.axios helps to interact with api effectively.
      const getClientSecret = async () => {
          const response = await axios({
              method:'post',
              url:`/payments/create?total=${getBasketTotal(basket)*100}` // stripe expects us to give the total amounts in cents so the actual value converted
              // from dollar to cents. this url is basically an api call.
              // with every different total , we get a different client secret from  stripe and here we are requesting
              // stripe to provide with the client secret.
          });
          setClientSecret(response.data.clientSecret);
      }
      getClientSecret();
  },[basket]) /// so each time the basket is changed , a new client secret will be generated.

  console.log('THE SECRET IS >>>',clientSecret);

  const handleSubmit = async (event) => {
      event.preventDefault();
      setProcessing(true); /// as soon as we click on the submit button once, the processing of the payment will
      // start and the submit button will be blocked at that instance so that multiple transactions do not occur 
      // simultaneously.

      const payload = await stripe.confirmCardPayment(clientSecret,{ // here we confirm whether our payment was done or not.
          // stripe has all the info regarding this payment from the client secret.
          payment_method:{ // we are paying via card
              card: elements.getElement(CardElement) // so we find the card element with this code.
          }
      }).then(({ paymentIntent }) => { // payment intent = payment conformation 
          // so if the payment was successful , then set successed is true and since no error comes so set seterror
          // to false and now since everything has been processed then setprocessing =false.
          // payment intent contains all the information regarding the payemnt like when did the payment happen,
          // who did it, how much amount was processed etc.

          // so now we are updating the database by the orders placed by a user.
          // so we go to database and then go to the collections of all the users and then filter the user 
          // by the user who placed the order and then go to the collection of all the orders placed by that 
          // specific user and then filter the order by the latest placed order.

          console.log("successful");

          db.collection('users').doc(user?.uid).collection('orders').doc(paymentIntent.id).set({
              basket: basket,
              amount: paymentIntent.amount,
              created: paymentIntent.created
          })
          
          console.log("again successful");
        
          setSuceeded(true);
          setError(null);
          setProcessing(false);

          dispatch({ /// as the payment is completed all the items have been processed as now the basket becomes
            // empty and this action has to be dispatched to the data layer (using redux) so that all components
            // come to know that the basket has become empty.
              type: 'EMPTY_BASKET'
          })

          history.replace('/orders') // we will redirect the user to the orders page after the payment is 
          // successful.
      })
  }

  const handleChange = event => {
      // so whenever the user makes any changes to the card element , so listen to the changes and display
      // any errors as the customer types their card details
      setDisabled(event.empty); // so if no changes occured in the card button then disable the button.
      setError(event.error ? event.error.message : ""); // if any error occurs then display the error message 
  }
 
  return (
    <div className='payment'>
        <div className='payment__container'>

            <h1>
                Checkout (<Link to='/checkout'>{basket?.length}</Link>)
            </h1>

            <div className='payment__section'>
                <div className='payment__title'>
                    <h3>Delivery Address</h3>
                </div>
                <div className='payment__address'>
                    <p>{user?.email}</p>
                    <p>123 React Lane</p>
                    <p>Los Angeles,CA</p>
                </div>
            </div>

            <div className='payment__section'>
                <div className='payment__title'>
                    <h3>Review items and delivery</h3>
                </div>
                <div className='payment__items'>
                    {basket.map(item => (
                        <CheckoutProduct 
                            id={item.id}
                            title={item.title}
                            image={item.image}
                            price={item.price}
                            rating={item.rating}
                        />
                    ))}
                </div>
            </div>

            <div className='payment__section'>
                <div className='payment__title'>
                    <h3>Payment Method</h3>
                </div>
                <div className='payment__details'>
                    <form onSubmit={handleSubmit}>
                        <CardElement onChange={handleChange}/>
                        <div className='payment_priceContainer'>
                            <CurrencyFormat 
                                renderText={(value) => (
                                    <h3>Order Total: {value}</h3>
                                )}
                                decimalScale={2}
                                value={getBasketTotal(basket)}
                                displayType={"text"}
                                thousandSeparator={true}
                                prefix={"$"}
                            />
                            <button disabled={processing || disabled || succeeded}>
                                <span>{processing ? <p>Processing</p> : "Buy Now"}</span>
                            </button>
                        </div>
                        {error && <div>{error}</div>}
                    </form>
                </div>
            </div>

        </div>
    </div>
  )
}

export default Payment