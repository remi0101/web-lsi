import { createStore } from 'vuex'

const store = createStore({
    state: {
        user: null,
        mails: []
    },
    mutations: {
        setUser(state, user) {
            state.user = user
            console.log(user)
        },
        clearUser(state) {
            state.user = null
        },

        setMails(state, mails) {
            state.mails = mails
        },
        addMail(state, mail) {
            state.mails.push(mail)
        },
        deleteMail(state, mailId) {
            state.mails = state.mails.filter(mail => mail.id !== mailId)
        },
    },
    getters: {
        user: (state) => state.user,
        mails: (state) => state.mails,
        getMailById: (state) => (id) => state.mails.find(mail => mail.id === id)
    },
    actions: {
        updateUser({ commit }, user) {
            commit('setUser', user)
        },
        updateMails({ commit }, mails) {
            commit('setMails', mails)
        },
        addMail({ commit }, mail) {
            commit('addMail', mail)
        },
    }
})

export default store