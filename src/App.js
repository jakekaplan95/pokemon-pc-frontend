import AllPokemon from "./pages/AllPokemon";
import SinglePokemon from "./pages/SinglePokemon";
import Form from "./pages/Form"

import {useState, useEffect} from "react"

import {Route, Switch, Link} from "react-router-dom"

import Carousel from "react-elastic-carousel";


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

  // state to hold list of pokemon
  const [pokemons, setPokemons] = useState([])

  // obeject for null pokemon at starting point
  const nullPokemon = {
    name: "",
    identifier: "",
    ability: "",
    health: "",
    attack: "",
    defense: "",
  }

  // update state of pokemon to edit
  const [targetPokemon, setTargetPokemon] = useState(nullPokemon)

    ///////////////
  // Functions
  ////////////////

  const getPokemons = async () => {
    const response = await fetch(url)
    console.log(response)
    const data = await response.json()
    setPokemons(data)
  }

  const addPokemons = async (newPokemon) => {
    const response = await fetch(url, {
      method: "post",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newPokemon),
    })
    getPokemons();
  }

  const getTargetPokemon = (pokemon) => {
    setTargetPokemon(pokemon);
    props.history.push("/edit");
  }

  const updatePokemon = async (pokemon) => {
    const response = await fetch(url + pokemon.id + "/", {
      method: "put",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(pokemon),
    });

    // updated list of pokemon
    getPokemons()
  }

  const deletePokemon = async (pokemon) => {
    const response = await fetch(url + pokemon.id + "/", {
      method: "delete",
    });

    getPokemons();
    props.history.push("/");
  };


  ///////////////
  // useEffects
  ///////////////

  // make the api call when the component
  // loads only the first time
  useEffect(() => {
    getPokemons()
  }, [])


  /////////////////
  // Returned JSX
  /////////////////
  return (
    <div className="App">
      <h1 style={h1}>Pokemon!</h1>
      <Link to="/new">
        <button style={button}>Create New Pokemon</button>
      </Link>
      <Switch>

        {/* Pokemon Index */}
        <Route
        exact path="/"
        render={(rp) => {
          return <AllPokemon {...rp}
          pokemons={pokemons}
          />;
        }}
        />

        {/* Show one Pokemon */}
        <Route
          path="/pokemons/:id"
          render={(rp) => {
            return <SinglePokemon
            {...rp}
            pokemons={pokemons}
            edit={getTargetPokemon}
            deletePokemon={deletePokemon}
            />;
          }}
        />

        {/* Create and Edit Form */}

        <Route
          path="/new"
          render={(rp) => {
            return <Form {...rp}
            initialPokemon={nullPokemon}
            handleSubmit={addPokemons}
            buttonLabel="create pokemon"
          />;
          }}
        />

        <Route
          path="/edit"
          render={(rp) => {
            return <Form
            {...rp}
            initialPokemon={targetPokemon}
            handleSubmit={updatePokemon}
            buttonLabel="Make the edit"
            />;
          }}
        />
      </Switch>
    </div>
  );
}

export default App;