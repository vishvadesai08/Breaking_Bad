import {act} from 'react-test-renderer';
import {ADD_FAVOURITE} from '../reducer/type';

const initialState = {
  favouriteData: [],
};

const FavouriteReducer = (state = initialState, action) => {
  console.log('ACTION DATA', ...state.favouriteData);

  console.log('ACTION DATA PAyload', action.payload);

  switch (action.type) {
    case ADD_FAVOURITE:
      return {
        ...state,
        //favouriteData: action.payload,
        favouriteData: [...state.favouriteData, action.payload],
      };

    default:
      return state;
  }
};

export default FavouriteReducer;
