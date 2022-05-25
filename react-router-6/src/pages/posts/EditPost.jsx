import { useParams, useNavigate } from 'react-router-dom';
import AnimatedWrap from '../../components/AnimatedWrap';

const EditPost = () => {
    const { id } = useParams();
    const navigate = useNavigate();

    const goBack = () => navigate(-1);
    return (
        <AnimatedWrap>
            <div className="container">
                <h1>Edit post {id}</h1>
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="svg-link"
                    onClick={goBack}
                    width={20}
                    height={20}
                    viewBox="0 0 512 512"
                >
                    <path d="M9.375 233.4l128-128c12.5-12.5 32.75-12.5 45.25 0s12.5 32.75 0 45.25L109.3 224H480c17.69 0 32 14.31 32 32s-14.31 32-32 32H109.3l73.38 73.38c12.5 12.5 12.5 32.75 0 45.25c-12.49 12.49-32.74 12.51-45.25 0l-128-128C-3.125 266.1-3.125 245.9 9.375 233.4z" />
                </svg>
            </div>
        </AnimatedWrap>
    );
};

export default EditPost;
