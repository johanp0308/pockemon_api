import resPoke from "./modules/pokemonMet.js";
import domPoke from "./modules/domApi.js";

const d = document
const Q = (e) => d.querySelector(e);
const Qa = (e) => d.querySelectorAll(e)
var urlmain = "https://pokeapi.co/api/v2/pokemon/";
var urlPoke = "https://pokeapi.co/api/v2/pokemon/";
let todosPokemon =[];



const divLista = Q("#id_pokemons");
const btonsPag = Q(".buttons");

const init =(url) =>{
    divLista.innerHTML = ""
    resPoke.peticiones(urlmain).then((result) => {
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
        });
        domPoke.agregarBotones(btonsPag,result)
    });
}

document.addEventListener("DOMContentLoaded", (e) => {
    init(urlmain);
});

document.addEventListener("click",(e)=>{
    try{
        console.log(e.target);
        if(e.target.matches("#btn-previous i")){
            resPoke.peticiones(urlmain).then(result=>{
                console.log(result);
                urlmain = result.previous;
                init(urlmain);
            })
        }

        if(e.target.matches("#btn-next i")){
            resPoke.peticiones(urlmain).then(result=>{
                console.log(result);
                urlmain = result.next;
                init(urlmain);
            })
        }
        if(e.target.matches(".pokemon img, .pokemon p")){
            let id = e.target.parentElement.id;
            let res = resPoke.peticiones(urlPoke+id);
            console.log(urlPoke+id)
            res.then(result => {
                console.log(result)
                let img = result.sprites.front_default;
                    let imgDefautl = "https://images-wixmp-ed30a86b8c4ca887773594c2.wixmp.com/f/029b8bd9-cb5a-41e4-9c7e-ee516face9bb/dayo3ow-7ac86c31-8b2b-4810-89f2-e6134caf1f2d.gif?token=eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJ1cm46YXBwOjdlMGQxODg5ODIyNjQzNzNhNWYwZDQxNWVhMGQyNmUwIiwiaXNzIjoidXJuOmFwcDo3ZTBkMTg4OTgyMjY0MzczYTVmMGQ0MTVlYTBkMjZlMCIsIm9iaiI6W1t7InBhdGgiOiJcL2ZcLzAyOWI4YmQ5LWNiNWEtNDFlNC05YzdlLWVlNTE2ZmFjZTliYlwvZGF5bzNvdy03YWM4NmMzMS04YjJiLTQ4MTAtODlmMi1lNjEzNGNhZjFmMmQuZ2lmIn1dXSwiYXVkIjpbInVybjpzZXJ2aWNlOmZpbGUuZG93bmxvYWQiXX0.ooubhxjHp9PIMhVxvCFHziI6pxDAS8glXPWenUeomWs"
                    Swal.fire({
                        title: domPoke.captfirts(result.name),
                        imageUrl: img ? img : imgDefautl,
                        imageWidth: "200px",
                        imageHeight: "auto",
                        imageAlt: 'Custom image',
                        html: result.stats.map(stat => `
                        <div class="progress" role="progressbar" aria-label="Basic example" aria-valuenow="100" aria-valuemin="0" aria-valuemax="100">
                            <div class="progress-bar" style="width: ${stat.base_stat}%"></div>
                        </div>
                        <p class="stats-poke" id="${stat.stat.name}">${domPoke.captfirts(stat.stat.name)}</p>
                        `).join(""),
                    });
            })
        }
    }catch{

    }
})


