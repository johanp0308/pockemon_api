
const captfirts = (str) => {
    return str.charAt(0).toUpperCase() + str.slice(1);
}

const agregarTarjeta = (contain,data) =>{
    contain.insertAdjacentHTML("beforeend",`
    <div class="pokemon">
        <img src="${data.img}" alt="">
        <p id="${data.name}">${captfirts(data.name)}</p>
    </div>
    `);

}


export default{
    agregarTarjeta
}