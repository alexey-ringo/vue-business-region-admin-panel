import Constants from '../../constants/Constants';

export default {
    getPerPage: (state) => state.perPage,
    getPage: (state) => state.page,
    getSorting: (state) => state.sorting,
    getRoles: (state) => state.roles,
    getRole: (state) => (roleId) => state.roles.find((role) => role.id === roleId),
    getAdminRoleId: (state) => {
      const admin = state.roles.find((role) => role.code === Constants.USER_ROLE_CODE.ADMIN);
      return admin ? admin.id : null;
    },
    geRoleByCode: (state) => (code) => state.roles.find((role) => role.code === code),
    getAuthUser: (state) => state.authUser
}
