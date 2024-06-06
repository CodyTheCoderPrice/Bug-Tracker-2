import { Link } from 'react-router-dom';

function HomePage() {
	return (
		<>
			<Link to='/login' style={{ padding: '0px 30px' }}>
				Login
			</Link>
			<p style={{ padding: '0px 30px' }}>Explain details about website...</p>
		</>
	);
}

export default HomePage;
