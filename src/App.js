import React, { useState, useEffect } from 'react';
import PokemonCard from './PokemonCard';

const App = () => {
  const [pokemonData, setPokemonData] = useState([]);
  const [detailedPokemon, setDetailedPokemon] = useState({});
  const [search, setSearch] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('https://pokeapi.co/api/v2/pokemon?limit=20');
        const data = await response.json();
        setPokemonData(data.results);
        
        const detailPromises = data.results.map(async (pokemon) => {
          const pokemonResponse = await fetch(pokemon.url);
          return pokemonResponse.json();
        });
        
        const detailedData = await Promise.all(detailPromises);
        const detailedPokemonMap = detailedData.reduce((acc, pokemon) => {
          acc[pokemon.name] = pokemon;
          return acc;
        }, {});
        
        setDetailedPokemon(detailedPokemonMap);
        setLoading(false); // Set loading to false after data is fetched
      } catch (error) {
        console.error('Error fetching data:', error);
        setLoading(false); // Set loading to false even if there's an error
      }
    };
    fetchData();
  }, []);

  const handleSearchChange = (e) => {
    setSearch(e.target.value.toLowerCase());
  };

  const filteredPokemon = pokemonData.filter(pokemon =>
    pokemon.name.toLowerCase().includes(search)
  );

  return (
    <div className="App">
      <header className="flex flex-col gap-6 items-center p-2">
        <h1 className="text-3xl font-extrabold">Pokémon Cards</h1>
        
        <input
          className="border border-black w-full h-10 pl-4 md:w-96"
          type="text"
          placeholder="Search Pokémon..."
          onChange={handleSearchChange}
        />
        
        {loading ? (
          // Display loader when loading is true
          <div className="text-3xl font-extrabold ">Loading...</div>
        ) : (
          // Display Pokémon cards when loading is false
          <div className="flex flex-wrap gap-4 justify-center">
            {filteredPokemon.map(pokemon => (
              <PokemonCard key={pokemon.name} pokemon={detailedPokemon[pokemon.name]} />
            ))}
          </div>
        )}
      </header>
    </div>
  );
};

export default App;
