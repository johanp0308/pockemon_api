

const resPokes = async (url) => {
    let request =await (await fetch(url)).json();
    return request;
}

const peticiones = async (urlRes) => {
    let res = await (await fetch(urlRes)).json();
    return res;
}


const datosPokemon = (object)=> {
    let nombre = object.name;
    let urlPoke = object.url;
    
    let resDatos = peticiones(urlPoke);
}


export default{
    resPokes,
    datosPokemon
}