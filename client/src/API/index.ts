import axios from 'axios';

const axiosInstance = axios.create({
	baseURL: import.meta.env.REACT_APP_BASE_URL || 'http://localhost:5000',
	withCredentials: true,
});

axiosInstance.interceptors.response.use(
	(res) => {
		return res;
	},
	async (err) => {
		const config = err.config;

		if (err.response.data.log) {
			console.log(err.response.data.log);
		}

		// Access Token was expired
		if (err.response.data.needRefresh) {
			try {
				console.log('Token needs refreshing');
				await axiosInstance.post('/api/v1/auth/refresh');
				console.log('Token refreshed');
				return axiosInstance(config);
			} catch (_err: any) {
				return Promise.reject(_err);
			}
		}

		return Promise.reject(err);
	}
);

export default axiosInstance;
