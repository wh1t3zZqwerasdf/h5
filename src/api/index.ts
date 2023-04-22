import {
	system,
	org,
	structure,
	users,
	logManage,
	permission,
	auth,
	news,
	hid,
} from './modules/system';
import * as object from './modules/object.api';

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
};

export default api;
