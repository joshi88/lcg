import React, { useState } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import jsonData from './data.json';

function SearchFilter() {
  const [selectedDate, setSelectedDate] = useState(null);
  const [filteredData, setFilteredData] = useState([]);

  const handleDateChange = date => {
    setSelectedDate(date);
    filterData(date);
  };

  const filterData = date => {
    const filtered = jsonData.filter(item => {
      if (date) {
        return item.date === date.toISOString().slice(0, 10);
      }
      return true;
    });
    setFilteredData(filtered);
  };

  return (
    <div>
      <h2>Search Filter</h2>
      <div>
        <label>Select Date:</label>
        <DatePicker
          selected={selectedDate}
          onChange={handleDateChange}
          dateFormat="yyyy-MM-dd"
          placeholderText="Select a date"
        />
      </div>
      <button onClick={() => filterData(selectedDate)}>Search</button>
      <div>
        <h3>Filtered Events</h3>
        <ul>
          {filteredData.map(item => (
            <li key={item.id}>
              {item.title} - {item.date}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default SearchFilter;
import React from 'react';
import SearchFilter from './SearchFilter';

function App() {
  return (
    <div className="App">
      <SearchFilter />
    </div>
  );
}

export default App;


