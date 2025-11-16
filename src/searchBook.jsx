import React from "react";
import { useState, useEffect, useRef } from "react";
import { useSearchBooksMutation } from "./Api/bookApi";

function SearchBook({ fetchData,handleSearch }) {
  const [query, setQuery] = useState("");
  const [suggestions, setSuggestions] = useState([]);
  const [showDropdown, setShowDropdown] = useState(false);
  const suppressFetch = useRef(false);

  const[selectedType, setSelectedType] = useState("All");
  

  // Debounce input -----------------------------------
  useEffect(() => {
    const timer = setTimeout(() => {
      if (query.trim() !== "") {
        if (suppressFetch.current) {
          suppressFetch.current = false;
          return;
        }

        fetchData(query,selectedType).then((data) => {
          if (data && data.length > 0) setSuggestions(data);
          else setSuggestions([]);
        });
        setShowDropdown(true);
      } else {
        setSuggestions([]);
      }
    }, 500);

    return () => clearTimeout(timer);
  }, [query, selectedType]);

  const handleSelect = (value) => {
    suppressFetch.current = true;
    setSuggestions([]);
    setQuery(value);
    setShowDropdown(false);
  };

  const searchClicked =  () => {
    suppressFetch.current = true;
    console.log(selectedType)
    handleSearch({type : selectedType, keyword : query});
  }
  return (
    <>
      <select
        className="form-select form-select-lg shadow-sm"
        style={{ maxWidth: "150px" }}
        value={selectedType}
        onChange={(e) => setSelectedType(e.target.value)}
      >
        {/* <option selected>Search By</option>*/}
        <option>All</option> 
        <option>Name</option>
        <option value="AuthorName">Author Name</option>
        <option>Genre</option>
      </select>
      <div style={{ position: "relative", width: "100%" }}>
        <input
          type="text"
          className="form-control form-control-lg shadow-sm"
          placeholder="Search by book name, author, or genre..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />
        {showDropdown && suggestions.length > 0 && (
          <ul
            style={{
              listStyle: "none",
              margin: 0,
              padding: "5px 0",
              position: "absolute",
              top: "100%",
              left: 0,
              right: 0,
              background: "#2b2d31",
              border: "1px solid #ddd",
              borderRadius: "4px",
              maxHeight: "150px",
              overflowY: "auto",
              zIndex: 1000,
              marginTop: "2px",
            }}
          >
            {suggestions.map((item, i) => (
              <li
                key={i}
                style={{
                  padding: "8px",
                  cursor: "pointer",
                }}
                onClick={() => handleSelect(item)}
                onMouseDown={(e) => e.preventDefault()}
              >
                {item}
              </li>
            ))}
          </ul>
        )}
      </div>
      <button className="btn btn-primary btn-lg" onClick={() => searchClicked()}><i className="bi bi-search"></i></button>
    </>
  );
}

export default SearchBook;