export const getCartSum = (cartData)=>{
    let sum = 0;
    cartData.forEach((val) => sum += val.quantity * val.price)
    return sum;
}