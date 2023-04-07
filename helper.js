const pokemons = require("./mock-pokemon");

exports.success = (message, data) => {
  return { message, data };
};

exports.getUniqueId = (pokemons) => {
  const pokemonsIds = pokemons.map((pokemon) => pokemon.id);
  const maxId = pokemonsIds.reduce((a, b) => Math.max(a, b));
  const uniqueId = maxId + 1;
  return uniqueId;
};

//syntaxe ES6
// module qui declare une methode success afin de mieux structurer les donnees JSON
//un message conci de description et ensuite les donnees attendu par le consommateur
