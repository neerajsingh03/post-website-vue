import { createStore } from 'vuex';
import Cookies from 'js-cookie';
const store = createStore ({
    state: {
        token: Cookies.get('token') ? Cookies.get('token') : null,
        role:Cookies.get('role')  || null,
        userId: Cookies.get('userId') || null,
    },
    mutations: {
        setToken(state,token){
            state.token = token;
            Cookies.set('token', token, { secure: true, sameSite: 'Strict', expires: 1 });
        },
        removeToken(state){
            state.token = null;
            state.role = null;
            Cookies.remove('token');
            Cookies.remove('role');
        },
        checkRole(state,role){
            state.role = role;
            Cookies.set('role',role,  { secure: true, sameSite: 'Strict', expires: 1 })
        },
        userId(state,userId){
            state.userId = userId;
            Cookies.set('userId',userId, { secure: true, sameSite: 'Strict', expires: 1 })
        }
    },
    actions: {
        login({commit},{token,role,userId}){
            commit('setToken',token);
            commit('checkRole',role);
            commit('userId', userId);
        },
        logout({commit}){
            commit('removeToken');
        },
        // role({commit},role){
        //     Cookies.set('role',role,  { secure: true, sameSite: 'Strict', expires: 1 })
        //     commit('checkRole',role);
        // }
    },
    getters: {
        getToken:(state) => state.token,
        getRole: (state) => state.role,
        getUserId: (state) => state.userId,
    },

})
export default store;
