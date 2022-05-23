import mock from '@/fake-db/mock'

const data = {
    checkpointReward: {
        userName: 'John',
        progress: '57.6%'
    },
    users: [
        {
            uid: 34,
            displayName: 'Howard Potts',
            password: 'adminadmin',
            photoURL: require('@/assets/images/portrait/small/avatar-s-5.jpg'),
            email: 'admin@admin.com',
            phoneNumber: null
        }
    ]
}

mock.onPost('/api/v1/auth/login').reply((request) => {

});
