<template>
	<view class="history">
		<template>
			<uni-list>
				<uni-list-item @click="copy(his)" v-for="his in list" :title="his.origin" :note="his.target" :key="his.origin" :show-arrow="false"></uni-list-item>
			</uni-list>
		</template>
		<template v-if="!list.length">
			<view class="empty">暂无历史</view>
		</template>
	</view>
</template>

<script>
	import uniList from "@/components/uni-list/uni-list.vue"
	import uniListItem from "@/components/uni-list-item/uni-list-item.vue"
	import storage from '../../utils/storage.js'
	import config from '../../config.js'
	export default {
		components: {
			uniList,
			uniListItem
		},
		data() {
			return {

			}
		},
		computed: {
			list() {
				return storage.get(config.hiskey);
			}
		},
		methods: {
			copy (his) {
				uni.setClipboardData({
					data: his.target,
					success () {
						uni.showToast({
							title: '复制结果成功',
							position: 'bottom'
						})
					}
				})
			}
		}
	}
</script>

<style lang="scss">
	.history {
		width: 100%;
		height: 100%;
		background-color: rgba(255, 179, 167, .07);
	}
	.empty {
		text-align: center;
		display: block;
		width: 200rpx;
		margin: 100rpx auto;
		font-size: 30rpx;
		color:#C0C0C0;
	}
</style>
