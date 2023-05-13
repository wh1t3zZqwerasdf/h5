import {auth, hid, logManage, news, org, permission, structure, system, users,activiti,exter,city} from './modules/system';
import * as object from './modules/object.api';
import * as protect from './modules/protect'
import * as regulationsOutlint from './modules/regulationsOutlint.api';

const api = {
    /* system */
    system,
    org,
    permission,
    structure,
    users,
    logManage,
    auth,
    object,
    news,
    hid,
    protect,
    activiti,
    regulationsOutlint,
    exter,
    city
};

export default api;
