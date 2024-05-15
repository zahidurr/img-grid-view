import React, { useEffect, useState } from "react";
import jsonData from "./data.json";

interface IData {
  title: string;
  description: string;
  imagePath: string;
}

const ITEMS_PER_PAGE = 6;

const GridView: React.FC = () => {
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [data, setData] = useState<IData[]>([]);
  const [filteredData, setFilteredData] = useState<IData[]>([]);

  useEffect(() => {
    setData(jsonData);
  }, []);

  useEffect(() => {
    const filtered = data.filter((item) =>
      item.title.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilteredData(filtered);
    setCurrentPage(1);
  }, [searchTerm, data]);

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
  };

  const handlePagination = (pageNumber: number) => {
    setCurrentPage(pageNumber);
  };

  const indexOfLastItem = currentPage * ITEMS_PER_PAGE;
  const indexOfFirstItem = indexOfLastItem - ITEMS_PER_PAGE;
  const currentItems = filteredData.slice(indexOfFirstItem, indexOfLastItem);

  return (
    <div>
      <div className="search-container">
        <input
          className="search-input"
          type="text"
          placeholder="Search..."
          value={searchTerm}
          onChange={handleSearch}
          aria-label="Search"
        />
      </div>
      <div className="grid-container">
        {currentItems.map((item, index) => (
          <div key={index} className="grid-item">
            <img src={item.imagePath} alt={item.title} />
            <p>{item.title}</p>
          </div>
        ))}
      </div>
      {filteredData.length === 0 && (
        <div className="no-results">No results found.</div>
      )}
      <div className="pagination">
        {Array.from({
          length: Math.ceil(filteredData.length / ITEMS_PER_PAGE),
        }).map((_, index) => (
          <button
            key={index}
            className="pagination-button"
            onClick={() => handlePagination(index + 1)}
          >
            {index + 1}
          </button>
        ))}
      </div>
    </div>
  );
};

export default GridView;
