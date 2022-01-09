let arr = [ 2, 3, 4, 5,12, 3]
let arrayIndex = arr.findIndex((ele) => { 
    if ( ele === 3) { 
        return ele
    }
})
console.log(arr);
arr.splice(arrayIndex, 1)
console.log(arrayIndex);
console.log("Length : ",arr.length);
console.log(arr);