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

		// Access Token was expired
		if (err.response.data.needRefresh) {
			try {
				const rs = await axiosInstance.post('/api/v1/auth/refresh');
				console.log(rs?.data?.msg);
				return axiosInstance(config);
			} catch (_err: any) {
				return Promise.reject(_err);
			}
		}

		return Promise.reject(err);
	}
);

export default axiosInstance;
