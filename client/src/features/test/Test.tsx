import api from '@/services/api';
import { useState } from 'react';

function Test() {
	const [tokenTestOutput, setTokenTestOutput] = useState('');
	const [refreshTestOutput, setRefreshTestOutput] = useState('');

	const handleTestToken = async () => {
		try {
			const response = await api.post('/api/v1/auth/test-token', '', {
				withCredentials: true,
			});
			setTokenTestOutput(response.data.msg);
		} catch (err: any) {
			setTokenTestOutput(err?.response?.data?.errors?.token);
		}
	};

	const handleTestRefresh = async () => {
		try {
			const response = await api.post('/api/v1/auth/refresh', '', {
				withCredentials: true,
			});
			setRefreshTestOutput(response.data.msg);
		} catch (err: any) {
			setRefreshTestOutput(err?.response?.data?.errors?.token);
		}
	};

	return (
		<div style={{ paddingTop: '20px' }}>
			<button type='button' onClick={handleTestToken}>
				Test Token
			</button>
			<button type='button' onClick={handleTestRefresh}>
				Test Refresh
			</button>
			<p>{tokenTestOutput}</p>
			<p>{refreshTestOutput}</p>
		</div>
	);
}

export default Test;
