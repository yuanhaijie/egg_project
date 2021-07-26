<template>
	<view class="page">
		<form @submit="formSubmit" @reset="formReset">
			<view class="uni-form-item uni-column">
				<view class="title">username</view>
				<input class="uni-input"  v-model="username" placeholder="请输入用户名" />
			</view>
			<view class="uni-form-item uni-column">
				<view class="title">password</view>
				<input class="uni-input"  v-model="password" placeholder="请输入用户密码" password="true" />
			</view>
			<view class="uni-btn-v">
				<button form-type="submit">Submit</button>
				<button type="default" form-type="reset">Reset</button>
			</view>
		</form>
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
			formSubmit(e) {
				let that = this
				var formdata = e.detail.value
				uni.showLoading({
					title: '加载中>>>'
				})
				uni.request({
					url: 'http://127.0.0.1:7001/login',
					method: 'POST',
					header: {
						'x-csrf-token':that.getCookie("csrfToken")
					},
					data:{
						name:that.username,
						psd:that.password
					},
					success(res) {
						console.log(res.data)
						if(res.data.error_code == 1){
							uni.showToast({
								title:res.data.msg
							})
							uni.setStorageSync('uuid',res.data.data.uuid)
							uni.navigateTo({
								url:'../todo-list/todo-list'
							})
						}else{
							uni.showToast({
								title:res.data.msg,
								icon:'none'
							})
						}
						
					},
					complete() {
						uni.hideLoading()
					}
				})
			},
			formReset(e) {
				console.log('清空数据')
			},
			getCookie(name) {
				var arr, reg = new RegExp("(^| )" + name + "=([^;]*)(;|$)");
				if (arr = document.cookie.match(reg))
					return unescape(arr[2]);
				else
					return null;
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

	.uni-form-item .title {
		padding: 20rpx 0;
	}
</style>
