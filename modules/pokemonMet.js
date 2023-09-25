
const peticiones = async (urlRes) => {
    let res = await (await fetch(urlRes)).json();
    return res;
}

export default{
    peticiones
}