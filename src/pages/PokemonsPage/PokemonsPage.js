import React, { useEffect, useMemo, useState } from 'react';
import { Link, useLocation, useHistory } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { pokemonsSelectors } from '../../redux/selectors';
import Table from '../../shared/components/Table/MyTable';
import HighLightSearchText from '../../shared/components/HightLightSearchText/HighLightSearchText';
import { makeStyles, TablePagination, TextField } from '@material-ui/core';
import { Helmet } from 'react-helmet-async';

const getColumns = searchText => [
  {
    id: '1',
    title: 'Name',
    render: content => (
      <HighLightSearchText
        text={ content.name }
        highlight={ searchText }
      />
    )
  },
  {
    id: '2',
    title: 'Detail URL',
    render: content => <Link className="link" to={ `/pokemons/${ content.id }` }>View detail</Link>
  }
];

const useStyles = makeStyles({
  input: {
    flex: 1,
    margin: '15px 0'
  },
});

const PokemonsPage = () => {
  const classes = useStyles();
  const location = useLocation();
  const history = useHistory();
  
  const query = new URLSearchParams(location.search);
  const page = parseInt(query.get('page')) || 0;
  const perPage = parseInt(query.get('perPage')) || 20;
  
  const [inputValue, setInputValue] = useState('');
  const [textSearch, setTextSearch] = useState('');
  
  const pokemons = useSelector(pokemonsSelectors.selectAll);
  const counts = useSelector(pokemonsSelectors.selectCount);
  const loading = useSelector(pokemonsSelectors.selectLoading);
  
  const rows = useMemo(() => pokemons.map(pokemon => ({
    id: pokemon.name,
    name: pokemon.name,
    url: pokemon.url
  })), [pokemons]);
  
  const rowsFiltered = useMemo(() =>
    rows.filter(row => row.name.toLowerCase().includes(textSearch.toLowerCase())), [rows, textSearch]);
  
  useEffect(() => {
    const delay = setTimeout(() => {
      setTextSearch(inputValue)
    }, 250);
    return () => {
      clearTimeout(delay);
    }
  }, [inputValue]);
  
  const totalPages = counts;
  
  const changePage = (event, newPage) => history.push(`pokemons?page=${ newPage }&perPage=${ perPage }`);
  
  const changePerPage = event => {
    const newPerPage = parseInt(event.target.value, 10);
    history.push(`pokemons?page=0&perPage=${ newPerPage }`)
  };
  
  const columns = useMemo(() => getColumns(textSearch), [textSearch]);
  
  return (
    <div className="pokemonsPage">
      <Helmet>
        <title>Pokemons List</title>
      </Helmet>
      <TextField
        className={ classes.input }
        placeholder="Filter on the current page..."
        variant="outlined"
        value={ inputValue }
        onChange={ evt => setInputValue(evt.target.value) }
      />
      <Table
        rows={ rowsFiltered }
        columns={ columns }
        isLoading={ loading === 'pending' }
      />
      { totalPages > 0 && (
        <TablePagination
          rowsPerPageOptions={ [10, 20, 40] }
          component="div"
          count={ totalPages }
          rowsPerPage={ perPage }
          page={ page }
          onChangePage={ changePage }
          onChangeRowsPerPage={ changePerPage }
        />) }
    </div>
  );
};

export default PokemonsPage;
