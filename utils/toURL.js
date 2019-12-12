import config from '../config.js'
import md5 from "./md5.js"
const reg = new RegExp(/[a-zA-Z]*/g);

export default function toURL(options) {
	let {query, from = 'auto', to = 'en'} = options;
	let salt = Date.now();
	
	let sign = md5(config.appid+query+salt+config.key);
	// let encodeQuery = reg.test(query) ? query : encodeURI(query).replace('/%0A/g','');
	let encodeQuery = encodeURI(query);
	let URL = `https://api.fanyi.baidu.com/api/trans/vip/translate?q=${encodeQuery}&from=${from}&to=${to}&appid=${config.appid}&salt=${salt}&sign=${sign}`;
	return URL;
}   