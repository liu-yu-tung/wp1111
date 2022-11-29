// * ////////////////////////////////////////////////////////////////////////
// *
// * FileName     [ comment.js ]
// * PackageName  [ server ]
// * Synopsis     [ Apis of comment ]
// * Author       [ Chin-Yi Cheng ]
// * Copyright    [ 2022 11 ]
// *
// * ////////////////////////////////////////////////////////////////////////

import Comment from '../models/comment'

exports.GetCommentsByRestaurantId = async (req, res) => {
    /*******    NOTE: DO NOT MODIFY   *******/
    const id = req.query.restaurantId
    /****************************************/
    // TODO Part III-3-a: find all comments to a restaurant

    // NOTE USE THE FOLLOWING FORMAT. Send type should be 
    // if success:
    // {
    //    message: 'success'
    //    contents: the data to be sent
    // }
    // else:
    // {
    //    message: 'error'
    //    contents: []
    // }
    console.log("GetCommentsByRestaurantId called")
    console.log(id)
    const msg = await Comment.find({"restaurantId":id}).exec((err,data) => {
        if (!err) {
            res.status(200).send(data)
        }
        else {
            res.status(403).send('')
        }
    })
}

exports.CreateComment = async (req, res) => {
    /*******    NOTE: DO NOT MODIFY   *******/
    const body = req.body
    /****************************************/
    const restaurantId = req.body.restaurantId
    console.log(body)
    const {name, rating, content} = body
    const newC = new Comment({restaurantId: restaurantId, name: name, rating: rating, content: content})
    res.status(200).send({message: "yes"})
    return newC.save()

    // TODO Part III-3-b: create a new comment to a restaurant
}
