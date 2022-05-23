export default {
    SET_USER(state, user) {
        state.user = user
    },
    SET_PER_PAGE(state, perPage) {
        state.perPage = perPage
    },
    SET_SORTING(state, perPage) {
      state.perPage = perPage
    },
    SET_PAGE(state, page) {
        state.page = page;
    },
    SET_ROLES(state, roles) {
        state.roles = roles
    },
    SET_AUTH_USER(state, user) {
        state.authUser = user
    }
}
