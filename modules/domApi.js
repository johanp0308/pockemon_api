// import pokemonMet from "./pokemonMet";

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
    let next = res.next;
    let previous = res.previous;
    contain.innerHTML = ""
    contain.insertAdjacentHTML("beforeend",`
    ${previous ? "<div class='btn-previous' id='btn-previous'><i class='bx bx-skip-previous-circle btn-previous' ></i></div>": ""}
    ${next ? "<div class='btn-next' id='btn-next'><i class='bx bx-skip-next-circle btn-next'></i></div>" : ""} 
    `)

}



export default{
    agregarTarjeta,
    captfirts,
    agregarBotones,
}