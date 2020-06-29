import { createStore, combineReducers } from 'redux';
import { Dishes} from './dishes';
import { Comments} from './comments';
import { Leaders} from './leaders';
import { Promotions} from './promotions';
import { DISHES } from '../shared/dishes';


export const ConfigureStore = () => {
 const store =createStore(
  combineReducers({
   dishes : Dishes,
   comments : Comments,
   promotions: Promotions,
   leaders:Leaders
  })
 );

 return store;
}