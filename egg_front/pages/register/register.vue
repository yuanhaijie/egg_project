<template>
	<view class="page">
		<view class="register_form">
			<view class="register_form_item">
				<view class="register_form_upload" v-if="!ava" @click="uploadAva">
					<uni-icons type="cloud-upload" color="#fff"></uni-icons>
					<text class="register_form_upload_tips">上传头像</text>
				</view>
				<view class="register_form_upload" v-else @click="uploadAva">
					<image class="register_form_upload_ava" :src="ava" mode=""></image>
				</view>
			</view>
			<view class="register_form_item">
				<input class="register_form_input" v-model="username" placeholder="请输入用户名" placeholder-style="color:#FFFFFF"/>
			</view>
			<view class="register_form_item">
				<input class="register_form_input" v-model="password" placeholder="请输入用户密码" placeholder-style="color:#FFFFFF" password="true" />
			</view>
			<view class="register_form_item">
				<input class="register_form_input" v-model="password_ensure" placeholder="请确认密码" placeholder-style="color:#FFFFFF" password="true" />
			</view>
			<view class="register_form_item">
				<view class="register_form_btn" @click="register">注册</view>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				username:"",
				password:"",
				password_ensure:"",
				ava:""
			}
		},
		methods: {
			uploadAva(){
				let that = this
				uni.chooseImage({
				    count: 1, //默认9
				    sizeType: ['original', 'compressed'], //可以指定是原图还是压缩图，默认二者都有
				    sourceType: ['album'], //从相册选择
				    success: function (res) {
				        console.log(JSON.stringify(res.tempFilePaths));
						that.ava = res.tempFilePaths[0]
				    }
				});
			},
			register(){
				if(this.ava == ''){
					uni.showToast({
						title:'请上传头像',
						icon:'none'
					})
					return
				}
				if(this.username == ''){
					uni.showToast({
						title:'请输入用户名',
						icon:'none'
					})
					return
				}
				if(this.password == ''){
					uni.showToast({
						title:'请输入密码',
						icon:'none'
					})
					return
				}
				if(this.password != this.password_ensure) {
					uni.showToast({
						title:'两次密码不匹配',
						icon:'none'
					})
					return
				}
				let that = this
				uni.showLoading({
					title:'>>>'
				})
				uni.uploadFile({
					url:'http://127.0.0.1:7001/upload',
					name: 'file',
					filePath: that.ava,
					success(res) {
						console.log(JSON.parse(res.data).data.file)
						uni.request({
							url:'http://127.0.0.1:7001/add',
							method:'POST',
							data:{
								name: that.username,
								psd: that.password,
								ava: JSON.parse(res.data).data.file
							},
							success(addRes) {
								console.log(addRes)
								if(addRes.data.error_code == 200){
									uni.hideLoading()
									uni.setStorageSync('user',addRes.data.data)
									uni.showToast({
										title:'注册成功',
										success() {
											uni.navigateTo({
												url:'../index/index'
											})
										}
									})
								}
							}
						})
					},
					fail(err) {
						console.log(err)
					}
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

	.register_form {
		height: 60vh;
		width: 50vw;
		/* border: #7ed99c 1px solid; */
		display: flex;
		justify-content: center;
		align-items: center;
		flex-direction: column;
		padding-top: 2vh;
	}

	.register_form_item {
		height: 10vh;
		width: 40vw;
		display: flex;
		flex-direction: row;
		justify-content: space-around;
		margin-bottom: 5vh;
		position: relative;
	}
	.register_form_title {
		position: absolute;
		left: 0;
		display: flex;
		align-items: center;
	}
	.register_form_input {
		height: 6vh;
		width: 60vh;
		border: #FFFFFF 1px solid;
		border-radius: 1vh;
		padding: 0 1vh;
		color: #FFFFFF;
	}
	.register_form_upload {
		cursor: pointer;
		height: 10vh;
		width: 10vh;
		display: flex;
		align-items: center;
		justify-content: center;
		border: #FFFFFF solid 1px;
		border-radius: 2vh;
		flex-direction: column;
	}
	.register_form_upload_tips {
		font-size: 8rpx;
		color: #FFFFFF;
	}
	.register_form_upload_ava {
		height: 10vh;
		width: 10vh;
	}
	.register_form_btn {
		height: 6vh;
		width: 62vh;
		background-color: #007AFF;
		border-radius: 1vh;
		color: #FFFFFF;
		display: flex;
		justify-content: center;
		align-items: center;
		cursor: pointer;
	}
</style>
