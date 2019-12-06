<template>
	<view>
		<uni-status-bar></uni-status-bar>
		<view class="iconfont icon-guanbi font-lg ml-2" @click="back"></view>
		
		<view class="flex justify-center main-light-dark" style="margin-top: 100rpx;margin-bottom: 60rpx;">
			<text style="font-size: 55rpx;">{{!status ? '账号密码' : '手机验证码'}}登录</text>
		</view>
		
		<view class="px-3">
			
			<template v-if="!status">
				<input type="text" class="border-bottom mb-4 uni-input px-0 animated fast fadeIn" placeholder="请输入手机号/邮箱/账号" v-model="username" placeholder-class="text-light-muted"/>
				
				<view class="flex align-stretch animated fast fadeIn">
					<input type="text" class="border-bottom mb-4 uni-input px-0 flex-1"
					placeholder="请输入密码" v-model="password"
					placeholder-class="text-light-muted"/>
					<view class="text-muted mb-4 border-bottom flex align-center justify-center" style="width: 150rpx;" @click.stop="forget">忘记密码?</view>
				</view>
			</template>
			
			<template v-else>
			<view class="flex align-stretch animated fast fadeIn">
				<view class="flex align-center justify-center font text-muted px-2 mb-4 border-bottom">+86</view>
				<input type="text" class="border-bottom mb-4 uni-input px-0 flex-1"
				placeholder="请输入手机号" v-model="phone"
				placeholder-class="text-light-muted"/>
			</view>
			<view class="flex align-stretch animated fast fadeIn">
				<input type="text" class="border-bottom mb-4 uni-input px-0 flex-1"
				placeholder="请输入验证码" v-model="checknum"
				placeholder-class="text-light-muted"/>
				<view class="mb-4 border-bottom flex align-center justify-center bg-main text-white" style="width: 180rpx;" @click.stop="getCheckNum" :class="disabled ? 'bg-main-disabled' : ''">{{!codetime?'获取验证码':codetime+' s'}}</view>
			</view>
			</template>
			<view class="py-2 px-3">
				<button class="bg-main text-white" style="border-radius: 50rpx;border: 0;" type="primary" @click="submit" :disabled="disabled" :class="disabled ? 'bg-main-disabled' : ''">登录</button>
			</view>
		</view>
		
		<view class="flex align-center justify-center my-4">
			<view style="color: #33677B;"
			@tap="changeStatus" hover-class="text-hover-primary">
				{{status?'账号密码登录':'验证码登录'}}
			</view>
			<text class="text-muted mx-2">|</text>
			<view style="color: #33677B;"
			hover-class="text-hover-primary">
				登录遇到问题
			</view>
		</view>
		
		<view class="flex align-center justify-center">
			<text style="background-color: #DDDDDD; height: 1rpx;width: 200rpx;"></text>
			<text class="mx-2 text-muted">社交账号登录</text>
			<text style="background-color: #DDDDDD;height: 1rpx;width: 200rpx;"></text>
		</view>
		
		<other-login></other-login>
		
		<view class="flex align-center justify-center font text-muted">
			注册即代表您同意《xxx社区协议》
		</view>
		
	</view>
</template>

<script>
	import uniStatusBar from '@/components/uni-ui/uni-status-bar/uni-status-bar.vue';
	import otherLogin from '@/components/common/other-login.vue';
	export default {
		components: {
			uniStatusBar,
			otherLogin
		},
		data() {
			return {
				status:false,
				username:"",
				password:"",
				phone:"",
				checknum:"",
				codetime:0,
			}
		},
		computed: {
			disabled(){
				if( (this.username && this.password)||(this.phone && this.checknum) ){
					return false
				}
				return true
			},
		},
		methods: {
			submit(){
				// 账号密码登录
				if(!this.status){
					// 请求服务器
				}
				// 验证码登录
				// 验证手机号合法性
				if(!this.isPhone()){
					return uni.showToast({ title: '请输入正确的手机号码', icon:"none" });
				}
				// 请求服务器
			},
			forget(){
				
			},
			// 验证手机号码
			isPhone(){
				let mPattern = /^1[34578]\d{9}$/; 
				return mPattern.test(this.phone);
			},
			// 获取验证码
			async getCheckNum(){
				if(this.codetime > 0)return;
				// 验证手机号合法性
				if(!this.isPhone()){
					return uni.showToast({ title: '请输入正确的手机号码', icon:"none" });
				}
				// 请求服务器，发送验证码
				
				// 发送成功，开启倒计时
				this.codetime=60;
				let timer=setInterval(()=>{
					this.codetime--;
					if(this.codetime < 1){
						clearInterval(timer);
						this.codetime=0;
					}
				},1000);
			},
			// 初始化表单
			initInput(){
				this.username='';
				this.password='';
				this.phone='';
				this.checknum='';
			},
			// 切换登录状态
			changeStatus(){
				this.initInput();
				this.status = !this.status;
			},
			back(){
				uni.navigateBack({
					delta: 1
				});
			}
		}
	}
</script>

<style>

</style>
