<template>
	<view class="page">
		<view class="page_header">
			<view class="user_ava" v-if="isLogin" @mouseover="show">
				<image class="user_ava_img" :src="ava" mode=""></image>
			</view>
			
			<view class="user_ava" v-else @click="toLoginPage">
				<image class="user_ava_img" src="../../static/logo.png" mode=""></image>
			</view>
			
			<!-- <view class="user_list" v-if="isShow" @mouseleave="unShow">
				
			</view> -->
		</view>
		<view class="todo_list">
			<view class="list_item" v-for="item,index in list" :key="index">
				{{index + 1}}-{{item}}
				<view class="delete_item" @click="delete_item(index)">-</view>
			</view>
		</view>
		<view class="add_list">
			<view class="add_left">
				<input class="add_input" v-model="list_item" placeholder="请输入新的计划项" />
			</view>
			<view class="add_right" @click="addTodoList">
				添加
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		onLoad() {
			if(uni.getStorageSync('user').uuid){
				this.getList()
				this.isLogin = true
				this.ava = uni.getStorageSync('user').ava
			}
			console.log('uuid',uni.getStorageSync('user').ava)
		},
		data() {
			return {
				list: [],
				list_item: '',
				ava:'',
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
		background-color: #fff6f9;
		box-shadow: 2px 2px 2px #999999;
		display: flex;
		align-items: center;
		margin-bottom: 1vh;
		position: relative;
	}

	.user_ava {
		height: 8vh;
		width: 8vh;
		display: flex;
		align-items: center;
		justify-content: center;
		position: absolute;
		right: 2vw;
	}

	.user_ava_img {
		height: 8vh;
		width: 8vh;
		border-radius: 50%;
	}
	.user_list {
		height: 20vh;
		width: 5vw;
		background-color: #fff6f9;
		box-shadow: 0 2px 2px #C0C0C0;
		position: absolute;
		right: 1.5vw;
		top: 10vh;
		display: flex;
		flex-direction: column;
	}

	.todo_list {
		height: 50vh;
		width: 50vw;
		border-radius: 2vh;
		background-color: #fff6f9;
		box-shadow: 2px 2px 2px #999999;
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
		box-shadow: 2px 2px 2px #999999;
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
