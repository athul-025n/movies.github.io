import axios from "axios";
import {FILMS, SEARCHFILMS} from "./constants";

export const searchFilms = (text) => {
  return {
    type :SEARCHFILMS.LOAD_SUCCESS,
    payload:text
  }
}

export const requestFilms = (data,page) => async (dispatch) => {
  dispatch({
    type: FILMS.LOAD,
  });
  try {
    const json = await axios.get("CONTENTLISTINGPAGE-PAGE"+page+".json");
    dispatch({
      type: FILMS.LOAD_SUCCESS,
      filmsData: json.data,
      pageNumber : page,
      isError: false,
    });
  } catch (e) {
    dispatch({
      type: FILMS.LOAD_SUCCESS,
      filmsData: [],
      isError: true,
    });
  }
};