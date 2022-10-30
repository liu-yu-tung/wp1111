import axios from 'axios'
const instance = axios.create({baseURL: 'http://localhost:4000/api/guess'}); 
const startGame = async () => {
    const {data:{msg}} = await instance.post('/start')
    return msg
}
const guess = async(number) => {
    const {data:{msg}} = await instance.get('/guess', {params: {number}})
    try {
        console.log(msg)
        return msg
    }
    catch (error) {
        console.log(error.response)
        return "this is not a valid number (1 - 100)" 
    }
}   
   
const restart = 0
export {startGame, guess, restart}