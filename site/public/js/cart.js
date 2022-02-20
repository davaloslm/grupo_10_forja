window.addEventListener('load', () => {

    fetch("http://localhost:3000/api/cart")
    .then(response => response.json())
    .then(data =>{
            console.log(data)
            console.log("api ok")
    })
    .catch(error=>console.log(error))

})