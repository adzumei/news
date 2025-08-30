import { API_URL } from '../api/axiosApi';

export const getImageUrl = (imagePath: string | null): string => {
    if (!imagePath) {
        return 'https://cdn-icons-png.flaticon.com/512/1042/1042731.png';
    }
    
    if (imagePath.startsWith('http')) {
        return imagePath;
    }
    
    return `${API_URL}${imagePath}`;
};
