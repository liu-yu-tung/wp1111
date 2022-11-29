/****************************************************************************
  FileName      [ comment.js ]
  PackageName   [ src ]
  Author        [ Chin-Yi Cheng ]
  Synopsis      [  ]
  Copyright     [ 2022 11 ]
****************************************************************************/

import React from 'react'
import '../css/restaurantPage.css'
import ReactStars from "react-rating-stars-component";
import { useState, useEffect } from "react";
import Stars from '../components/stars';
import axios from 'axios'

const instance = axios.create({
    baseURL: 'http://localhost:4000/api'
})

const Comment = ({ restaurantId, comments, setComments, setLoad }) => {
    const [rating, setRating] = useState(0)
    const [name, setName] = useState('')
    const [content, setContent] = useState('')

    const changeRating = (newRating) => {
        setRating(newRating)
    };


    const storeComment = async () => {
        await instance.post('createComment/', {
            // TODO Part III-3-b: store the comment to the DB
            params: {name: name, rating: rating, content: content, restaurantId: restaurantId}
        })
    }

    const submitComment = () => {
        if (name !== '') {
            if (rating !== 0) {
                if (content !== '') {
                storeComment()
                setName('')
                setRating(0)
                setContent('')
                }
            }
        }
        // TODO Part III-3-b: submit a comment and reset input fields
    }
    return (
        <div className='commentContainer'>
            <div className='inputContainer'>
                <div className='title'>
                    <div className='fields'>
                        <input className='name' placeholder='Name' onChange={e => setName(e.target.value)} value={name} />
                        <ReactStars
                            key={`stars_${rating}`}
                            count={5}
                            onChange={changeRating}
                            size={18}
                            activeColor="#ffd700"
                        />
                    </div>
                    <div className='submit'>
                        <button onClick={submitComment}>Submit</button>
                    </div>
                </div>
                <textarea className='content' placeholder='Type your comment' onChange={e => setContent(e.target.value)} value={content} />
            </div>

            <div className='commentss'>
                {
                    comments.map((c) => (
                        <div className='comment' key={c.name}>
                            <div className='title'>
                                <div className='info'>
                                    <p className='name'> {c.name} </p>
                                    <Stars rating={c.rating} displayScore={false} />
                                </div>
                            </div>
                            <p className='content'> {c.content}</p>
                        </div>
                    ))
                }

            </div>
        </div>
    )
}
export default Comment