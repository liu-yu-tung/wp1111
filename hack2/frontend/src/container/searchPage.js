/****************************************************************************
  FileName      [ searchPage.js ]
  PackageName   [ src ]
  Author        [ Chin-Yi Cheng ]
  Synopsis      [ display the search result ]
  Copyright     [ 2022 11 ]
****************************************************************************/

import React, { useState, useEffect } from 'react'
import '../css/searchPage.css'
import { useNavigate, useLocation } from 'react-router-dom'

import axios from 'axios'
const instance = axios.create({
    baseURL: 'http://localhost:4000/api'
})

const SearchPage = () => {
    const { state } = useLocation();
    const [restaurants, setRestaurant] = useState([])
    const getRestaurant = async () => {
        const res = await instance.get('/getSearch')
        setRestaurant(res)
        // TODO Part I-3-b: get information of restaurants from DB
    }

    useEffect(() => {
        getRestaurant()
    }, [state.priceFilter, state.mealFilter, state.typeFilter, state.sortBy])


    const navigate = useNavigate();
    const ToRestaurant = (id) => {
        // TODO Part III-1: navigate the user to restaurant page with the corresponding id
    }
    const getPrice = (price) => {
        let priceText = ""
        for (let i = 0; i < price; i++)
            priceText += "$"
        return (priceText)
    }

    return (

        <div className='searchPageContainer'>
            {
                restaurants.map((item) => (
                    // TODO Part I-2: search page front-end
                    <>
                    {console.log(item)}
                    <div className='resBlock' id={item} key={item}>
                        <div className='resImgContainer'>
                            <img className='resImg' >{item}</img>
                        </div>
                        <div className='resInfo'>
                            <div className='name'>{item.name}</div>
                            <div className='price'>{getPrice(item.price)}</div>
                            <div className='distance'>{item.distance / 1000 + "km"}</div>
                            <p className='description'>{item.description}</p>
                        </div>
                    </div>
                    </>
                ))
            }
        </div>
    )
}
export default SearchPage