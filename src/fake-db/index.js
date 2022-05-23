import mock from './mock'

import './data/users/index';
import './data/business-regions/index';
// import './data/auth/index'

mock.onAny().passThrough() // forwards the matched request over network
