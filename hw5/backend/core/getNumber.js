//const ans = Math.floor(Math.random()*100) + 1
//export {ans}

let ans = 0
const genNumber = () => {
    ans = Math.floor(Math.random()*100 +1)
}
const getNumber = () => {
    return ans;
}
export {genNumber, getNumber}