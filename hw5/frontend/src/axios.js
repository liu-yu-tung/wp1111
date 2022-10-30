import axios from 'axios';
const instance = axios.create({baseURL: 'http://localhost:4000/api/guess'}); 
const startGame = async () => {
    const {data:{msg} } = await instance.post('/start');
    return msg;
}
const guess = async(number) => {
    try {
    
        return msg
    }
    catch (error) {

    }
   
}   
   
const restart = 0;
export {startGame, guess, restart};