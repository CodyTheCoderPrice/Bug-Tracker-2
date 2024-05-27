import { Provider } from 'react-redux';
import { store } from './store';
import Login from '@/features/auth/Login';
import Register from '@/features/register/Register';
import Test from '@/features/test/Test';

function App() {
	return (
		<Provider store={store}>
			<Register />
			<Login />
			<Test />
		</Provider>
	);
}

export default App;
