//  //  since, "rootReducer" is a collection of all the reducer information

import { combineReducers } from "redux";
import * as hobbySelectorReducer from "./hobbySelector/hobbySelector.reducers";
import * as hobbySelectorReducerRadio from "./hobbySelectorRadio/HobbySelectorRadio.Reducer";
import * as employeeCardReducer from "../redux/employeeCard/employeeCard.reducer";

const rootReducer = combineReducers({
  [hobbySelectorReducer.hobbySelectorFeatureKey]: hobbySelectorReducer.reducer,

  [hobbySelectorReducerRadio.radioHobbyFeatureKey]:
    hobbySelectorReducerRadio.reducer,

  [employeeCardReducer.employeeCardFeatureKey]: employeeCardReducer.reducer,
});

export { rootReducer };
