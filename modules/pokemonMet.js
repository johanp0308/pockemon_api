
const peticiones = async (urlRes) => {
    let res = await (await fetch(urlRes)).json();
    return res;
}

const exitPoke = async(url,name) =>{
    let res = await peticiones(url);
    console.log(res);
    let isExist = {};
    res.forEach( ele => {
        console.log(ele.name)
        if(ele.name === name){
            isExist = {
                isExist:true,
                id:ele.id
            }
        }else{
            isExist = {
                isExist:false,
                id:0,
            }
        }
    })
    console.log(isExist);
    return isExist
}

const enviarPokemon = async (url,data) =>{
    let validation = await exitPoke(url,data.name) 
    if(!(validation.isExist)){
        let config = {
            method:"POST",
            headers:{"content-type":"application/json"},
            body:JSON.stringify(data)
            }
        let res = await (await fetch(url,config)).json();
        console.log("Has enviado: ",res);
    }else{
        let config = {
            method:"PUT",
            headers:{"content-type":"application/json"},
            body:JSON.stringify(data)
        }
        let res = await (await fetch(url+`/${validation.id}`,config)).json();
        console.log("Has enviado: ",res);
    }
}

export default{
    peticiones,
    enviarPokemon
}