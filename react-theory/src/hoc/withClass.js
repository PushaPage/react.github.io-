import React from 'react';

const withClass = (Component, className) => {
    console.log(className);
    return props => (
        <div className={className}>
            <Component {...props} />
        </div>
    );
};

export default withClass;
