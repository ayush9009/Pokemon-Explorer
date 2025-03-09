import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import Image from "next/image";

const Pokemon = () => {
  const router = useRouter();
  const [pokemon, setPokemon] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (router.isReady) {
      const name = router.query.pokemon;

      fetch(`https://pokeapi.co/api/v2/pokemon/${name}`)
        .then((response) => {
          if (!response.ok) {
            throw new Error("Pokemon not found");
          }
          return response.json();
        })
        .then((data) => {
          setPokemon(data);
          setLoading(false);
        })
        .catch((err) => {
          setError(err.message);
          setLoading(false);
        });
    }
  }, [router.isReady]);

  if (loading) return <div className="text-center">Loading...</div>;
  if (error) return <div className="text-center text-red-500">{error}</div>;

  return (
    <div className="container min-h-screen grid place-items-center">
      <div className="w-[500px] mx-auto bg-white p-10 shadow-lg rounded-lg">
        {pokemon.sprites?.front_default && (
          <Image
            className="mx-auto"
            src={pokemon.sprites.front_default}
            width={200}
            height={200}
            alt={pokemon.name}
          />
        )}
        <h1 className="text-center capitalize text-3xl pt-2 pb-4">
          {pokemon.name}
        </h1>

        <div className="flex flex-col gap-6 mt-8">
          <div className="flex items-center gap-4">
            <h2 className="text-lg">Type:</h2>
            {pokemon.types?.map((t) => (
              <span key={t.type.name} className="type">
                {t.type.name}
              </span>
            ))}
          </div>

          <div className="flex items-center gap-4">
            <h2 className="text-lg">Abilities:</h2>
            {pokemon.abilities?.map((a) => (
              <span key={a.ability.name} className="ability">
                {a.ability.name}
              </span>
            ))}
          </div>

          <div>Weight: {pokemon.weight} pounds</div>
          <div>Height: {pokemon.height} feet</div>
        </div>
      </div>
    </div>
  );
};

export default Pokemon;
