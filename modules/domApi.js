
const captfirts = (str) => {
    return str.charAt(0).toUpperCase() + str.slice(1);
}

const agregarTarjeta = (contain,data) =>{
    contain.insertAdjacentHTML("beforeend",`
    <div id="${data.name}" class="pokemon">
        <img src="${data.img}" alt="">
        <p class="pokeID">${captfirts(data.name)}</p>
    </div>
    `);

}


const agregarBotones = (contain,res) =>{
    console.log(res)
    
    contain.insertAdjacentHTML("beforeend",)

    contain.addEventListener("click",)
}


export default{
    agregarTarjeta,
    captfirts,
    agregarBotones
}