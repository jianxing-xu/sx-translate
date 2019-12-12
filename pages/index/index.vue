<template>
	<view class="content">
		<view class="title">
			<h2 class="text">随心翻译</h2>
			<p>SXTRANSLATION</p>
		</view>
		<view class="query">
			<textarea v-model="query" :maxlength="150" :adjust-position="false" placeholder="输入您要翻译的文字或句子" />

			<i v-show="query.trim()" @click="clearQuery" class="iconfont icon-close"></i>
			
		</view>
		<view class="language-pick">
			<view class="pick">
				<picker class="originLang" mode="selector" :range="langkeys" range-key="value" value="0" @change="changeOrigin">
					<view>{{originLang.value}}</view>
				</picker>
				<span class="reverseLang iconfont icon-zhuanhuan" @touchstart="reverseLang">
					<!-- <i class="iconfont icon-zhuanhuan"></i> -->
				</span>
				<picker class="targetLang" mode="selector" :range="langkeys" range-key="value" value="2" @change="changeTarget">
					<view>{{targetLang.value}}</view>
				</picker>
			</view>
			<span class="TL" @touchstart="translate">立即翻译</span>
		</view>
			<view class="result" v-show="result">
				<textarea v-model="result" :disabled="true" maxlength="10000" />
				<span class="copy" @touchstart="copyResult" v-show="result">复制</span>
			</view>
	</view>
</template>

<script>
	import config from '../../config.js'
	import request from '../../utils/request.js'
	import toURL from '../../utils/toURL.js'
	import storage from '../../utils/storage.js'
	import {getUser, checkUser} from '../../utils/getUser.js'
	
	export default {
		data() {
			return {
				query: '',
				result: '',
				langkeys: Object.keys(config.language).map((item,index) => ({index:index, type: item, value: config.language[item] })),
				originLang: {type: 'auto', value: '自动检测'},
				targetLang: {type: 'en', value: '英语'}
			}
		},
		computed: {
		},
		onLoad() {

		},
		methods: {
			clearQuery (e) {
				this.query = '';
			},
			changeOrigin (e) {
				this.originLang = this.langkeys[e.detail.value];
			},
			changeTarget (e) {
				if(this.langkeys[e.detail.value].type === 'auto') {
					uni.showToast({
						icon: 'none',
						title: "目标不允许自动检测",
						position: 'bottom'
					});
					return;
				}
				this.targetLang = this.langkeys[e.detail.value];
			},
			translate () { 
				if(!this.query.trim()) {
					uni.showToast({
						title: '内容为空',
						icon: 'none',
						position: 'bottom'  
					}); 
					return;
				} 
				uni.showLoading({
					title: '翻译中...',
					mask: true
				});
				request({
					url: toURL({from: this.originLang.type, to: this.targetLang.type, query: this.query.trim(),})
				}).then((res) => {
					if(res.statusCode === 200 && !res.data.error_code) { 
						let dts = res.data.trans_result;
						var str = dts.reduce((pre,cur)=>`${pre}${cur.dst}\n`,'')
						this.result = str;
						uni.hideLoading();
						// 加入翻译历史 start
						let his = storage.get(config.hiskey);
						his.unshift({
							origin: this.query.trim(),
							target: str
						}); 
						let newHis = storage.set(config.hiskey,his);
						//加入翻译历史 end
					
					}else{
						uni.showToast({
							title: res.data.error_code+'',
							icon: 'error',
							success () {
								uni.hideLoading();
							}
						});
						
					}
				});
				
			},
			copyResult () {
				uni.setClipboardData({
					data: this.result,
					success () {
						uni.showToast({
							title: '复制成功',
							icon: 'none',
							position: 'bottom'
						})
					}
				});
			},
			reverseLang () {
				if(this.originLang.type==='auto') {
					uni.showToast({
						title: "自动检测不允许反转",
						icon: 'none',
						position: "bottom"
					});
					return;
				}
				let temp = this.originLang;
				this.originLang = this.targetLang;
				this.targetLang = temp;
			},
			onShareAppMessage: function (res) {
				let that = this;
				return {
					title: '非常好用的翻译工具',
					path: '/pages/index/index',
					success: (res) => {
						uni.showToast({
							title: '分享成功'
						})	
						console.log(res);
					},
					fail: res => {
						uni.showToast({
							title: '分享失败',
							icon: 'error'
						});
						console.log(res);
					}
				}
			}
			
			
		}
	}
</script>

<style lang="scss">
	.content {	
		background-color: rgba(255,179,167,.1);
		width: 100%;
		height: 100vh;
		.result { 
			width: 90%; 
			border-radius: 5px;
			margin: 0 auto;
			box-shadow: 0 4px 14px 0px rgba(255,179,167,.5);
			padding: 10px 10px 30px;
			box-sizing: border-box;	
			position: relative;
			.copy {
				position: absolute;
				bottom: 15px;
				right: 15px;
				font-size: 12px;
				padding: 3px;
				border: solid 1px $theme-color;
				border-radius: 5px;
				color: $theme-color;
			}
		}
		.language-pick {
			padding: 15rpx 35rpx;
			display: flex;
			font-size: 30rpx;
			color: $theme-color-d;  
			z-index: 1;
			margin-bottom: 20rpx;
			.TL {
				width: 150rpx;
				padding: 9rpx;
				border: solid 1px $theme-color-l;
				border-radius: 5px;
				text-align: center;
				margin-left: auto;
			}
			.pick{
				flex: 1;
				display: flex;
			}
			.reverseLang {
				width:90rpx;
				text-align: center;
				padding: 9rpx 2rpx;
			}
			.targetLang, .originLang {
				white-space: nowrap;
				text-align: center;
				overflow: hidden;
				text-overflow: ellipsis;
				border: solid 1px $theme-color-l;
				padding: 9rpx 20rpx;
				border-radius: 5px;
			}
		}
		.query {
			box-sizing: border-box;
			width: 90%;
			margin: 40rpx auto 20rpx;
			box-shadow: 0 4px 14px 0px rgba(255,179,167,.3);
			position: relative;
			textarea{
				width: 80%;
			}
			.iconfont{
				position: absolute;
				right: 10px;
				top: 10px;	
				padding: 8px;
				z-index: 2;
			}
			textarea {
				padding: 25rpx 30rpx 20rpx;
			}
			
		}
	}
	.title {
		width: 400rpx;
		margin: 0 auto;
		.text{
			text-align: center;
			font-size: 86rpx;
			color: #555;
		}
		p {
			text-align: center;
			font-size: 20rpx;
			color: #C8C7CC;
			letter-spacing: 14rpx;
			padding-top: 6rpx;
		}
	}
</style>
