
export default function request (opt) {
	return new Promise((resolve, reject) => {
		uni.request({
			url: opt.url,
			data: opt.params || {},
			method: opt.type || 'GET',
			success: (res) => {
				// console.log(res);
				resolve(res);
			},
			fail: (res) => {
				// console.log(res);
				reject(res);
			}
		})
	})
}
