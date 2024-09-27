import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSortAmountUpAlt, faSortAmountDownAlt, faSearch } from '@fortawesome/free-solid-svg-icons';

const LeftBar = ({
  setSearchQuery,
  setSortOrder,
  setSortBy,
  setFilter,
  handleReset,
  allBarrios,
  selectedBarrios,
  setSelectedBarrios,
  searchQuery,
  reformadoFilter,
  setReformadoFilter,
  filter,
  sortBy,
  sortOrder,
  houseCountsByBarrio // Pass in an object mapping barrios to the number of houses
}) => {

  const handleBarrioToggle = (barrio) => {
    if (selectedBarrios.includes(barrio)) {
      setSelectedBarrios(selectedBarrios.filter(selected => selected !== barrio));
    } else {
      setSelectedBarrios([...selectedBarrios, barrio]);
    }
  };

  return (
    <div className="leftie">
      <div>
        <input
          type="text"
          placeholder="Buscar..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
      </div>
      <div>
        <label>Filtrar:</label>
        <select value={filter} onChange={(e) => setFilter(e.target.value)}>
          <option value="all">Todo</option>
          <option value="rent">Alquilar</option>
          <option value="buy">Comprar</option>
        </select>
      </div>

      {/* Sort by and Sort order in one row */}
      <div>
        <label>Ordenar:</label>
        <div className="sort-row">
          <select value={sortBy} onChange={(e) => setSortBy(e.target.value)}>
            <option value="precio">Precio</option>
            <option value="totalArea">Metros</option>
            <option value="totalRooms">Habitaciones</option>
          </select>

          {/* Toggle sort order using Font Awesome icons */}
          <div className="sort-order-icon" onClick={() => setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc')}>
            {sortOrder === 'asc' ? (
              <FontAwesomeIcon icon={faSortAmountUpAlt} size="lg" />
            ) : (
              <FontAwesomeIcon icon={faSortAmountDownAlt} size="lg" />
            )}
          </div>
        </div>
      </div>

      <div>
        <label>Barrios:</label>
        <div className="barrio-list">
          {allBarrios.map((barrio) => (
            <div key={barrio} className="flex items-center barrio-item">
              <input
                type="checkbox"
                checked={selectedBarrios.includes(barrio)}
                onChange={() => handleBarrioToggle(barrio)}
              />
              <label>{barrio ? barrio : 'Sin Ubicacion'} <span className="house-count">[{houseCountsByBarrio[barrio]}]</span></label>
            </div>
          ))}
        </div>
      </div>
      <div>
        <label>Reformado?</label>
        <div className='flex gap-5'>
          <label>
            <input
              type="radio"
              value="all"
              checked={reformadoFilter === 'all'}
              onChange={() => setReformadoFilter('all')}
            />
            All
          </label>
          <label>
            <input
              type="radio"
              value="reformado"
              checked={reformadoFilter === 'reformado'}
              onChange={() => setReformadoFilter('reformado')}
            />
            Yes
          </label>
          <label>
            <input
              type="radio"
              value="sinReformar"
              checked={reformadoFilter === 'sinReformar'}
              onChange={() => setReformadoFilter('sinReformar')}
            />
            No
          </label>
        </div>
      </div>
      <button onClick={handleReset}>Reset</button>
    </div>
  );
};

export default LeftBar;
