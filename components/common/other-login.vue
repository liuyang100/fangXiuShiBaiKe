<template>
	<view class="flex align-center justify-center py-4 px-5">
		<view class="flex align-center justify-center rounded-circle text-white mx-2 font-lg animated fast " hover-class="pulse" style="width: 100rpx;height: 100rpx;" v-for="(item,index) in providerList" :key="index" :class="item.icon">
			<text class="iconfont" :class="'icon-'+item.icon"></text>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				providerList:[]
			}
		},
		onReady() {
			this.getProvides()
		},
		methods: {
			getProvides() {
				uni.getProvider({
					service: 'oauth',
					success: (result) => {
						this.providerList = result.provider.map((value) => {
							let providerName = ''
							let icon=''
							switch (value) {
								case 'weixin':
									providerName = '微信登录';
									icon='weixin';
									break;
								case 'qq':
									providerName = 'QQ登录';
									icon='QQ';
									break;
								case 'sinaweibo':
									providerName = '新浪微博登录';
									icon='xinlangweibo';
									break;
								// #ifdef MP-ALIPAY
								case 'alipay':
									providerName = '支付宝登录';
									icon='changyonglogo30';
									color="bg-primary"
									break;
								// #endif
							}
							return {
								name: providerName,
								icon:icon,
								id: value,
							}
						});
						
					},
					fail: (error) => {
						console.log('获取登录通道失败', error);
					}
				});
			}
		},
	}
</script>

<style>
	.QQ{
		background: #2CAEFC;
	}
	.weixin{
		background: #2BD19B;
	}
	.xinlangweibo{
		background: #FC7729;
	}
	.changyonglogo30{
		background: #007AFF;
	}
</style>
