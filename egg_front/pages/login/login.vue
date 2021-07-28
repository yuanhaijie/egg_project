<template>
	<view class="page">
		<view class="login_form">
			<view class="login_form_item">
				<input class="login_form_input" v-model="username" placeholder="请输入用户名" placeholder-style="color:#FFFFFF"/>
			</view>
			<view class="login_form_item">
				<input class="login_form_input" v-model="password" placeholder="请输入用户密码" placeholder-style="color:#FFFFFF" password="true" />
			</view>
			<view class="login_form_item">
				<view class="login_form_btn" @click="login">登录</view>
				<view class="login_form_btn" @click="toRegisterPage">注册</view>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				username: '',
				password: ''
			}
		},
		methods: {
			login() {
				let that = this
				uni.showLoading({
					title: '加载中>>>'
				})
				uni.request({
					url: 'http://127.0.0.1:7001/login',
					method: 'POST',
					data: {
						name: that.username,
						psd: that.password
					},
					success(res) {
						console.log(res.data)
						if (res.data.error_code == 1) {
							uni.hideLoading()
							uni.setStorageSync('user', res.data.data)
							uni.showToast({
								title: res.data.msg,
								success() {
									uni.navigateTo({
										url: '../index/index'
									})
								}
							})				
						} else {
							uni.showToast({
								title: res.data.msg,
								icon: 'none'
							})
						}

					},
					complete() {
						uni.hideLoading()
					}
				})
			},
			getCookie(name) {
				var arr, reg = new RegExp("(^| )" + name + "=([^;]*)(;|$)");
				if (arr = document.cookie.match(reg))
					return unescape(arr[2]);
				else
					return null;
			},
			toRegisterPage() {
				uni.navigateTo({
					url: '../register/register'
				})
			}
		}
	}
</script>

<style>
	.page {
		display: flex;
		align-items: center;
		justify-content: center;
	}

	.login_form {
		height: 60vh;
		width: 50vw;
		display: flex;
		justify-content: center;
		align-items: center;
		flex-direction: column;
	}

	.login_form_item {
		height: 10vh;
		width: 40vw;
		display: flex;
		flex-direction: row;
		justify-content: space-around;
		margin-bottom: 5vh;
	}
	.login_form_input {
		height: 6vh;
		width: 60vh;
		/* border: #FFFFFF 1px solid; */
		border-radius: 1vh;
		padding: 0 1vh;
		color: #FFFFFF;
		background-color: rgba(109, 112, 115, 0.5);
	}

	.login_form_btn {
		height: 4vh;
		width: 12vh;
		background-color: rgba(109, 112, 115, 0.5);
		color: #FFFFFF;
		display: flex;
		justify-content: center;
		align-items: center;
		cursor: pointer;
	}
</style>
