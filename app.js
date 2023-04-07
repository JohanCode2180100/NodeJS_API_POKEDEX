//import files
const { config } = require("./config.js");
let pokemons = require("./mock-pokemon.js");
const { success, getUniqueId } = require("./helper.js");
const favicon = require("serve-favicon");
const morgan = require("morgan");
const bodyParser = require("body-parser");

const express = require("express");
const app = express();

//middlewares
app
  .use(favicon(__dirname + "/favicon.ico"))
  .use(morgan("dev"))
  .use(bodyParser.json());

app.use((req, res, next) => {
  console.log(`URL : ${req.url}`);
  next();
});

//routing
app.get("/", (req, res) => {
  res.send("hello");
});

//nb de pokemons dans le pokedex
app.get("/api/pokemons", (req, res) => {
  const message = `Voici la liste complete des pokemons contenant dans le pokedex, il y a actuellement ${pokemons.length} pokemons`;
  res.json(success(message, pokemons));
});

app.get("/api/pokemons/:id", (req, res) => {
  const id = parseInt(req.params.id);
  //find renvoi le premier element trouve dans le tableau sous cdt => ici l ID
  const pokemon = pokemons.find((pokemon) => pokemon.id === id);
  //la methode json permet de passer les informations au format JSON
  // Modification de la reponse avec le module helper
  // res.json(pokemon);
  const message = "un pokemon a bien ete trouve";
  res.json(success(message, pokemon));
});

//methode POST

app.post("/api/pokemons", (req, res) => {
  const id = getUniqueId(pokemons);
  const pokemonCreated = { ...req.body, ...{ id: id, created: new Date() } };
  pokemons.push(pokemonCreated);
  const message = `Le pokemon ${pokemonCreated.name} a ete cree`;
  res.json(success(message, pokemonCreated));
});

// pokemons update
app.put("/api/pokemons/:id", (req, res) => {
  const id = parseInt(req.params.id);
  const pokemonUpdated = { ...req.body, id: id };
  pokemons = pokemons.map((pokemon) => {
    return pokemon.id === id ? pokemonUpdated : pokemon;
  });
  const message = `Le pokemon ${pokemonUpdated.name} a bien ete modifie`;
  res.json(success(message, pokemonUpdated));
});

//pokemon delete
app.delete("/api/pokemons/:id", (req, res) => {
  const id = parseInt(req.params.id);
  const pokemonDeleted = pokemons.find((pokemon) => pokemon.id === id);
  pokemons = pokemons.filter((pokemon) => pokemon.id !== id);
  const message = `Le pokémon ${pokemonDeleted.name} a bien été supprimé.`;
  res.json(success(message, pokemonDeleted));
});

app.listen(config.port, () => {
  console.log(`app started on port : ${config.port}`);
});
