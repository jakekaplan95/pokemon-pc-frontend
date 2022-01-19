import AllPokemon from "./pages/AllPokemon";
import AllPokemonTeams from "./pages/AllPokemonTeams";
import PokemonTeam from "./components/pokemonTeam"

import SinglePokemon from "./pages/SinglePokemon";
import Form from "./pages/Form"

import {useState, useEffect} from "react"

import {Route, Switch, Link} from "react-router-dom"


function App(props) {

  // in-line styles
  const h1 = {
    textAlign: "center",
    margin: "10px"
  };

  const button = {
    backgroundColor: "red",
    display: "block",
    margin: "auto"
  }

  // api url
  const url ="https://pokemon-pc-backend.herokuapp.com/pokemons/"
  const teamUrl ="https://pokemon-pc-backend.herokuapp.com/pokemonteams/"

  // state to hold list of pokemon
  const [pokemons, setPokemons] = useState([])
  const [pokemonTeams, setPokemonTeams] = useState([])
  const [images, setImages] = useState({})

  // obeject for null pokemon at starting point
  const nullPokemon = {
    name: "",
    pokemon1: "",
    pokemon2: "",
    pokemon3: "",
    pokemon4: "",
    pokemon5: "",
    pokemon6: "",
  }
    ///////////////
  // Functions
  ////////////////

  const getPokemons = async () => {
    console.log("here");
    console.log(pokemons);
    if (pokemons !== undefined && pokemons !== [] && pokemons.length !== 0) {
      console.log("returning pokemon early");
      return;
    }
    const response = await fetch(url)
    const data = await response.json()
    setPokemons(data);
  }

  const getImages = async () => {
    console.log((images));
    if (images !== undefined && images !== {} && Object.keys(images).length !== 0) {
      console.log("returning images early")
      return;
    }
    console.log("images rendering below");
    const response = await fetch(url)
    const data = await response.json()
    console.log("got data");
    console.log(data.results);
    var imgs = {};
    for (var idx in data.results) {
      var datum = data.results[idx];
      console.log("data ");
      var poke = await findPokemon(datum.name);
      imgs[datum.name] = ({src: poke.sprites.front_default});
    }
    console.log("Rendered");
    console.log(imgs);
    setImages(imgs);
  }

  const findPokemon = async (pokemonName) => {
    const response = await fetch(url + pokemonName);
    const data = await response.json();
    return data;
  }


  const getPokemonTeams = async (force) => {
    console.log("Teams " + pokemonTeams)
    console.log(pokemonTeams);
    if (pokemonTeams !== undefined && pokemonTeams !== [] && pokemonTeams.length !== 0 && !force) {
      console.log("returning teams early");
      return;
    }
    console.log("here for teams");
    const response = await fetch(teamUrl);
    const data = await response.json();
    setPokemonTeams(data);
  }

  const addPokemonTeam = async (newTeam) => {
    var data = {};
    data.pokemonteam = newTeam;
    console.log(data);
    const response = await fetch(teamUrl, {
      method: "post",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    })
    console.log(response)
    await getPokemonTeams(true);
  }

  const editTeam = async (team) => {
    var newTeam = {"pokemonteam": {"name": document.getElementById("teamName").value}};
    await fetch(teamUrl + team.id + "/", {
      method: "put",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(newTeam),
    });
    // updated list of pokemon
    await getPokemonTeams(true);
  }

  const deleteTeam = async (teamId) => {
    const response = await fetch(teamUrl + teamId + "/", {
      method: "delete",
    });
    console.log(response)
    await getPokemonTeams(true);
    props.history.push("/");
  };


  ///////////////
  // useEffects
  ///////////////

  // make the api call when the component
  // loads only the first time
  useEffect(() => {
    console.log("useEffect");
    getPokemons();
    getPokemonTeams(true);
    getImages();
  })


  /////////////////
  // Returned JSX
  /////////////////
  return (
    <div className="App">
      <h1 style={h1}>Pokemon!</h1>
      <Link to="/new">
        <button style={button}>Create New Pokemon Team</button>
      </Link>
      <Switch>

        {/* Pokemon Index */}
        <Route
        exact path="/pokedex"
        render={(rp) => {
          if (pokemons === undefined || pokemons === []) {
            getPokemons();
          }
          rp.pokemons = pokemons;
          return <AllPokemon {...rp}
          />;
        }}
        />

        {/* Show one Pokemon */}
        <Route
          path="/pokedex/:name"
          render={(rp) => {
            var input = {};
            input.pokemons = pokemons;
            input.match = rp.match
            return <SinglePokemon
            {...input}
            />;
          }}
        />

        {/* Pokemon Teams Index */}
        <Route
        exact path="/"
        render={(rp) => {
          getPokemonTeams(false);
          rp.pokemonteams = pokemonTeams;
          return <AllPokemonTeams {...rp}
          />;
        }}
        />
        {/* Pokemon Teams Index */}
        <Route
        exact path="/pokemonteams"
        render={(rp) => {
          getPokemonTeams(false);
          rp.pokemonteams = pokemonTeams;
          return <AllPokemonTeams {...rp}
          />;
        }}
        />

        <Route
        exact path="/pokemonteams/:id"
        render={(rp) => {
          var pokeTeam;
          pokemonTeams.forEach(team => {
            if (team.id === rp.match.params.id) {
              pokeTeam = team;
            }
          });
          const input = {};
          input.pokemonTeam = pokeTeam;
          input.deleteTeam = deleteTeam;
          input.editTeam = editTeam;
          getPokemons();
          input.pokemons = pokemons;
          input.images = images;
          return <PokemonTeam {...input}
          />;
        }}
        />

        {/* Create and Edit Form */}

        <Route
          path="/new"
          render={(rp) => {
            return <Form {...rp}
            initialPokemon={nullPokemon}
            handleSubmit={addPokemonTeam}
            buttonLabel="create team"
          />;
          }}
        />

      </Switch>
    </div>
  );
}

export default App;