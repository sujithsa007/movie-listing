import React from "react";
import { useSelector } from "react-redux";
import CONSTANTS from "../constants/constants";

const MovieTile = ({ searchTerm }) => {
  const { gridData, loading } = useSelector((state) => state.movieState);
  

  return (
    <div className="scrollable-container">
      <div className="mobile-grid-container">
      {loading  && (
          <div className="loading-overlay">
            <div >
              Loading...
            </div>
          </div>
        )}
        {gridData
          .filter((item) =>
            item.name.toLowerCase().includes(searchTerm.toLowerCase())
          )
          .map((item, index) => (
            <div className="grid-item" key={index}>
              <img
                src={`${CONSTANTS.IMAGEAPI}/${
                  item["poster-image"] !== CONSTANTS.MISSINGIMAGE //edge case handling, if there is no image available, show the placeholder image
                    ? item["poster-image"]
                    : CONSTANTS.PLACEHOLDER
                }`}
                alt={item.name}
              />
              <div className="item-title">{item.name}</div>
            </div>
          ))}
         
      </div>
    </div>
  );
};

export default MovieTile;
