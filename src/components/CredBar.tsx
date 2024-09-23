import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSortAmountUpAlt, faSortAmountDownAlt } from '@fortawesome/free-solid-svg-icons';

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
          placeholder="Search..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
      </div>
      <div>
        <label>Filter by:</label>
        <select value={filter} onChange={(e) => setFilter(e.target.value)}>
          <option value="all">All</option>
          <option value="rent">Rent</option>
          <option value="buy">Buy</option>
        </select>
      </div>

      {/* Sort by and Sort order in one row */}
      <div>
        <label>Sort by:</label>
        <div className="sort-row">
          <select value={sortBy} onChange={(e) => setSortBy(e.target.value)}>
            <option value="precio">Price</option>
            <option value="totalArea">Area</option>
            <option value="totalRooms">Rooms</option>
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
        <label>Filter by Barrio:</label>
        <div className="barrio-list">
          {allBarrios.map((barrio) => (
            <div key={barrio} className="flex items-center barrio-item">
              <input
                type="checkbox"
                checked={selectedBarrios.includes(barrio)}
                onChange={() => handleBarrioToggle(barrio)}
              />
              <label>{barrio} <span className="house-count">[{houseCountsByBarrio[barrio]}]</span></label>
            </div>
          ))}
        </div>
      </div>

      <button onClick={handleReset}>Reset Filters</button>
    </div>
  );
};

export default LeftBar;
