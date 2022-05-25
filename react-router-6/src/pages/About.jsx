import { Outlet, Route, Routes, Link } from 'react-router-dom';
import AnimatedWrap from '../components/AnimatedWrap';

const About = () => {
    return (
        <AnimatedWrap>
            <h1>About us</h1>
            <ul>
                <li>
                    <Link to={'contacts'}>Contacts</Link>
                </li>
                <li>
                    <Link to={'team'}>Team</Link>
                </li>
                <li>
                    <Link to={'team-again'}>Team Again</Link>
                </li>
            </ul>
            <Routes>
                <Route path={'contacts'} element={<p>Our contacts</p>} />
                <Route path={'team'} element={<p>Our team</p>} />
            </Routes>
            <Outlet />
        </AnimatedWrap>
    );
};

export default About;
