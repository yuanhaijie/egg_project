<script>
	export default {
		onLaunch: function() {
			console.log('App Launch')
		},
		onShow: function() {
			console.log('App Show')
		},
		onHide: function() {
			console.log('App Hide')
		}
	}
</script>

<style>
	/*每个页面公共css */
	.page {
		min-height:100vh;
		width: 100vw;
		background-image: url(static/b_w_bg.jpg);
		background-size: 100% 100%;
		
	}
</style>
