import axiosInstance from '@/API';
import { useState } from 'react';

function Test() {
	const [tokenTestOutput, setTokenTestOutput] = useState('');
	const [refreshTestOutput, setRefreshTestOutput] = useState('');

	const handleTestToken = async () => {
		try {
			const response = await axiosInstance.post('/api/v1/auth/test-token');
			setTokenTestOutput(response.data.msg);
		} catch (err: any) {
			setTokenTestOutput(err?.response?.data?.errors?.token);
		}
	};

	const handleTestRefresh = async () => {
		try {
			const response = await axiosInstance.post('/api/v1/auth/refresh');
			setRefreshTestOutput(response.data.msg);
		} catch (err: any) {
			setRefreshTestOutput(err?.response?.data?.errors?.token);
		}
	};

	return (
		<>
			<h1>Tokens</h1>
			<button type='button' onClick={handleTestToken}>
				Test Token
			</button>
			<button type='button' onClick={handleTestRefresh}>
				Test Refresh
			</button>
			<p>{tokenTestOutput}</p>
			<p>{refreshTestOutput}</p>
		</>
	);
}

export default Test;
