import React from 'react'
import './Home.css'
import Product from './Product'
import img1 from './Book1.jpg'
import img2 from './Book2.jpg'
import img3 from './Book3.jpg'
import img4 from './Book4.jpg'
import img5 from './Book5.jpg'
import img6 from './Big.jpg'

function Home() {
    return (
        <div className='home'>
            {/* for the banner */}
            <div className="home__container">
                <img className="home__image" src={ require('./AmazonUs.jpg') } />
            </div>
            
            <div className='home__row'>
                <Product  id='123456' title='The Creative Idea' price={29.99} image={img1} rating={3}/>
                <Product id='123457' title='The Dreaming Arts' price={15} image={img2} rating={2}/>
            </div>

            <div className='home__row'>
                <Product id='123458' title='Amara The Brave' price={50} image={img3} rating={1}/>
                <Product id='123459' title='Clap When You Land' price={34.7} image={img4} rating={5}/>
                <Product id='123460' title='The Hobbit' price={12} image={img5} rating={5}/>
            </div>

            <div className='home__row'>
                <Product id='123461' title='The Collection' price={150} image={img6} rating={5} />
            </div>

        </div>
    )
}

export default Home
