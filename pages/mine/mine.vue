<template>
	<view class="mine">
		<template v-if="isLogin">
			<view class="user">
				<img class="avatar" :src="userInfo.avatarUrl" alt="">
				<p class="name">{{userInfo.nickName}}</p>
			</view>
		</template>
		<template v-if="!isLogin">
			<view class="user">
				<button type="primary" size="mini" open-type="getUserInfo" @getuserinfo="getUserInfo">登陆</button>
			</view>
		</template>
		<uni-list>
			<uni-list-item title="翻译历史" @touchstart="toHistory"></uni-list-item>
			<uni-list-item title="关于我" @touchstart="toAbout"></uni-list-item>
		</uni-list>
	</view>
</template>

<script>
	import uniList from "@/components/uni-list/uni-list.vue"
	import uniListItem from "@/components/uni-list-item/uni-list-item.vue"
	import storage from '../../utils/storage.js'
	export default {
		components: {
			uniList,
			uniListItem
		},
		data() {
			return {
				isLogin: false,
				userInfo: null
			};
		},
		onShow() {

		},
		onLoad() {},
		methods: {
			getUserInfo(e) {
				if (!e.detail.userInfo) return;
				this.userInfo = e.detail.userInfo;
				this.isLogin = true;
				storage.set('__user__', this.userInfo);
			},
			toHistory() {
				uni.navigateTo({
					url: "/pages/history/history"
				})
			},
			toAbout() {
				uni.navigateTo({
					url: "/pages/about/about"
				})
			},
			onShareAppMessage: function(res) {
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
	.mine {
		width: 100%;
		height: 100vh;
		background-color: rgba(255, 179, 167, .1);

		.user {
			width: 100%;
			text-align: center;
			padding: 20rpx 0;

			image {
				width: 98rpx;
				height: 98rpx;
				border-radius: 50%;
				overflow: hidden;
			}
		}
	}
</style>
