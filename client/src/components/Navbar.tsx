import { NavLink } from 'react-router-dom';

function Navbar() {
	return (
		<nav
			style={{
				display: 'flex',
				alignItems: 'center',
				justifyContent: 'center',
			}}
		>
			<NavLink to='/account' style={{ padding: '0px 30px' }}>
				Account
			</NavLink>
			<NavLink to='/projects' style={{ padding: '0px 30px' }}>
				Projects
			</NavLink>
			<NavLink to='/bugs' style={{ padding: '0px 30px' }}>
				Bugs
			</NavLink>
			<NavLink to='/comments' style={{ padding: '0px 30px' }}>
				Comments
			</NavLink>
		</nav>
	);
}

export default Navbar;
