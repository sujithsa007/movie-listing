/* eslint-disable react-hooks/exhaustive-deps */
/*
This component lists the movie tiles in grid view, with three tiles per row. Styling has been done only for 
mobile portrait view
*/

import "../styles/movieGridStyle.css";
import React, { useState, useEffect } from "react";
import useFetch from "../custom_hook/useFetch";
import CONSTANTS from "../constants/constants";
import { setCurrentPage } from "../redux/movieSlice";
import { useSelector, useDispatch } from "react-redux";

import MovieTile from "./movieTile";

const MovieList = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [isSearchActive, setIsSearchActive] = useState(false);
  const totalPages = 3;

  const { loading, currentPage, pageTitle } = useSelector(
    (state) => state.movieState
  );
  const dispatch = useDispatch();
  const fetchData = useFetch(dispatch, CONSTANTS); // calling custom hook

  /*
  Loads page1.json initially, and then page2.json & page3.json on scroll completion
  */
  useEffect(() => {
    if (currentPage <= totalPages) {
      fetchData(currentPage);
    }
  }, [currentPage]);

  /*For lazy loading, addEventListener listens for scroll and on scrolling will trigger handleScroll method, which checks for the scroll
  completion, upon which page number is iterated. Since pageNumber is a dependency for the fetchData's useEffect, the data is fetched with 
  the updated page number and shown on the screen
  */
  useEffect(() => {
    const handleScroll = () => {
      if (
        window.innerHeight + Math.floor(window.scrollY) >=
          document.body.scrollHeight - 1 &&
        !loading &&
        currentPage < totalPages
      ) {
        dispatch(setCurrentPage(currentPage + 1));
      }
      
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [currentPage, dispatch, loading]);

  return (
    <div>
      <div className="nav-bar">
        <img
          src={`${CONSTANTS.IMAGEAPI}/Back.png`}
          alt="Back"
          className="back-button"
        />
        {isSearchActive ? (
          <input
            type="text"
            placeholder="Search..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="search-input"
          />
        ) : (
          <div className="page-title">{pageTitle}</div>
        )}
        <img
          src={`${CONSTANTS.IMAGEAPI}/search.png`}
          alt="Search"
          className="search-button"
          onClick={() => setIsSearchActive(!isSearchActive)}
        />
      </div>
      <MovieTile searchTerm={searchTerm} />
    </div>
  );
};

export default MovieList;
