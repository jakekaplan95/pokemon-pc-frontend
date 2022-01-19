import React from "react"
import {Link} from "react-router-dom"
import Carousel from "react-elastic-carousel";


const PokemonTeam = ({pokemonTeam, images, deleteTeam, editTeam}) => {
    console.log("in team");
    console.log(images);
    if (pokemonTeam === undefined || images === undefined || Object.keys(images).length === 0) {
        return <span> Loading... </span>;
    }

    // in-line styles
    const div = {
        textAlign: "center",
        border: "3px solid",
        margin: "10px auto",
        width: "80%"
    }
    console.log(images);
    var toRender = [];
    toRender.push(images[pokemonTeam.pokemon1]);
    toRender.push(images[pokemonTeam.pokemon2]);
    toRender.push(images[pokemonTeam.pokemon3]);
    toRender.push(images[pokemonTeam.pokemon4]);
    toRender.push(images[pokemonTeam.pokemon5]);
    toRender.push(images[pokemonTeam.pokemon6]);
    console.log(toRender);

    const breakPoints = [
        { width: 1, itemsToShow: 1 },
        { width: 550, itemsToShow: 2 },
        { width: 768, itemsToShow: 3 },
        { width: 1200, itemsToShow: 4 }
      ];


    return <div style={div}>
        <button onClick={(event) => deleteTeam(pokemonTeam.id)}>Delete</button>
        <button onClick={(event) => editTeam(pokemonTeam)}>Rename</button>

        <Carousel breakPoints={breakPoints}>
            {toRender.map((image, index) => {
                const itemStyle = {
                    backgroundImage: 'url(' + image.src + ')',
                    width: "80px",
                    height: "80px",
                    backgroundColor: "black",
                    backgroundPosition: "center",
                    backgroundSize: "cover",

                };
                return <div
                    key={index}
                    style={itemStyle}
                />
            })}
        </Carousel>


        <Link to={`/pokemonteams/${pokemonTeam.id}`}>
            <input id="teamName" defaultValue={pokemonTeam.name} />
        </Link>
        <Link to={`/pokedex/${pokemonTeam.pokemon1}`}>
            <h2>{pokemonTeam.pokemon1}</h2>
        </Link>
        <Link to={`/pokedex/${pokemonTeam.pokemon2}`}>
            <h2>{pokemonTeam.pokemon2}</h2>
        </Link>
        <Link to={`/pokedex/${pokemonTeam.pokemon3}`}>
            <h2>{pokemonTeam.pokemon3}</h2>
        </Link>
        <Link to={`/pokedex/${pokemonTeam.pokemon4}`}>
            <h2>{pokemonTeam.pokemon4}</h2>
        </Link>
        <Link to={`/pokedex/${pokemonTeam.pokemon5}`}>
            <h2>{pokemonTeam.pokemon5}</h2>
        </Link>
        <Link to={`/pokedex/${pokemonTeam.pokemon6}`}>
            <h2>{pokemonTeam.pokemon6}</h2>
        </Link>
        </div>
}

export default PokemonTeam