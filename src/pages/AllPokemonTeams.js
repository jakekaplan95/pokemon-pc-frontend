import React from "react"
import {Link} from "react-router-dom"


// in-line styles
const divStyle = {
    textAlign: "center",
    border: "3px solid",
    margin: "10px auto",
    width: "80%"
}


const AllPokemonTeams = (props) => {
    console.log(props);
    if (!props.pokemonteams || props.pokemonteams.length === 0) {
        return <span> Loading... </span>;
    }
    console.log("has value =" + props.pokemonteams)

    return (<div>
        <button onClick={(event) => props.connectMetaMask}>Connect to Metamask</button>
        {props.pokemonteams.map((team)=> {
            console.log(team);
            return (<div syle={divStyle}>
            <Link to={`/pokemonteams/${team.id}`}>
                <h1>{team.name}</h1>
            </Link>
            </div>);
        })}
    </div>)
}

export default AllPokemonTeams
