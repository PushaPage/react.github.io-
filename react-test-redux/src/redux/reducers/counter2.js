import { ADD2 } from '../actions/actionsTypes';

const initialState = {
    counter2: 200,
};

export default function counter2(state = initialState, action) {
    console.log(action);
    switch (action.type) {
        case ADD2:
            return {
                counter2: state.counter2 + action.payload,
            };

        default:
            return state;
    }
}
