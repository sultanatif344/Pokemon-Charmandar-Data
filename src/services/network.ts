import axios from 'axios';


 export const PokemonData = ()=>{
    return new Promise<any>((resolve,reject)=>{
        axios.get("https://pokeapi.co/api/v2/pokemon/charmander").then((res)=>{
            resolve(res.data)
        }).catch(error =>{
            reject(error.response.data.message)
        })
     }); 
 } 
 
 export const GetPokemonDescription = (url:string)=>{
    return new Promise<string>((resolve,reject)=>{
        axios.get(url).then((res)=>{
            resolve(res.data.flavor_text_entries[9].flavor_text)
        }).catch(error =>{
            reject(error.response.data.message)
        })
     })
 }

 
