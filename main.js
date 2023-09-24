import resPoke from "./modules/pokemonMet.js";
import domPoke from "./modules/domApi.js";

let url = "https://pokeapi.co/api/v2/pokemon/"
const divLista = document.querySelector("#id_pokemons");
console.log(divLista);


document.addEventListener("DOMContentLoaded",(e)=>{
    resPoke.resPokes().then(( result =>{
        result.results.forEach( element =>{
            let datos = resPoke.datosPokemon(element);
        })
    }))
})