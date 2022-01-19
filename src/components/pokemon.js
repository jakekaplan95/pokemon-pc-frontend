import React from "react"
import {Link} from "react-router-dom"


const Pokemon = ({pokemon}) => {

    // in-line styles
    const div = {
        textAlign: "center",
        border: "3px solid",
        margin: "10px auto",
        width: "80%"
    }

    return <div syle={div}>
        <Link to={`/pokedex/${pokemon.name}`}>
            <h1>{pokemon.name}</h1>
        </Link>
            <h2>{pokemon.identifier}</h2>
            <h2>{pokemon.ability}</h2>
            <h2>{pokemon.health}</h2>
            <h2>{pokemon.attack}</h2>
            <h2>{pokemon.defense}</h2>
    </div>
}

export default Pokemon