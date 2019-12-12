import storage from './storage.js'
export function getUser () {
	let c = checkUser();
	if(c && c.nickName) return c;
	uni.getSetting({
		success(e) {
			if(e.authSetting['scope.userInfo']){
				uni.getUserInfo({
					success(e) {
						c = e.userInfo;
						storage.set('__user__',e.userInfo);
					}
				})
			}
		}
	});
	console.log(c);
	return c;
}


export function checkUser () {
	let user = storage.get('__user__',{});
	if(user.nickName) return user;
	return false;
}