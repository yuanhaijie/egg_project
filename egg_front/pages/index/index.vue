<template>
	<view class="page">
		<view class="page_header">
			<view class="page_logo">
				<image class="page_logo_img" src="../../static/logo.png" mode=""></image>
			</view>
			<view class="user_ava" v-if="isLogin" @mouseover="show">
				<image class="user_ava_img" :src="ava" mode=""></image>
			</view>
			
			<view class="user_ava" v-else @click="toLoginPage">
				<image class="user_ava_img" src="../../static/hacker.jpg" mode=""></image>
			</view>
			
			<view class="user_name" @mouseover="show">
				{{name}}
			</view>
			
			<view class="user_menu" v-if="isShow" @mouseleave="unShow">
				<view class="user_menu_item">
					用户信息
				</view>
				<view class="user_menu_divider">
					
				</view>
				<view class="user_menu_item" @click="logout">
					退出登录
				</view>
			</view>
		</view>
		<!-- <view class="todo_list">
			<view class="list_item" v-for="item,index in list" :key="index">
				{{index + 1}}-{{item}}
				<view class="delete_item" @click="delete_item(index)">-</view>
			</view>
		</view> -->
		<!-- <view class="add_list">
			<view class="add_left">
				<input class="add_input" v-model="list_item" placeholder="请输入新的计划项" />
			</view>
			<view class="add_right" @click="addTodoList">
				添加
			</view>
		</view> -->
	</view>
</template>

<script>
	export default {
		onLoad() {
			if(uni.getStorageSync('user').uuid){
				this.getList()
				this.isLogin = true
				this.ava = uni.getStorageSync('user').ava
				this.name = uni.getStorageSync('user').name
			}
		},
		data() {
			return {
				list: [],
				list_item: '',
				ava:'',
				name:'未登录',
				isLogin: false,
				isShow:false
			}
		},
		methods: {
			show(){
				this.isShow = true
			},
			unShow(){
				this.isShow = false
			},
			toLoginPage() {
				uni.navigateTo({
					url: '../login/login'
				})
			},
			getList() {
				let that = this
				uni.request({
					url: 'http://127.0.0.1:7001/getTodoList?uuid=' + uni.getStorageSync('user').uuid,
					method: 'GET',
					success(res) {
						console.log('list', res)
						if (res.data.error_code == 1) {
							that.list = JSON.parse(res.data.data.list)
							console.log('当前list', that.list)
						}
					}
				})
			},
			addTodoList() {
				let that = this
				if (that.list == []) {
					that.list.push(that.list_item)
					uni.showLoading({
						title: '加载中>>>'
					})
					uni.request({
						url: 'http://127.0.0.1:7001/addTodoList',
						method: 'POST',
						data: {
							name: uni.getStorageSync('user').name,
							createdAt: that.getTime(),
							list: JSON.stringify(that.list),
							u_uuid: uni.getStorageSync('user').uuid
						},
						success(res) {
							if (res.data.error_code == 1) {
								uni.showToast({
									title: '添加成功',
									success() {
										that.getList()
										that.list_item = ''
									}
								})
							}
						},
						complete() {
							uni.hideLoading()
						}
					})
				} else {
					that.list.push(that.list_item)
					uni.showLoading({
						title: '加载中>>>'
					})
					uni.request({
						url: 'http://127.0.0.1:7001/updateTodoList',
						method: 'POST',
						data: {
							list: JSON.stringify(that.list),
							u_uuid: uni.getStorageSync('user').uuid
						},
						success(res) {
							if (res.data.error_code == 1) {
								uni.showToast({
									title: '更新成功',
									success() {
										that.getList()
										that.list_item = ''
									}
								})
							}
						},
						complete() {
							uni.hideLoading()
						}
					})
				}

			},
			getTime() {
				let date = new Date(+new Date() + 8 * 3600 * 1000).toISOString().replace(/T/g, ' ').replace(/\.[\d]{3}Z/,
					'')
				return date
			},
			delete_item(index) {
				let that = this
				uni.showModal({
					title: '是否删除该项?',
					success(res) {
						if (res.confirm) {
							that.list.splice(index, 1)
							uni.showLoading({
								title: '加载中>>>'
							})
							uni.request({
								url: 'http://127.0.0.1:7001/updateTodoList',
								method: 'POST',
								data: {
									list: JSON.stringify(that.list),
									u_uuid: uni.getStorageSync('user').uuid
								},
								success(res) {
									if (res.data.error_code == 1) {
										uni.showToast({
											title: '更新成功',
											success() {
												that.getList()
												that.list_item = ''
											}
										})
									}
								},
								complete() {
									uni.hideLoading()
								}
							})
						} else if (res.cancel) {
							uni.showToast({
								title: '取消删除',
								icon: 'none'
							})
						}
					}
				})
			},
			logout(){
				uni.clearStorageSync('user')
				// #ifdef H5
				window.location.reload()
				// #endif
			}
		}
	}
