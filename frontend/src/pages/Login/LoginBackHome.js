import { useNavigate } from 'react-router-dom';
import { useEffect } from 'react';

function LoginBackHome() {
    const history = useNavigate();
    useEffect(() => {
        history(decodeURIComponent("/"));
    }, [history]);
    return (
        <></>
    );
}

export default LoginBackHome;
