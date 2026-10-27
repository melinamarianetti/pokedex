import { useState } from "react";
import "./App.css";
import steel from "./assets/icons/Tipo_acero_icono_EP.svg";
import water from "./assets/icons/Tipo_agua_icono_EP.svg";
import bug from "./assets/icons/Tipo_bicho_icono_EP.svg";
import electric from "./assets/icons/Tipo_eléctrico_icono_EP.svg";
import fire from "./assets/icons/Tipo_fuego_icono_EP.svg";
import ghost from "./assets/icons/Tipo_fantasma_icono_EP.svg";
import dragon from "./assets/icons/Tipo_dragón_icono_EP.svg";
import fairy from "./assets/icons/Tipo_hada_icono_EP.svg";
import ice from "./assets/icons/Tipo_hielo_icono_EP.svg";
import fighting from "./assets/icons/Tipo_lucha_icono_EP.svg";
import normal from "./assets/icons/Tipo_normal_icono_EP.svg";
import grass from "./assets/icons/Tipo_planta_icono_EP.svg";
import psychic from "./assets/icons/Tipo_psíquico_icono_EP.svg";
import rock from "./assets/icons/Tipo_roca_icono_EP.svg";
import dark from "./assets/icons/Tipo_siniestro_icono_EP.svg";
import ground from "./assets/icons/Tipo_tierra_icono_EP.svg";
import poison from "./assets/icons/Tipo_veneno_icono_EP.svg";
import flying from "./assets/icons/Tipo_volador_icono_EP.svg";

function App() {
  const [pokemon, setPokemon] = useState("");
  const [pokemonData, setPokemondata] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  console.log(pokemonData);

  const icons = {
    steel,
    water,
    bug,
    electric,
    fire,
    ghost,
    dragon,
    fairy,
    ice,
    fighting,
    normal,
    grass,
    psychic,
    rock,
    dark,
    ground,
    poison,
    flying,
  };

  const traducirTipo = (tipo) => {
    switch (tipo) {
      case "electric":
        return "Eléctrico";
      case "fire":
        return "Fuego";
      case "ghost":
        return "Fantasma";
      case "poison":
        return "Veneno";
      case "water":
        return "Agua";
      case "grass":
        return "Planta";
      case "fighting":
        return "Lucha";
      case "psychic":
        return "Psiquico";
      case "fairy":
        return "Hada";
      case "bug":
        return "Bicho";
      case "flying":
        return "Vuelo";
      case "rock":
        return "Roca";
      case "ground":
        return "Tierra";
      case "dragon":
        return "Dragón";
      case "dark":
        return "Siniestro";
      case "steel":
        return "Acero";
      case "ice":
        return "Hielo";
      case "normal":
        return "Normal";
      default:
        return tipo;
    }
  };

  const traducirStat = (stat) => {
    switch (stat) {
      case "hp":
        return "Vida";
      case "attack":
        return "Ataque";
      case "defense":
        return "Defensa";
      case "special-attack":
        return "Ataque Especial";
      case "special-defense":
        return "Defensa Especial";
      case "speed":
        return "Velocidad";
      default:
        return stat;
    }
  };

  const buscarPokemon = async (valor) => {
    setLoading(true);
    setError(null);

    try {
      const url = `https://pokeapi.co/api/v2/pokemon/${valor}`;

      const response = await fetch(url);
      const data = await response.json();

      setPokemondata(data);
      setPokemon("");
    } catch (error) {
      setError("Pokemon no existe");
      setPokemondata(null);
    } finally {
      setLoading(false);
    }
  };

  const handleClick = (e) => {
    e.preventDefault();

    if (!pokemon.trim()) return;
    buscarPokemon(pokemon);
  };

  const handlePrevious = () => {
    if (!pokemonData) return;

    if (pokemonData.id === 1) return;

    buscarPokemon(pokemonData.id - 1);
  };

  const handleNext = () => {
    if (!pokemonData) return;

    buscarPokemon(pokemonData.id + 1);
  };

  return (
    <div className="pokedex">
      <form className="form" onSubmit={handleClick}>
        <input
          className="input"
          type="text"
          value={pokemon}
          onChange={(e) => setPokemon(e.target.value)}
          placeholder="Buscá tu pokemon..."
        />

        <button className="btn-buscar" type="submit">
          Buscar
        </button>
      </form>

      {error && <p className="error">{error}</p>}

      {pokemonData && (
        <>
          <div className="card">
            <div className="imagenes">
              <img
                className="pokemon-img"
                src={pokemonData.sprites.front_default}
                alt={pokemonData.name}
              />

              <img
                className="pokemon-img"
                src={pokemonData.sprites.front_shiny}
                alt={`${pokemonData.name} shiny`}
              />
            </div>

            <h2>{pokemonData.name}</h2>

            <p className="numero-pokedex">#{pokemonData.id}</p>

            <div className="tipos">
              {pokemonData.types.map((element) => (
                <div className="tipo" key={element.type.name}>
                  <img src={icons[element.type.name]} alt={element.type.name} />

                  <span>{traducirTipo(element.type.name)}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="btns">
            <button className="anterior" type="button" onClick={handlePrevious}>
              ⬅️ Anterior
            </button>

            <button className="siguiente" type="button" onClick={handleNext}>
              Siguiente ➡️
            </button>
          </div>
          <div className="stats">
            <h3>Estadísticas</h3>

            {pokemonData.stats.map((element) => (
              <div className="stat" key={element.stat.name}>
                <div className="stat-info">
                  <span>{traducirStat(element.stat.name)}</span>

                  <span>{element.base_stat}</span>
                </div>

                <div className="barra">
                  <div
                    className="barra-progreso"
                    style={{
                      width: `${element.base_stat}%`,
                    }}
                  ></div>
                </div>
              </div>
            ))}
          </div>

          <h3 className="hab">Habilidades</h3>

          <div className="abilities">
            {pokemonData.abilities.map((element) => (
              <p className="ability" key={element.ability.name}>
                {element.ability.name}
              </p>
            ))}
          </div>
        </>
      )}
    </div>
  );
}

export default App;
