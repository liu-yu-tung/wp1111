import express from 'express'

const router = express.Router()
router.post('./start', (_, res) => {
    genNumer()
    res.json({msg: 'The game has started.'})
})
router.get('/guess', (req, res) => {
    // 去 (memory) DB 拿答案的數字
    // ⽤ req.query.number 拿到前端輸入的數字
    // check if NOT a num or not in range [1,100]
    // 如果有問題 => 
    // res.status(406).send({ msg: 'Not a legal number.' })
    // 如果沒有問題，回傳 statu
})             
router.post('/restart', (_, res) => {})
export default router