export default {
	get (key,def=[]) {
		const ret = uni.getStorageSync(key);
		return ret || def; 
	},
	set (key,value) {
		return uni.setStorageSync(key,value); 
	}
}  