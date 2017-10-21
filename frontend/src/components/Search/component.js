import React from 'react';
import './styles.css';

const FullTextInput = ({ search = {}, updateSearch }) => (
  <form className="Search__FullTextInput" onSubmit={evt => evt.preventDefault() }>
    <input
      type="text"
      value={search.text || ''}
      placeholder="Buscar Paradas"
      onChange={(evt) => {
        evt.preventDefault();
        updateSearch({ text: evt.target.value });
      }}
    />
  </form>
);

const Toggle = ({ active, toggle }) => (
  <div className="Search__Toggle">
    <a
      href="#toggleAdvancedSearch"
      onClick={(evt) => {
        evt.preventDefault();
        toggle();
      }}
    >Búsqueda Avanzada { active ? '⏶' : '⏷' }</a>
  </div>
);

const AdvancedSearch = ({ search = {}, center = {}, updateSearch }) => {
  const { lat, lng } = center;
  const { radiusInMeters } = search;

  return (
    <form
      className="Search__AdvancedSearch"
      onSubmit={evt => evt.preventDefault()}
    >
      <label>
        <span>Latitud:</span>
        <input type="text" disabled={true} value={lat} />
      </label>
      <label>
        <span>Longitud:</span>
        <input type="text" disabled={true} value={lng} />
      </label>
      <label>
        <span>Radio (metros):</span>
        <input
          type="text"
          value={radiusInMeters || ''}
          onChange={(evt) => {
            evt.preventDefault();
            const radius = parseInt(evt.target.value, 10);
            if (radius > 0) {
              updateSearch({ radiusInMeters: evt.target.value });
            }
          }}
        />
      </label>
    </form>
  );
}

const SearchComponent = (props) => {
  const {
    search, center, advancedSearchActive, updateSearch, toggleAdvancedSearch,
  } = props;
  return (
    <div className="Search">
      <FullTextInput search={search} updateSearch={updateSearch} />
      <Toggle active={advancedSearchActive} toggle={toggleAdvancedSearch} />
      {
        advancedSearchActive ?
          <AdvancedSearch
            search={search}
            center={center}
            updateSearch={updateSearch}
          />
          : null
      }
    </div>
  )
};

export default SearchComponent;