</script>

<style>
	.page {
		display: flex;
		align-items: center;
		flex-direction: column;
		background-color: #d9d9e3;
	}

	.page_header {
		height: 10vh;
		width: 100vw;
		background-color: #FFFFFF;
		box-shadow: 0 5px 10px #000000;
		display: flex;
		align-items: center;
		margin-bottom: 5vh;
		position: relative;
		animation: page 2s;
	}
	@keyframes page{
		0%{
			opacity: 0;
		}
		100%{
			opacity: 1;
		}
	}
	.page_logo {
		height: 8vh;
		width: 30vh;
		display: flex;
		align-items: center;
		justify-content: center;
		position: absolute;
		left: 5vw;
		cursor: pointer;
	}
	.page_logo_img {
		height: 8vh;
		width: 30vh;
		/* border-radius: 50%; */
	}

	.user_ava {
		height: 8vh;
		width: 8vh;
		display: flex;
		align-items: center;
		justify-content: center;
		position: absolute;
		right: 5vw;
		cursor: pointer;
	}

	.user_ava_img {
		height: 8vh;
		width: 8vh;
		border-radius: 50%;
	}
	.user_name {
		cursor: pointer;
		height: 8vh;
		width: 8vh;
		display: flex;
		align-items: center;
		justify-content: center;
		position: absolute;
		right: 1vw;
	}
	.user_menu {
		height: 12.5vh;
		width: 6.5vw;
		background-color: #FFFFFF;
		box-shadow: 0 5px 5px #000000;
		position: absolute;
		right: 1.5vw;
		top: 10.5vh;
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
		border-radius: 0  0 1vh 1vh;
	}
	
	.user_menu_item {
		cursor: pointer;
		width: 6.5vw;
		height: 6vh;
		display: flex;
		align-items: center;
		justify-content: center;
	}
	.user_menu_divider {
		width: 6.5vw;
		height: 0.5vh;
		background-color: #555555;
	}
	.user_menu_item:hover {
		background-color: #007AFF;
		color: #FFFFFF;
	}

	.todo_list {
		height: 50vh;
		width: 50vw;
		border-radius: 2vh;
		background-color: #FFFFFF;
		box-shadow: 0 5px 10px #000000;
		display: flex;
		/* justify-content: center; */
		align-items: center;
		flex-direction: column;
	}

	.list_item {
		display: flex;
		align-items: center;
		flex-direction: row;
		height: 5vh;
		width: 40vw;
		justify-content: space-around;
		margin-top: 1vh;
		border-radius: 0.5vh;
		background-color: #FFFFFF;
		box-shadow: 0 5px 5px #999999;
		position: relative;
	}

	.delete_item {
		position: absolute;
		right: 1vw;
		cursor: pointer;
		height: 3vh;
		width: 3vh;
		border: #DD524D 0.2vh solid;
		border-radius: 2vh;
		color: #DD524D;
		display: flex;
		align-items: center;
		justify-content: center;
		font-weight: 600;
	}

	.add_list {
		height: 20vh;
		width: 50vw;
		display: flex;
		flex-direction: row;
		align-items: center;
	}

	.add_left {
		width: 30vw;
		height: 10vh;
		display: flex;
		align-items: center;
		justify-content: center;
	}

	.add_input {
		background-color: #C8C7CC;
		border-radius: 1vh;
		height: 8vh;
		width: 28vw;
		padding: 0 1vw;
		color: #FFFFFF;
	}

	.add_right {
		cursor: pointer;
		height: 8vh;
		width: 15vh;
		background-color: #007AFF;
		color: #FFFFFF;
		display: flex;
		align-items: center;
		justify-content: center;
		border-radius: 2vh;
		margin-left: 13vw;
	}
</style>
