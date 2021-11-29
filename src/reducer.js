import {FILMS, SEARCHFILMS} from "./constants";

const initalState = {
    filmsData: [],
    searchText:'',
    isLoading: false,
    isError: false,
};

const reducer = (state = initalState, action) => {
  switch (action.type) {
    case FILMS.LOAD:
      return {
        ...state,
        isLoading: true,
        isError: false,
      };
    case FILMS.LOAD_SUCCESS:
      let data=[]
      if(action.pageNumber == 1  ){
        data = action.filmsData[0].page['content-items']['content']
      }else if(action.pageNumber>1){
        data = action.filmsData['page']['content-items']['content']
      }
      return {
        ...state,
        filmsData: state.filmsData.concat(data),
        isLoading: false,
      };
    case SEARCHFILMS.LOAD_SUCCESS:
      return{
        ...state,
        searchText: action.payload,
        isLoading: false,
      }
    default:
      return state;
  }
};

export default reducer;