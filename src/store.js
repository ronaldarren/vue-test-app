import Vue from 'vue';
import Vuex from 'vuex';
import axios from 'axios';
import firebase from 'firebase';
import router from '@/router';

Vue.use(Vuex);

export default new Vuex.Store({
    state: {
        recipes: [],
        apiUrl: 'https://api.edamam.com/search',
        user: null,
        isAuthenticated: false,
        userRecipes: [],
        snackbar: {
            visible: false,
            text: null,
            timeout: 6000,
            multiline: false
        }
    },
    mutations: {
        setRecipes(state, payload) {
            state.recipes = payload;
        },
        setUser(state, payload) {
            state.user = payload;
        },
        setIsAuthenticated(state, payload) {
            state.isAuthenticated = payload;
        },
        setUserRecipes(state, payload) {
            state.userRecipes = payload;
        },
        showSnackbar(state, payload) {
            state.snackbar.text = payload.text;
            state.snackbar.multiline = payload.text.length > 50 ? true : false;
            if (payload.multiline) {
                state.snackbar.multiline = payload.multiline;
            }

            if (payload.timeout) {
                state.snackbar.timeout = payload.timeout;
            }

            state.snackbar.visible = true;
        },
        closeSnackbar(state) {
            state.snackbar.visible = false;
            state.snackbar.multiline = false;
            state.snackbar.timeout = 6000;
            state.snackbar.text = null;
        }
    },
    actions: {
        async getRecipes({ state, commit }, plan) {
            try {
                let response = await axios.get(`${state.apiUrl}`, {
                    params: {
                        q: plan,
                        app_id: '68b39a14',
                        app_key: '7474a660d59ed8d37ed83597f976c879',
                        from: 0,
                        to: 9
                    }
                });
                commit('setRecipes', response.data.hits);
            } catch (error) {
                commit('setRecipes', []);
            }
        },
        userLogin({ commit }, { email, password }) {
            firebase
                .auth()
                .signInWithEmailAndPassword(email, password)
                .then(user => {
                    commit('setUser', user);
                    commit('setIsAuthenticated', true);
                    router.push('/menu');
                })
                .catch(() => {
                    commit('setUser', null);
                    commit('setIsAuthenticated', false);
                    router.push('/');
                });
        },
        userJoin({ commit }, { email, password }) {
            firebase
                .auth()
                .createUserWithEmailAndPassword(email, password)
                .then(user => {
                    commit('setUser', user);
                    commit('setIsAuthenticated', true);
                    router.push('/menu');
                })
                .catch(() => {
                    commit('setUser', null);
                    commit('setIsAuthenticated', false);
                    router.push('/');
                });
        },
        userSignOut({ commit }) {
            firebase
                .auth()
                .signOut()
                .then(() => {
                    commit('setUser', null);
                    commit('setIsAuthenticated', false);
                    router.push('/');
                })
                .catch(() => {
                    commit('setUser', null);
                    commit('setIsAuthenticated', false);
                    router.push('/');
                });
        },
        addRecipe({ state }, payload) {
            firebase
                .database()
                .ref('users')
                .child(state.user.user.uid)
                .push(payload.recipe.label);
        },
        getUserRecipes({ state, commit }) {
            return firebase
                .database()
                .ref('users/' + state.user.user.uid)
                .once('value', snapshot => {
                    commit('setUserRecipes', snapshot.val());
                });
        }
    },
    getters: {
        isAuthenticated(state) {
            return state.user !== null && state.user !== undefined;
        }
    }
});
