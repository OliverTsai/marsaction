import axios from 'axios';

// 定義你的API基礎URL
const BASE_URL = 'http://interface.bet007.com/football';

// 創建一個Axios實例
const api = axios.create({
    baseURL: BASE_URL,
});

// 添加密鑰
const API_KEY = '4F85B2B3E6B54006';

// 定義一個函數來獲取今日的足球數據
export const getTodayFootballData = () => {
    return api.get('/today.aspx?', {
        params: {
            key: API_KEY
        }
    });
};