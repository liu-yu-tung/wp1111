/****************************************************************************
  FileName      [ information.js ]
  PackageName   [ src ]
  Author        [ Chin-Yi Cheng ]
  Synopsis      [ display the information of restaurant ]
  Copyright     [ 2022 11 ]
****************************************************************************/

import React from 'react'
import Stars from '../components/stars';
import '../css/restaurantPage.css'

const Information = ({ info, rating }) => {

    const getTag = (tags) => {
        console.log(tags)
        return (
                tags.map((i) => (
                   <div className='tag' key={i}>{i}</div>
                ))
        )
    }
    const getPriceTag = (price) => {
        let priceText = ""
        for (let i = 0; i < price; i++)
            priceText += "$"
        return (
            <>
            <div className='tag' key={priceText}>{priceText}</div>
                {/* TODO Part III-2-a render price tags; hint: convert price number to dollar signs first */}
            </>
        )
    }

    const getBusiness = (time) => {
        console.log(time)
        return (
                <div className='businessTime'>
                    <div className='day'>Mon</div>
                    if (time.Mon) return <div className='time'>{time.Mon}</div>
                    else return <div className='time'>Closed</div>
                    <div className='day'>Tue</div>
                    if (time.Tue) return <div className='time'>{time.Tue}</div>
                    else return <div className='time'>Closed</div>
                    <div className='day'>Wed</div>
                    if (time.Wed) return <div className='time'>{time.Wed}</div>
                    else return <div className='time'>Closed</div>
                    <div className='day'>Thr</div>
                    if (time.Thr) return <div className='time'>{time.Thr}</div>
                    else return <div className='time'>Closed</div>
                    <div className='day'>Fri</div>
                    if (time.Fri) return <div className='time'>{time.Fri}</div>
                    else return <div className='time'>Closed</div>
                    <div className='day'>Sat</div>
                    if (time.Sat) return <div className='time'>{time.Sat}</div>
                    else return <div className='time'>Closed</div>
                    <div className='day'>Sun</div>
                    if (time.Sun) return <div className='time'>{time.Sun}</div>
                    else return <div className='time'>Closed</div>
                    {/* TODO Part III-2-c: render business time for each day*/}
                </div>
        )
    }

    return (
        <div className='infoContainer'>
            <h2>{info.name}</h2>
            <div className='infoRow'>
                <div className='rate'>
                    {rating === 0 ? <p>No Rating</p> : <Stars rating={rating} displayScore={true} />}

                </div>
                <div className='distance'>{info.distance / 1000} km</div>
            </div>
            <div className='infoRow'>
                {getPriceTag(info.price)}
                {getTag(info.tag)}
            </div>
            <h5>Business hours:</h5>
            {getBusiness(info.time)}
        </div>
    )
}
export default Information