 function createButton(item){
  const makeEven = item + 1;
   for(let i = 0; i <= makeEven; i++){
     if(item % 2 !== 0){
      pagination.innerHTML += `<button>${i}</button>`
     }else{
      pagination.innerHTML += `<button>${i}</button>`
     }
   }
}