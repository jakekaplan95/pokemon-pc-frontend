import AllPokemon from "./pages/AllPokemon";
import AllPokemonTeams from "./pages/AllPokemonTeams";
import PokemonTeam from "./components/pokemonTeam"

import SinglePokemon from "./pages/SinglePokemon";
import Form from "./pages/Form"

import {useState, useEffect} from "react"

import {Route, Switch, Link} from "react-router-dom"




var images = {};

function App(props) {
var currentAccount = "";

  <div styles={{backgroundImage: "https://cdn.wallpapersafari.com/26/82/41PKyd.jpg"}}></div>



  const ALLOWED_CHAIN = "0x4"; // test chain rinkeby

  const dataRoot = "0x78f1e763000000000000000000000000000000000000000000000000000000000000002000000000000000000000000000000000000000000000000000000000000000013";

  const dataEnd = "00000000000000000000000000000000000000000000000000000000000000";

  function connectMetamask() {
      if (!window.ethereum) {
          alert("There were no ethereum utilities detected in your browser. Please install MetaMask or another web3 wallet extension, and ensure it is enabled.");
      }
      // eslint-disable-next-line no-undef
      ethereum.request({ method: 'eth_requestAccounts' })
      .then(() => {
          // eslint-disable-next-line no-undef
          ethereum.request({ method: 'eth_accounts' })
          .then(accountsChanged)
          .catch((err) => {
              // Some unexpected error.
              // For backwards compatibility reasons, if no accounts are available,
              // eth_accounts will return an empty array.
              console.error(err);
          });
      });
  }

  function accountsChanged(accounts) {
      if (accounts.length === 0) {
          // MetaMask is locked or the user has not connected any accounts
          // disable minting and enable connecting
          currentAccount = "";
          alert("No accounts detected in wallet. Please connect an account and try again.");
      } else if (accounts[0] !== currentAccount) {
          currentAccount = accounts[0];
          // disable connecting and enable minting
          // eslint-disable-next-line no-undef
          ethereum.request({ method: 'eth_chainId' }).then((chainId) => {
              if (chainId !== ALLOWED_CHAIN) {
                  alert("Detected cryptocurrency chain is not allowed for use with this site. Please change the chain to Rinkeby.")
              }
          });
      }
  }


  function chainChanged(chainId) {
      // Handle the new chain.
      // Correctly handling chain changes can be complicated, so we just reload
      window.location.reload();
  }

  // eslint-disable-next-line no-undef
  ethereum.on("chainChanged", chainChanged);

  function getData(pokeId) {
    return dataRoot + pokeId + dataEnd;
  }

  function doMint(pokeId) {
    findPokemon(pokeId).then( (pokeData) => {
      console.log(pokeData);
      var data = getData(pokeData.id);
      // eslint-disable-next-line no-undef
      ethereum.request({ method: 'eth_accounts' }).then((accounts) => {
        var myData = {
          from: accounts[0],
          value: "0x0",
          to: "0x9Ecae4A89c6d57700C73AdC166fE8aD465a7a178",
          data: data
        }
        console.log(myData);
        // eslint-disable-next-line no-undef
        ethereum.request({method: 'eth_sendTransaction', params: [myData]}).then( (hash) => {
          alert("Your trasaction hash is " + hash);
        });
      })
    })
  };


  // in-line styles
  const h1 = {
    textAlign: "center",
    margin: "10px",
    fontFamily: "Archivo Black",
    color: "whitesmoke",
}


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
  const [detailedPokemon, setDetailedPokemon] = useState({})

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

    if (pokemons !== undefined && pokemons !== [] && pokemons.length !== 0) {
      return;
    }
    const response = await fetch(url)
    const data = await response.json()
    await getImages(data);
    setPokemons(data);
  }

  const getImages = async (data) => {
    if (images !== undefined && images !== {} && Object.keys(images).length !== 0) {
      return;
    }
    for (var idx in data.results) {
      var datum = data.results[idx];
      if (!(datum.name in images)) {
        // eslint-disable-next-line no-loop-func
        var poke = await findPokemon(datum.name);
        images[datum.name] = ({src: poke.sprites.front_default});
      }
    }
  }

  const findPokemon = async (pokemonName) => {
    const response = await fetch(url + pokemonName);
    const data = await response.json();
    return data;
  }

  const findAndSetDetailedPokemon = async () => {
    // eslint-disable-next-line eqeqeq
    if (Object.keys(detailedPokemon).length != 0) {
      return;
    }
    var tmp = {};
    for (var i = 1; i < 152; i+=1) {
      var tmpPoke = await findPokemon(i);
      tmp[i] = tmpPoke;
    }
    setDetailedPokemon(tmp);
  }


  const getPokemonTeams = async (force) => {
    if (pokemonTeams !== undefined && pokemonTeams !== [] && pokemonTeams.length !== 0 && !force) {
      return;
    }
    const response = await fetch(teamUrl);
    const data = await response.json();
    setPokemonTeams(data);
  }

  const addPokemonTeam = async (newTeam) => {
    var data = {};
    data.pokemonteam = newTeam;
    // eslint-disable-next-line no-unused-vars
    const response = await fetch(teamUrl, {
      method: "post",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    })
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
    getPokemons();
    getPokemonTeams(false);
    findAndSetDetailedPokemon();
  })


  /////////////////
  // Returned JSX
  /////////////////
  return (
    <div className="App">
      <h1 style={h1}>Pokemon on the Blockchain!</h1>
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
          rp.connectMetamask = connectMetamask;
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
          const input = {};
          input.pokemonTeams = pokemonTeams;
          input.deleteTeam = deleteTeam;
          input.editTeam = editTeam;
          input.images = images;
          input.teamId = rp.match.params.id;
          input.doMint = doMint;
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

        <Route
          path="/opensea/:id"
          render={(rp) => {
            var toRedirect = "https://jakekaplan95.github.io/metadata/" + rp.match.params.id;
            window.location.href = toRedirect;
            return null;
          }}
          >
          </Route>;

      </Switch>
    </div>
  );
}

export default App;