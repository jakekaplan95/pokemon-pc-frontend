import React from "react"
import {Link} from "react-router-dom"

const SinglePokemon = ({pokemons, match}) => {

    if (pokemons === undefined || pokemons.length === 0) {
        return <span> Loading ...</span>
    }

    // find the pokemon from array
    const pokemon = pokemons.results.find((pokemon) => pokemon.name === match.params.name )

    // in-line styles
    const div = {
        textAlign:"center",
        border: "5px solid red",
        width: "80%",
        margin: "30px auto"
    }


     return (
        <div style={div}>
        <h1>{pokemon?.name}</h1>
        <h2>{pokemon?.identifier}</h2>
        <h2>{pokemon?.ability}</h2>
        <h2>{pokemon?.health}</h2>
        <h2>{pokemon?.attack}</h2>
        <h2>{pokemon?.defense}</h2>
        <Link to="/"><button> Go Back </button></Link>
     </div>
     );
};

export default SinglePokemon