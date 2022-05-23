import Vue from 'vue';
import VueRouter from 'vue-router';
import $store from '@/store/index';

Vue.use(VueRouter);

const routes = [
    {
    // =============================================================================
    // MAIN LAYOUT ROUTES
    // =============================================================================
        path: '',
        component: () => import('@/layouts/Main.vue'),
        children: [
            {
                path: '/',
                redirect: '/users'
            },
            {
                path: '/users',
                name: 'users-list',
                component: () => import('@/pages/user/Users.vue')
            },
            {
                path: '/users/create',
                name: 'user-create',
                component: () => import('@/pages/user/UserCreate.vue')
            },
            {
                path: '/users/:userId',
                name: 'user-edit',
                component: () => import('@/pages/user/UserEdit.vue')
            },
            {
                path: '/partners',
                name: 'partners-list',
                component: () => import('@/pages/partner/Partners.vue')
            },
            {
              path: '/objects',
              name: 'objects-list',
              component: () => import('@/pages/object/Objects.vue')
            },
            {
              path: '/objects/create',
              name: 'object-create',
              component: () => import('@/pages/object/ObjectCreate.vue')
            }
        ]
    },
    // =============================================================================
    // FULL PAGE LAYOUTS
    // =============================================================================
    {
        path: '',
        component: () => import('@/layouts/FullPage.vue'),
        children: [
            // =============================================================================
            // PAGES
            // =============================================================================

            {
                path: '/login',
                name: 'page-login',
                component: () => import('@/pages/auth/Login.vue'),
                meta: {
                    rule: 'editor'
                }
            },
            {
                path: '/reset-password',
                name: 'page-reset-password',
                component: () => import('@/pages/auth/ResetPassword.vue'),
                meta: {
                    rule: 'editor'
                }
            }
            // {
            //     path: '/pages/error-404',
            //     name: 'page-error-404',
            //     component: () => import('@/views/pages/Error404.vue'),
            //     meta: {
            //         rule: 'editor'
            //     }
            // },
            // {
            //     path: '/pages/error-500',
            //     name: 'page-error-500',
            //     component: () => import('@/views/pages/Error500.vue'),
            //     meta: {
            //         rule: 'editor'
            //     }
            // },
        ]
    }
];

const router = new VueRouter({
    mode: 'history',
    base: process.env.BASE_URL,
    routes
});

const routesGuard = (to, from, next, authUser, isAdmin) => {
    if (to.name !== 'page-login' && !authUser) {
      next({ path: 'login' });
    } else if (to.name === 'page-login' && authUser) {
      next({ path: 'users' });
    } else if (to.name === 'user-edit' && !isAdmin && parseInt(to.params.userId, 10) !== parseInt(authUser.id, 10)) {
      next({ name: 'users-list' });
    } else if (to.name === 'user-create' && !isAdmin) {
      next({ name: 'users-list' });
    } else {
      next();
    }
};

router.beforeEach(async (to, from, next) => {
    let authUser = $store.getters['user/getAuthUser'];
    if (!authUser) {
      await $store.dispatch('user/fetchAuthUser');
      authUser = $store.getters['user/getAuthUser'];
    }
    let adminRoleId = $store.getters['user/getAdminRoleId'];
    if (typeof adminRoleId !== 'number') {
      await $store.dispatch('user/fetchRoles');
      adminRoleId = $store.getters['user/getAdminRoleId'];
    }
    routesGuard(to, from, next, authUser, authUser.role === adminRoleId);
});

export default router;
