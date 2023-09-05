import React, { useState } from 'react';

function YourComponent() {
  const [typedText, setTypedText] = useState('');
  // Assume you have caterizedData as your data source

  const inputHandler = (e) => {
    setTypedText(e.target.value);
  };

  return (
    <div>
      <input
        type="text"
        placeholder="Search by category or title"
        value={typedText}
        onChange={inputHandler}
      />
      
      {Object.entries(caterizedData).map(([category, items]) => {
        const filteredItems = items.filter((item) =>
          item.title.toLowerCase().includes(typedText.toLowerCase())
        );

        return (
          <div key={category}>
            <h2>{category}</h2>
            {filteredItems.length === 0 ? (
              <p>No data found for this category.</p>
            ) : (
              filteredItems.map((item) => (
                <div key={item.id}>
                  <img src="slider.png" alt={item.title} />
                </div>
              ))
            )}
          </div>
        );
      })}
    </div>
  );
}

export default YourComponent;
