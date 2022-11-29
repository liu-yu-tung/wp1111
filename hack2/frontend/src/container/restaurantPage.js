/****************************************************************************
  FileName      [ restaurantPage.js ]
  PackageName   [ src ]
  Author        [ Chin-Yi Cheng ]
  Synopsis      [ Implement the restaurant page ]
  Copyright     [ 2022 11 ]
****************************************************************************/

import React, { useState, useEffect } from 'react'
import '../css/restaurantPage.css'
import Information from './information';
import Comment from './comment';
import { useParams } from 'react-router-dom'

import axios from 'axios'
const instance = axios.create({
    baseURL: 'http://localhost:4000/api'
})

const RestaurantPage = () => {
    const { id } = useParams()
    const [info, setInfo] = useState({})
    const [commentsss, setComments] = useState([])
    const [loading, setLoading] = useState(true)
    const [keys, setKeys] = useState("")
    const getInfo = async () => {
        const msg = await (instance.get('/getInfo?id='+id))
        console.log(msg.data)
        setInfo(msg.data)
        setKeys(msg.data.tag.join(" "))
        // TODO Part III-2: get a restaurant's info
    }
    const getComments = async () => {
        const comm = await instance.get('/getCommentsByRestaurantId', {params: {restaurantId:id}})
        const msg = await (instance.get('/getCommentsByRestaurantId?restaurantId='+id))
        setComments(msg.data)
        // TODO Part III-3: get a restaurant's comments 
    }
    useEffect(() => {
        if (Object.keys(info).length === 0) {
            getInfo()
            getComments()
        }
    }, [])
    
    useEffect(() => {
            getComments()
    }, [commentsss])

    /* TODO Part III-2-b: calculate the average rating of the restaurant */
    let rating = 0;
    for (let i=0; i<commentsss.length; i++) {
        rating += commentsss[i].rating
    }
    rating /= commentsss.length

    
    return (
        <div className='restaurantPageContainer'>
            {Object.keys(info).length === 0 ? <></> : <Information info={info} rating={rating} />}
            <Comment restaurantId={id} comments={commentsss} setComments={setComments} setLoad={setLoading} />
        </div>
    )
}
export default RestaurantPage