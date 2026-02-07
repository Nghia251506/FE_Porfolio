import axios from 'axios';

const axiosClient = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL || 'https://api.nghiafullstack.xyz/api',
  headers: {
    'Content-Type': 'application/json',
  }, // Quá 10s là ngắt cho đỡ tốn tài nguyên
});

// Can thiệp vào trước khi gửi Request
axiosClient.interceptors.request.use(
  (config) => {
    // Nếu có token ở localStorage thì đính vào luôn
    const token = typeof window !== 'undefined' ? localStorage.getItem('access_token') : null;
    if (token && config.headers) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Can thiệp vào sau khi nhận Response
axiosClient.interceptors.response.use(
  (response) => {
    // Thường Backend trả về data lồng trong một object, mình bóc tách luôn ở đây
    return response.data;
  },
  (error) => {
    // Xử lý lỗi tập trung
    if (error.response) {
      const { status } = error.response;
      
      if (status === 401) {
        // Ví dụ: Logout hoặc Refresh token nếu hết hạn
        console.error('Hết phiên làm việc rồi con vợ ơi!');
      }
      
      if (status === 500) {
        console.error('Server đang hắt hơi sổ mũi rồi...');
      }
    }
    return Promise.reject(error);
  }
);

export default axiosClient;