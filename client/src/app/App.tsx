import { Provider } from 'react-redux';
import { store } from './store';
import { Login } from '@/features/auth/Login';

function App() {
	return (
		<Provider store={store}>
			<Login />
		</Provider>
	);
}

export default App;