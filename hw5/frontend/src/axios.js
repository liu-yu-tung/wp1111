import axios from 'axios';
const instance = axios.create({baseURL: '...'});
const startGame = async () => {
    const {data:{msg} } = await instance.post('/start');
    return msg;
}
const guess = async(number) => {
   
   
}   
   
   
   
   
   
const restart = 0;
export {startGame, guess, restart};