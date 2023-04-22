import { UserType } from '../types/UserType';

function getUserInfo(): UserType {
	const userInfoStr = window.localStorage.getItem('userInfo');
	let userType: UserType = { userInfo: {}, orgInfo: {}, token: '' };
	if (userInfoStr) {
		userType = JSON.parse(userInfoStr);
	}
	return userType;
}

function saveUserInfo(userType: UserType) {
	console.log(userType);
	window.localStorage.setItem('userInfo', JSON.stringify(userType));
}

export default { saveUserInfo, getUserInfo };
