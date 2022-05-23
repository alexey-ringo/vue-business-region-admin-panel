import mock from '@/fake-db/mock';

const testUsers = {
    count: 2,
    next: true,
    previous: false,
    results: [
        {
            id: 268,
            username: 'vasya',
            email: 'test@test.com',
            full_name: 'Vasya Pupkin',
            phone_number: '+79211234567',
            address: 'My House',
            role: 1,
            regions: [1, 2, 3, 4, 5, 6, 7, 8],
            is_active: true,
            is_superuser: true,
            is_verified: true
        },
        {
            id: 269,
            username: 'ivan',
            email: 'it-test@test.com',
            full_name: 'Ivan Popov',
            phone_number: '+79119876543',
            address: 'My Home',
            role: 2,
            regions: [1, 2, 3, 8],
            is_active: true,
            is_superuser: false,
            is_verified: true
        },
        {
            id: 270,
            username: 'piter',
            email: 'piter@test.com',
            full_name: 'Piter Petrov',
            phone_number: '+79311324345',
            address: 'My Town',
            role: 1,
            regions: [1, 2, 3, 8],
            is_active: true,
            is_superuser: false,
            is_verified: true

        },
        {
            id: 271,
            username: 'john',
            email: 'john@test.com',
            full_name: 'John D',
            phone_number: '+79211234567',
            address: 'USA',
            role: 2,
            regions: [8],
            is_active: false,
            is_superuser: false,
            is_verified: true
        },
        {
            id: 272,
            username: 'rex',
            email: 'rex@test.com',
            full_name: 'REx S',
            phone_number: '+79119876543',
            address: 'UK',
            role: 3,
            regions: [1, 8],
            is_active: false,
            is_superuser: false,
            is_verified: true
        },
        {
            id: 273,
            username: 'mary',
            email: 'mary@test.com',
            full_name: 'Mary Petrov',
            phone_number: '+79311324345',
            address: 'EC',
            role: 2,
            regions: [6, 7, 8],
            is_active: true,
            is_superuser: false,
            is_verified: true

        },
        {
            id: 274,
            username: 'vasya',
            email: 'test@test.com',
            full_name: 'Vasya Pupkin',
            phone_number: '+79211234567',
            address: 'My House',
            role: 1,
            regions: [1],
            is_active: true,
            is_superuser: false,
            is_verified: true

        },
        {
            id: 275,
            username: 'ivan',
            email: 'it-test@test.com',
            full_name: 'Ivan Popov',
            phone_number: '+79119876543',
            address: 'My Home',
            role: 3,
            regions: [1, 2, 3],
            is_active: true,
            is_superuser: false,
            is_verified: true

        },
        {
            id: 276,
            username: 'piter',
            email: 'piter@test.com',
            full_name: 'Piter Petrov',
            phone_number: '+79311324345',
            address: 'My Town',
            role: 2,
            regions: [2, 4, 6, 8],
            is_active: true,
            is_superuser: false,
            is_verified: true
        },
        {
            id: 277,
            username: 'mikhael',
            email: 'mikhael@test.com',
            full_name: 'Mikhael K',
            phone_number: '+79311324345',
            address: 'My Town',
            role: 1,
            regions: [1, 3, 5, 6, 7],
            is_active: true,
            is_superuser: false,
            is_verified: true
        },
        {
            id: 278,
            username: 'admin',
            email: 'admin@test.com',
            full_name: 'REHAU admin',
            phone_number: '+79111111111',
            address: 'REHAU',
            role: 1,
            regions: [1, 2, 3, 4, 5, 6, 7, 8],
            is_active: true,
            is_superuser: false,
            is_verified: true
      }
    ]
}

const testAuthUser = {
    id: 278,
    username: 'admin',
    email: 'admin@test/com',
    full_name: 'REHAU admin',
    phone_number: '+79111111111',
    address: 'REHAU',
    role: 1,
    is_active: true,
    is_superuser: false,
    is_verified: true
};

const testAuthUserCallCenterEmployee = {
    id: 272,
    username: 'rex',
    email: 'rex@test/com',
    full_name: 'REx S',
    phone_number: '+79119876543',
    address: 'UK',
    role: 3,
    regions: [1, 8],
    is_active: false,
    is_superuser: false,
    is_verified: true
}

const testRoles = [
    {
        id: 1,
        name: 'Администратор',
        code: 'admin'
    },
    {
        id: 2,
        name: 'Сотрудник колл-центра',
        code: 'call_center_employee'
    },
    {
        id: 3,
        name: 'Сотрудник бизнес-региона',
        code: 'business_region_employee'
    }
]

mock.onGet('/api/v1/users').reply((request) => new Promise(((resolve, reject) => {
  setTimeout(() => resolve([200, { data: testUsers }]), 200);
})));

mock.onGet('/api/v1/roles').reply(() => new Promise(((resolve, reject) => {
  setTimeout(() => resolve([200, { data: testRoles }]), 500);
})));

mock.onGet('/api/v1/users/me').reply(() => new Promise(((resolve, reject) => {
  setTimeout(() => resolve([200, { data: testAuthUser }]), 300);
})));

mock.onGet(/\/api\/v1\/users\/\d+/).reply((request) => new Promise(((resolve, reject) => {
  setTimeout(() => {
    const userId = parseInt(request.url.substring(request.url.lastIndexOf('/') + 1), 10);
    const user = testUsers.results.find((u) => u.id === userId);
    const response = user ? [200, { data: JSON.parse(JSON.stringify(user)) }] : [404];
    resolve(response);
    }, 500);
})));
