import * as ActionTypes from './ActionTypes';

export const Feedbacks = (state = {
    errMess : null,
    feedbacks: []
}, action) => {
    switch (action.type) {
        case ActionTypes.ADD_FEEDBACK:
            var feedback = action.payload;
            return {...state, feedbacks: state.feedbacks.concat(feedback)};

            // ---returning the data to localhost:3001/feedback ????

        default:
          return state;
      }
};