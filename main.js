import resPoke from "./modules/pokemonMet.js";
import domPoke from "./modules/domApi.js";

let urlmain = "https://pokeapi.co/api/v2/pokemon/"
const divLista = document.querySelector("#id_pokemons");



document.addEventListener("DOMContentLoaded",(e)=>{
    resPoke.peticiones(urlmain).then(( result =>{
        result.results.forEach( element =>{
            let res = resPoke.peticiones(element.url);
            let data;
            res.then(result =>{
                data = {
                    name: result.name,
                    img: result.sprites.front_default
                }
                domPoke.agregarTarjeta(divLista,data);
            });
        })
    }))
})