import mock from '@/fake-db/mock';

const testRegions = [
    {
        id: 1,
        name: 'BS_Alma'
    },
    {
        id: 2,
        name: 'BS_Chab'
    },
    {
        id: 3,
        name: 'BS_Jeka'
    },
    {
        id: 4,
        name: 'BS_Minsk'
    },
    {
        id: 5,
        name: 'BS_Mosk'
    },
    {
      id: 6,
      name: 'BS_Peter'
    },
    {
      id: 7,
      name: 'BS_Orel'
    },
    {
      id: 8,
      name: 'BS_Tula'
    },
    {
      id: 9,
      name: 'BS_Tver'
    },
    {
      id: 10,
      name: 'BS_Omsk'
    }
];

mock.onGet('/api/v1/business-regions').reply(() => new Promise(((resolve, reject) => {
    setTimeout(() => resolve([200, { data: testRegions }]), 1000);
})));
