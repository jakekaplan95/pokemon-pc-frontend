import React from "react"
import Pokemon from "../components/pokemon"

const AllPokemon = (props) => {

    return props.pokemons.map((pokemon)=> {
        return <Pokemon key={pokemon.id} pokemon={pokemon}
        />
    })
}

export default AllPokemon