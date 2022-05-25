import PropTypes from 'prop-types';
import clsx from 'clsx';
import classes from './Spinner.module.css';

const Spinner = ({ fullScreen = true, additionalClasses = '' }) => {
    return (
        <div className={clsx(classes.spinnerWrap, fullScreen && classes.fullScreen, additionalClasses)}>
            <span className={classes.spinner} />
        </div>
    );
};

Spinner.propTypes = {
    fullScreen: PropTypes.bool,
    additionalClasses: PropTypes.string,
};

export default Spinner;
