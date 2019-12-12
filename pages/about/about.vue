<template>
	<view class="about">
		<p>路在何方?</p>

		<view class="footer">
			<button type="primary" open-type="contact" size="mini">和我交流</button>
			<text>version: 0.0.1</text>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {

			}
		},
		methods: {

		}
	}
</script>

<style lang="scss">
	.about {
		width: 100%;
		height: 100vh;
		background-color: rgba(255,179,167,.1);
		p {
			text-align: center;
			padding: 20rpx 0;
		}

		.footer{
			position: absolute;
			bottom: 10rpx;
			width: 100%;
			display: flex;
			flex-direction: column;
			justify-content: space-between;
			align-items: center;
		}
	}
</style>
