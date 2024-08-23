const PokemonCard = ({ pokemon }) => {
    if (!pokemon) return null;
  
    return (
      <div className="border p-2 md:p-4 hover:-translate-y-2 hover:shadow-2xl duration-500">
        <h2 className="text-2xl font-extrabold text-center">{pokemon.name}</h2>
        <img
          className="w-56 md:w-56 lg:w-96 "
          src={pokemon.sprites.other['official-artwork'].front_default}
          alt={pokemon.name}
        />
      </div>
    );
  };

export default PokemonCard;