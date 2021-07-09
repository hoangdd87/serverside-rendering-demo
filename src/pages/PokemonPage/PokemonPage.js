import React from 'react';
import { useSelector } from 'react-redux';
import { pokemonDetailSelectors } from '../../redux/selectors';
import { Typography } from '@material-ui/core';
import { Helmet } from 'react-helmet-async';

const PokemonPage = () => {
  const pokemon = useSelector(pokemonDetailSelectors.selectEntity);
  const loading = useSelector(pokemonDetailSelectors.selectLoading);
  const error = useSelector(pokemonDetailSelectors.selectError);
  if (loading==='pending') return <h1>Loading</h1>;
  if (error) return <h3 style={ { color: 'red' } }> { error } </h3>
  if (pokemon!==null) {
    const { height, weight, name, sprites } = pokemon;
    return (
      <div className="container">
        <Helmet>
          <title>{ pokemon.name }</title>
            <meta property="og:title" content={`Pokemon Detail page - ${name}`}/>
            <meta property="og:description" content={`Server-side rendering for create react app. Pokemon detail: ${name}`}/>
            <meta property="og:image" content = { sprites.front_default }/>
            <meta name="twitter:card" content={`Server-side rendering for create react app. Pokemon detail: ${name}`}/>
            <meta property="og:site_name" content="Server-side rendering for create react app"/>
        </Helmet>
        <Typography>ID: { name }</Typography>
        <Typography>Height: { height }</Typography>
        <Typography>Weight: { weight }</Typography>
        <Typography>Name: { name }</Typography>
        <img src={ sprites.front_default } alt="Front default pokemon"/>
        <img src={ sprites.back_default } alt="Back default pokemon"/>
      </div>
    );
  }
  return null;
};

export default PokemonPage;
