import { GetStaticProps, NextPage } from 'next'
import {Grid} from "@nextui-org/react";

import pokeApi from '../api/pokeApi';
import { Layout } from '../components/layouts';
import { PokemontListResponse, SmallPokemon } from '../interfaces';
import { PokemonsCard } from '../components/pokemon';

interface Props {
  pokemons: SmallPokemon[]
}

const HomePage: NextPage<Props> = ({ pokemons }) => {

  return (
    <Layout title="Listado de pokemones">
      <Grid.Container>
        {
          pokemons.map((pokemon) => (
            <PokemonsCard key={pokemon.id} pokemon={pokemon} />
          ))
        }
      </Grid.Container>
    </Layout>
  );
};

export const getStaticProps: GetStaticProps = async (ctx) => {
  const {data} = await pokeApi.get<PokemontListResponse>("/pokemon?limit=151");

  const pokemons: SmallPokemon[] = data.results.map((poke, i) => ({
    ...poke,
    id: i + 1,
    img: `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/dream-world/${
      i + 1
    }.svg`,
  }));

  return {
    props: {
      pokemons,
    },
  };
};

export default HomePage;
