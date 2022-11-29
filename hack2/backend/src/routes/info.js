// * ////////////////////////////////////////////////////////////////////////
// *
// * FileName     [ info.js ]
// * PackageName  [ server ]
// * Synopsis     [ Get restaurant info from database ]
// * Author       [ Chin-Yi Cheng ]
// * Copyright    [ 2022 11 ]
// *
// * ////////////////////////////////////////////////////////////////////////

import mongoose from 'mongoose'
import Info from '../models/info'

exports.GetSearch = async (req, res) => {
    /*******    NOTE: DO NOT MODIFY   *******/
    const priceFilter = req.query.priceFilter
    const mealFilter  = req.query.mealFilter
    const typeFilter  = req.query.typeFilter
    const sortBy      = req.query.sortBy
    /****************************************/

    

    console.log("getSearch called")
    //console.log("price filter: " + priceFilter)
    //console.log("meal filter: " + mealFilter)
    //console.log("type filter: " + typeFilter)
    try {
        //console.log(sortBy)
        let Find = false
        if (sortBy === 'price') {
            Find = await Info.find({})
            Find.sort((a, b) => a.price.toString()-b.price.toString())
        }
        else if (sortBy === 'distance') {
            Find = await Info.find({})
            Find.sort((a, b) => a.distance-b.distance)
        }
        if (priceFilter !== undefined) {
            let priceFilterInterger = []
            for (let i=0; i<priceFilter.length; i++) {
                priceFilterInterger.push(priceFilter[i].length)
            }
            console.log(priceFilterInterger)
            console.log("price condition: " )
            Find = Find.filter((item) => {
                if (priceFilterInterger.includes(item.price)) {
                    return item 
                }
            })
        }
        if (mealFilter !== undefined){
            console.log("meal condition: ")
        }
        if (typeFilter !== undefined){
            console.log("type condition " )
        }
        res.status(200).send({ message: 'success', contents: Find })
    }
    catch(e) {
        res.status(403).send({message: 'error', contents:"..."})
    }
    // NOTE Hint: 
    // use `db.collection.find({condition}).exec(err, data) {...}`
    // When success, 
    //   do `res.status(200).send({ message: 'success', contents: ... })`
    // When fail,
    //   do `res.status(403).send({ message: 'error', contents: ... })` 
    

    // TODO Part I-3-a: find the information to all restaurants


    
    // TODO Part II-2-a: revise the route so that the result is filtered with priceFilter, mealFilter and typeFilter
    // TODO Part II-2-b: revise the route so that the result is sorted by sortBy
}

exports.GetInfo = async (req, res) => {
    /*******    NOTE: DO NOT MODIFY   *******/
    const id = req.query.id
    /****************************************/

    // NOTE USE THE FOLLOWING FORMAT. Send type should be 
    // if success:
    // {
    //    message: 'success'
    //    contents: the data to be sent. Hint: A dictionary of the restaruant's information.
    // }
    // else:
    // {
    //    message: 'error'
    //    contents: []
    // }

    // TODO Part III-2: find the information to the restaurant with the id that the user requests
}