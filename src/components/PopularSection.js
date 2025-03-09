import React, { useEffect, useState } from "react";
import Card from "./Card";

const PopularSection = () => {
  const [popularPokemons, setPopularPokemons] = useState([]);

  useEffect(() => {
    const fetchPokemon = async (pokemonNames) => {
      try {
        const responses = await Promise.all(
          pokemonNames.map((name) =>
            fetch(`https://pokeapi.co/api/v2/pokemon/${name}`).then((res) =>
              res.json()
            )
          )
        );
        setPopularPokemons(responses);
      } catch (error) {
        console.error("Error fetching popular Pokémon:", error);
      }
    };

    fetchPokemon(["pikachu", "bulbasaur", "charizard"]);
  }, []);

  return (
    <div className="py-8 pb-16 px-4">
      <div className="container">
        <h1 className="py-4 text-2xl">Popular Pokémons</h1>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-10 w-[400px] md:w-[100%] mx-auto">
          {popularPokemons.map((p) => (
            <Card
              key={p.name}
              img={p.sprites.front_default}
              name={p.name}
              types={p.types}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default PopularSection;
