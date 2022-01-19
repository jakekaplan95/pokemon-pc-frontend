import React from "react"
import Pokemon from "../components/pokemon"

const AllPokemon = (props) => {
    console.log(props.pokemons);
    if (props.pokemons.length === 0) {
        return <span> Loading ...</span>
    }
    console.log("has value =" + props.pokemons)
    return props.pokemons.results.map((pokemon)=> {
        return <Pokemon key={pokemon.id} pokemon={pokemon}
        />
    })
}

export default AllPokemon