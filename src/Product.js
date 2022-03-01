import React from 'react';
import './Product.css';
import {useStateValue} from "./StateProvider";

function Product({id,title,price,image,rating}) {

    const [{basket},dispatch] =useStateValue();

    // console.log("this is the basket >>>>> ",basket);

    const addToBasket = () =>{
        // dispatch the item to the data layer
        /// dispatch is an object which consist of type of the action to be performed and each object has 
        // all the details of the item including the components of the product.
        dispatch({
            type:"ADD_TO_BASKET",
            item:{
                id:id,
                title:title,
                image:image,
                price:price,
                rating:rating,
            },
        });
    };

    return (
        <div className='product'>
            <div className='product__info'>
                <p>{title}</p>
                <p className='product__price'>
                    <small>$</small>
                    <strong>{price}</strong>
                </p>
                <div className='product__rating'>
                    {Array(rating).fill().map((_,i) => (
                        <p>⭐</p>
                    ))}
                </div>
            </div>
            <img className="home__image" src={image}/>
            <button onClick={addToBasket}>Add To Basket</button>
        </div>
    )
}

export default Product
