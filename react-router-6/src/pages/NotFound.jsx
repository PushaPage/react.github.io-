import { Link } from 'react-router-dom';
import AnimatedWrap from '../components/AnimatedWrap';

const NotFound = () => {
    return (
        <AnimatedWrap>
            <h1>
                This page doesn't exist. Go <Link to="/">Home</Link>
            </h1>
        </AnimatedWrap>
    );
};

export default NotFound;
