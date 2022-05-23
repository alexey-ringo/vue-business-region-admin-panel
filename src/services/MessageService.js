import { Message } from 'element-ui';
import Service from './Service';

export default class MessageService extends Service {
    constructor(name = 'MessageService', namespace = null, ...args) {
        super(name, namespace);
    }

    error(message) {
        Message.error({
            message,
            customClass: 'message'
        });
    }

    warning(message) {
        Message.warning({
            message,
            customClass: 'message'
        });
    }

    success(message) {
        Message.success({
            message,
            customClass: 'message'
        });
    }
}
