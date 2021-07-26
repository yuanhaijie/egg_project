<template>
	<view class="page">
		<view class="login_btn" @click="loginPage">
			login
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {

			}
		},
		onLoad() {

		},
		methods: {
			loginPage(){
				uni.navigateTo({
					url:'../login/login'
				})
			}
		}
	}
</script>

<style>
	.login_btn {
		height: 5vh;
		width: 5vw;
		display: flex;
		justify-content: center;
		align-items: center;
		border-radius: 2vh;
		border: #007AFF 0.2vh solid;
		color: #4CD964;
	}
</style>
