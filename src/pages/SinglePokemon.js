import React from "react"
import {Link} from "react-router-dom"

const SinglePokemon = ({pokemons, match, edit, deletePokemon}) => {

     // grab the id from params
     const id = parseInt(match.params.id)
     // find the pokemon from array
     const pokemon = pokemons.find((pokemon) => pokemon.id === id )


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

        <button onClick={(event) => deletePokemon(pokemon)}>Delete</button>
        <button onClick={(event) => edit(pokemon)}>Edit</button>
        <Link to="/"><button> Go Back </button></Link>

        <button> Add to Team </button>
     </div>
     );
};

export default SinglePokemon