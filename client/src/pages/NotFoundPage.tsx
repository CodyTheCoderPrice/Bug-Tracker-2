import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

function NotFoundPage() {
	const navigate = useNavigate();

	useEffect(() => {
		setTimeout(() => {
			navigate('/');
		}, 2000);
	}, []);

	return <h1>404 Not Found</h1>;
}

export default NotFoundPage;
