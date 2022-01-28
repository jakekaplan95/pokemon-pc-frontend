import React from "react"
import {Link} from "react-router-dom"


// in-line styles
const divStyle = {
    textAlign: "center",
    border: "3px solid",
    margin: "10px auto",
    width: "80%"
}

const button = {
    backgroundColor: "red",
    display: "block",
    margin: "auto"
  }


const AllPokemonTeams = (props) => {
    if (!props.pokemonteams || props.pokemonteams.length === 0) {
        return <span> Loading... </span>;
    }
    console.log("has value =" + props.pokemonteams)

    return (<div>
        <button style={button} onClick={props.connectMetamask}>Connect to Metamask!</button>
        {props.pokemonteams.map((team)=> {
            console.log(team);
            return (<div syle={divStyle}>
            <Link to={`/pokemonteams/${team.id}`}>
                <h2>{team.name}</h2>
            </Link>
            </div>);
        })}
    </div>)
}

export default AllPokemonTeams
