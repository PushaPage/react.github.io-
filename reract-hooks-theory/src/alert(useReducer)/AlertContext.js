import React, { useContext, useState, useReducer } from 'react';

const AlertContext = React.createContext();
// const AlertToggleContext = React.createContext();

export const useAlert = () => {
    return useContext(AlertContext);
};

// export const useAlertToggle = () => {
//     return useContext(AlertToggleContext);
// };

const SHOW_ALERT = 'show';
const HIDE_ALERT = 'hide';

const reducer = (state, action) => {
    switch (action.type) {
        case SHOW_ALERT:
            return { ...state, visible: true, text: action.text };
        case HIDE_ALERT:
            return { ...state, visible: false };
        default:
            return state;
    }
};

export const AlertProvider = ({ children }) => {
    // const [alert, setAlert] = useState(false);

    // const toggle = () => setAlert(prev => !prev);

    const [state, dispatch] = useReducer(reducer, {
        visible: false,
    });

    const show = text => dispatch({ type: SHOW_ALERT, text });
    const hide = () => dispatch({ type: HIDE_ALERT });

    return (
        <AlertContext.Provider
            value={{
                visible: state.visible,
                text: state.text,
                show,
                hide,
            }}
        >
            {/* <AlertToggleContext.Provider value={toggle}>{children}</AlertToggleContext.Provider> */}
            {children}
        </AlertContext.Provider>
    );
};
