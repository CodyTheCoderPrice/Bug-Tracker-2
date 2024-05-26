import { Provider } from 'react-redux';
import { store } from './store';
import Login from '@/features/auth/Login';
import Test from '@/features/test/Test';

function App() {
	return (
		<Provider store={store}>
			<Login />
			<Test />
		</Provider>
	);
}

export default App;
