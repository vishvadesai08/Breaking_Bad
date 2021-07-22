import {FlowActions} from '../../navigations/FlowActions';
import {ADD_FAVOURITE} from '../reducer/type';
var favData = [];
export const addFavourite = data => {
  console.log('SOCIAL_LOGIN', data);
  //favData.push(data);
  return {
    type: ADD_FAVOURITE,
    payload: data,
  };
};
