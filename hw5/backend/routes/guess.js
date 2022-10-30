import express from 'express'
import {ans} from '../core/getNumber'

const router = express.Router()
router.post('./start', (_, res) => {
    genNumer()
    res.json({msg: 'The game has started.'})
})
router.get('/guess', (req, res) => {

    console.log(ans);
    console.log(req.query.number);
    const user_input = req.query.number;
    if (user_input > 100 || user_input < 1) {
        console.log("nope")
        res.status(406).send({ msg: 'Not a legal number.' })
    }
    else {
        if (ans == user_input) {
            console.log("same")
            res.status(200).send({ msg: 'Equal' })
        }
        else if (ans > user_input) {
            console.log("bigger")
            res.status(200).send({ msg: 'Bigger' })
        }
        else {
            console.log("smaller")
            res.status(200).send({ msg: 'Smaller' })
        }
    }
    // 去 (memory) DB 拿答案的數字
    // ⽤ req.query.number 拿到前端輸入的數字
    // check if NOT a num or not in range [1,100]
    // 如果有問題 => 
    // res.status(406).send({ msg: 'Not a legal number.' })
    // 如果沒有問題，回傳 status
})             
router.post('/restart', (_, res) => {})
export default router