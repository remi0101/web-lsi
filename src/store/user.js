import { createStore } from 'vuex'

const store = createStore({
    state: {
        user: null
    },
    mutations: {
        setUser(state, user) {
            state.user = user
            console.log(user)
        },
        clearUser(state) {
            state.user = null
        }
    },
    getters: {
        user: (state) => state.user
    },
    actions: {
        updateUser({ commit }, user) {
            commit('setUser', user)
        }
    }
})

export default store
