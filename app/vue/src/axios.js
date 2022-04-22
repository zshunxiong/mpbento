import axios from 'axios';
// import store from './store';
// import router from './router';
// import { $vfm } from 'vue-final-modal';
// import Dialog from './components/molecules/Dialog';

//定義 axios 中間層，預處理、錯誤、載入中畫面
const API_URL = import.meta.env.DEV ? 'http://localhost:8080' : '';
axios.defaults.baseURL = API_URL + '/API/';
axios.defaults.headers['Content-Type'] = 'application/json';
axios.defaults.headers['X-Requested-With'] = 'XMLHttpRequest';
axios.defaults.headers['Accept'] = 'application/json';

// axios.interceptors.request.use(
//   req => {
//     // log 所有請求
//     console.log(`%c[${req.method.toUpperCase()} ${req.url}]:`, 'color: green; font-weight: bold');
//     console.log(req.params || req.data);
//     // 如果呼叫時給予 NO_LOADING，不做 loading 動畫
//     if (!req.params?.NO_LOADING && !req.data?.NO_LOADING) store.dispatch('triggerLoading', true);
//     // 加入 JWT Token header
//     if (store.state.QR.license?.token) req.headers.Authorization = `Bearer ${store.state.QR.license.token}`;
//     else if (store.state.Month.loginInfo?.token) req.headers.Authorization = `Bearer ${store.state.Month.loginInfo.token}`;
//     return req;
//   },
//   err => {
//     console.log(err);
//     alert(err);
//     throw new Error(err);
//   }
// );

// axios.interceptors.response.use(
//   res => {
//     // log 所有回應
//     console.log(`%c[${res.config.method.toUpperCase()} ${res.config.url}]:`, 'color: blue; font-weight: bold');
//     console.log(res.data);
//     store.dispatch('triggerLoading', false);
//     // 回傳時直接給 data (header等就不給了)
//     return res.data;
//   },
//   err => {
//     store.dispatch('triggerLoading', false);
//     console.log(err);
//     alert(err);
//     throw new Error(err);
//   },
// )

export default axios;
