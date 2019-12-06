<template>
	<view>
		<uni-list-item title="账号与安全" @click="open('user-password')"></uni-list-item>
		<uni-list-item title="绑定邮箱" @click="open('user-email')"></uni-list-item>
		<uni-list-item title="资料编辑" @click="open('user-userinfo')"></uni-list-item>
		<uni-list-item title="清除缓存" @click="clear()">
			<text slot="right" class="font text-muted">{{storageSize}}</text>
		</uni-list-item>
		<uni-list-item title="意见反馈" @click="open('user-feedback')"></uni-list-item>
		<uni-list-item title="关于社区" @click="open('user-about')"></uni-list-item>
		
		<view class="py-2 px-3">
			<button class="bg-main text-white" style="border-radius: 50rpx;border: 0;" type="primary">退出登录</button>
		</view>
		
	</view>
</template>

<script>
	import uniListItem from '@/components/uni-ui/uni-list-item/uni-list-item.vue';
	export default {
		components: {
			uniListItem
		},
		data() {
			return {
				storageSize:0
			}
		},
		onLoad() {
			this.getStorageSize()
		},
		methods: {
			getStorageSize(){
				try {
				    const res = uni.getStorageInfoSync();
				    this.storageSize = res.currentSize > 1024 ? (res.currentSize/1024).toFixed(2) +' MB' : res.currentSize.toFixed(2) + ' KB'
				} catch (e) {
				    // error
				}
			},
			clear(){
				uni.showModal({
					title: '提示',
					content: '是否要清除所有缓存？',
					cancelText: '取消',
					confirmText: '清除所有',
					success: res => {
						if (res.confirm) {
							uni.clearStorageSync()
							this.getStorageSize()
						}
					},
				});
			},
			open(path){
				uni.navigateTo({
					url: `../${path}/${path}`
				});
			}
		}
	}
</script>

<style>

</style>
