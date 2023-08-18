/* eslint-disable react-hooks/exhaustive-deps */
/*
This is a custom hook created to perfrom API operations within this application
*/
import { useCallback } from "react";
import axios from "axios";
import { useSelector } from "react-redux";
import {
  updateData,
  setLoading,
  setCurrentPage,
  setPageTitle,
} from "../redux/movieSlice";

const useFetch = (dispatch, CONSTANTS) => {
  const { gridData } = useSelector((state) => state.movieState);

  return useCallback(
    (pageNum) => {
      dispatch(setLoading(true));
      axios
        .get(`${CONSTANTS.DATAAPI}/page${pageNum}.json`)
        .then((response) => {
          const responseData = response.data.page["content-items"].content;

          const newData = responseData.filter(
            (newItem) => !gridData.some((item) => item.name === newItem.name)
          );

          dispatch(updateData(newData));
          dispatch(setLoading(false));
          dispatch(setPageTitle(response.data.page["title"]));
          dispatch(setCurrentPage(pageNum));
        })
        .catch((error) => {
          console.error("Error fetching data:", error);
          dispatch(setLoading(false));
        });
    },
    [dispatch]
  );
};

export default useFetch;
