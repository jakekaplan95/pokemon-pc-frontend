import React from "react"
import {Link} from "react-router-dom"
import Carousel from "react-elastic-carousel";


const PokemonTeam = ({teamId, pokemonTeams, images, deleteTeam, editTeam}) => {
    if (pokemonTeams === undefined) {
        return <span> Loading ...</span>
    }

    var pokemonTeam;
    pokemonTeams.forEach(team => {
      if (team.id === parseInt(teamId)) {
        pokemonTeam = team;
      }
    });
    if (pokemonTeam === undefined) {
        return <span> Loading... </span>;
    }

    // in-line styles
    const div = {
        textAlign: "center",
        border: "3px solid",
        margin: "10px auto",
        width: "80%"
    }
    var toRender = [];
    if (images === undefined || Object.keys(images).length === 0) {
        toRender.push({src: "https://miro.medium.com/max/880/0*H3jZONKqRuAAeHnG.jpg"});
        toRender.push({src: "https://miro.medium.com/max/880/0*H3jZONKqRuAAeHnG.jpg"});
        toRender.push({src: "https://miro.medium.com/max/880/0*H3jZONKqRuAAeHnG.jpg"});
        toRender.push({src: "https://miro.medium.com/max/880/0*H3jZONKqRuAAeHnG.jpg"});
        toRender.push({src: "https://miro.medium.com/max/880/0*H3jZONKqRuAAeHnG.jpg"});
        toRender.push({src: "https://miro.medium.com/max/880/0*H3jZONKqRuAAeHnG.jpg"});
    } else {
        if (images[pokemonTeam.pokemon1] !== undefined) {
            toRender.push(images[pokemonTeam.pokemon1]);
        } else {
            toRender.push({src: "https://miro.medium.com/max/880/0*H3jZONKqRuAAeHnG.jpg"});
        }
        if (images[pokemonTeam.pokemon2] !== undefined) {
            toRender.push(images[pokemonTeam.pokemon2]);
        } else {
            toRender.push({src: "https://miro.medium.com/max/880/0*H3jZONKqRuAAeHnG.jpg"});
        }
        if (images[pokemonTeam.pokemon3] !== undefined) {
            toRender.push(images[pokemonTeam.pokemon3]);
        } else {
            toRender.push({src: "https://miro.medium.com/max/880/0*H3jZONKqRuAAeHnG.jpg"});
        }
        if (images[pokemonTeam.pokemon4] !== undefined) {
            toRender.push(images[pokemonTeam.pokemon4]);
        } else {
            toRender.push({src: "https://miro.medium.com/max/880/0*H3jZONKqRuAAeHnG.jpg"});
        }
        if (images[pokemonTeam.pokemon5] !== undefined) {
            toRender.push(images[pokemonTeam.pokemon5]);
        } else {
            toRender.push({src: "https://miro.medium.com/max/880/0*H3jZONKqRuAAeHnG.jpg"});
        }
        if (images[pokemonTeam.pokemon6] !== undefined) {
            toRender.push(images[pokemonTeam.pokemon6]);
        } else {
            toRender.push({src: "https://miro.medium.com/max/880/0*H3jZONKqRuAAeHnG.jpg"});
        }
    }

    const breakPoints = [
        { width: 1, itemsToShow: 1 },
        { width: 550, itemsToShow: 2 },
        { width: 768, itemsToShow: 3 },
        { width: 1200, itemsToShow: 4 }
      ];


    return <div style={div}>
        <button onClick={(event) => deleteTeam(pokemonTeam.id)}>Delete</button>
        <button onClick={(event) => editTeam(pokemonTeam)}>Rename</button>
        <Link to="/"><button> Go Back </button></Link>

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