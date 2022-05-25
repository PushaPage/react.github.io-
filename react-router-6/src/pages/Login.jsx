import { useLocation, useNavigate } from 'react-router-dom';
import { useAuth } from '../hook/useAuth';
import AnimatedWrap from '../components/AnimatedWrap';

const Login = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const { signIn } = useAuth();

    const fromPage = location.state?.from?.pathname || '/';

    const handleSubmit = e => {
        e.preventDefault();
        const form = e.target;
        const user = form.username;
        signIn(user, () => navigate(fromPage, { replace: true }));
    };

    return (
        <AnimatedWrap>
            <h1>Login page</h1>
            <form className="form mx-auto" autoComplete="off" onSubmit={handleSubmit}>
                <fieldset>
                    <legend>Sign In</legend>
                    <input type="text" className="form-control" name="username" />
                    <div className="mt-10 text-center">
                        <button type="submit" className="btn btn-dark">
                            Login
                        </button>
                    </div>
                </fieldset>
            </form>
        </AnimatedWrap>
    );
};

export default Login;
