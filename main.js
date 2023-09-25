import resPoke from "./modules/pokemonMet.js";
import domPoke from "./modules/domApi.js";

let urlmain = "https://pokeapi.co/api/v2/pokemon/";
let todosPokemon =[];
const divLista = document.querySelector("#id_pokemons");


const asignEvent = () =>{
    let pokemons = document.querySelectorAll(".pokemon");

    pokemons.forEach((nodeElem)=>{
        nodeElem.addEventListener("click",(event)=>{
            
        })
    })
}



document.addEventListener("DOMContentLoaded", (e) => {
    resPoke.peticiones(urlmain).then((result) => {
        // Crear un array de promesas para todas las llamadas individuales
        const promises = result.results.map((element) => {
            return resPoke.peticiones(element.url).then((result) => {
                return {
                    name: result.name,
                    img: result.sprites.front_default
                };
            });
        });

        Promise.allSettled(promises).then((pokemonData) => {
            let poke = [];
            pokemonData.forEach( prom =>{
                poke.push(prom.value);
                
            })
            todosPokemon = poke;
            todosPokemon.forEach((ele) => domPoke.agregarTarjeta(divLista,ele));
            asignEvent();
        });

    });
});
