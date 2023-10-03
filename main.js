import resPoke from "./modules/pokemonMet.js";
import domPoke from "./modules/domApi.js";

const d = document
const Q = (e) => d.querySelector(e);
const Qa = (e) => d.querySelectorAll(e)
var urlmain = "https://pokeapi.co/api/v2/pokemon/";
var urlPoke = "https://pokeapi.co/api/v2/pokemon/";
var urlMockAPI = "http://127.0.0.10:5010/pokemones"
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
        // Boton para Cambiar a la pagina Anterior
        if(e.target.matches("#btn-previous i")){
            resPoke.peticiones(urlmain).then(result=>{
                urlmain = result.previous;
                init(urlmain);
            })
        }
        // Boton para Cambiar a la siguiente pagina
        if(e.target.matches("#btn-next i")){
            resPoke.peticiones(urlmain).then(result=>{
                console.log(result);
                urlmain = result.next;
                init(urlmain);
            })
        }
        // Evento para Lanzar el SweetAlert 
        if(e.target.matches(".pokemon img, .pokemon p")){
            
            let id = e.target.parentElement.id;
            
            let resMock = resPoke.exitPoke(urlMockAPI,id);
            console.log(resMock)
            let res = resPoke.peticiones(urlPoke+id);
            res.then( async (result) => {
                console.log(result);
                let img = result.sprites.front_default;
                let imgDefautl = "https://images-wixmp-ed30a86b8c4ca887773594c2.wixmp.com/f/029b8bd9-cb5a-41e4-9c7e-ee516face9bb/dayo3ow-7ac86c31-8b2b-4810-89f2-e6134caf1f2d.gif?token=eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJ1cm46YXBwOjdlMGQxODg5ODIyNjQzNzNhNWYwZDQxNWVhMGQyNmUwIiwiaXNzIjoidXJuOmFwcDo3ZTBkMTg4OTgyMjY0MzczYTVmMGQ0MTVlYTBkMjZlMCIsIm9iaiI6W1t7InBhdGgiOiJcL2ZcLzAyOWI4YmQ5LWNiNWEtNDFlNC05YzdlLWVlNTE2ZmFjZTliYlwvZGF5bzNvdy03YWM4NmMzMS04YjJiLTQ4MTAtODlmMi1lNjEzNGNhZjFmMmQuZ2lmIn1dXSwiYXVkIjpbInVybjpzZXJ2aWNlOmZpbGUuZG93bmxvYWQiXX0.ooubhxjHp9PIMhVxvCFHziI6pxDAS8glXPWenUeomWs"
                if(!(await resMock).isExist === true) {
                    Swal.fire({
                        title: domPoke.captfirts(result.name),
                        imageUrl: img ? img : imgDefautl,
                        imageWidth: "200px",
                        imageHeight: "auto",
                        imageAlt: 'Custom image',
                        html: `
                        <form id="form-mockapi" class="${result.name}">
                        ${result.stats.map(stat => `
                            <div>
                                <input type="range" name="${stat.stat.name}" id="" value="${stat.base_stat}" max="200" min="0">
                                <span class="stats-poke" id="${stat.stat.name}"> <b class="stat-number">${stat.base_stat}</b> ${domPoke.captfirts(stat.stat.name)}</span>
                            </div>
                        `).join("")}
                            <input type="submit" value="Aplicar">
                        </form>
                        `,
                    });
                }else{
                    let data = await (await fetch(urlMockAPI+"/"+(await resMock).id)).json();
                    // let arr  = Object.keys(data.stats);
                    // console.log(arr);
                    Swal.fire({
                        title: domPoke.captfirts(data.name),
                        imageUrl: img ? img : imgDefautl,
                        imageWidth: "200px",
                        imageHeight: "auto",
                        imageAlt: 'Custom image',
                        html: `
                        <form id="form-mockapi" class="${data.name}">
                        ${Object.keys(data.stats).map((stat) => 
                            `
                            <div>
                                <input type="range" name="${stat}" id="" value="${data.stats[stat]}" max="200" min="0">
                                <span class="stats-poke" id="${stat}"> <b class="stat-number">${data.stats[stat]}</b> ${domPoke.captfirts(stat)}</span>
                            </div>
                        `).join("")}
                            <input type="submit" value="Aplicar">
                        </form>
                        `,
                    });
                }
            })


        }
        // Evento especifico para los Inputs Ranges
        if(e.target.matches("form#form-mockapi input")){
            let parent = e.target.parentElement
            let idstat = parent.querySelector("span.stats-poke").id
            let boldEle = parent.querySelector(".stat-number");
            boldEle.innerHTML = `${parent.querySelector("input").value}`
        }
    }catch{

    }
})

document.addEventListener("submit",(e)=>{
    if(e.target.matches("#form-mockapi")){
        e.preventDefault();
        let poke = e.target.classList[0];
        let dataForm = Object.fromEntries(new FormData(e.target));
        let data = {
            name: poke,
            stats:dataForm
        }
	resPoke.enviarPokemon(urlMockAPI,data);
    }
});
