<template>
	<view>
		
		<view class="flex align-center p-3 border-bottom border-light-secondary animated faster fadeIn">
			<image class="rounded-circle mr-2"
			src="/static/demo/userpic/10.jpg"
			style="width: 180rpx;height: 180rpx;" 
			lazy-load></image>
			<view class="flex-1 flex-column pl-3">
				<view class="flex">
					<view v-for="(item,index) in spacedata" :key="index"
					class="flex flex-column justify-center align-center flex-1">
						<text class="font-lg line-h-md font-weight-bold">
							{{item.num}}
						</text>
						<text class="font">{{item.name}}</text>
					</view>
					
				</view>
				<view class="py-2 px-3">
					<button type="default" style="width: 100%;" size="mini"
					class="bg-main text-white">
						关注
					</button>
					<!-- <navigator url="/pages/user-set-userinfo/user-set-userinfo" hover-class="none">
						<button type="default"
						:plain="true"
						style="width: 100%;"
						size="mini" class="main-color main-border-color">
							编辑资料
						</button>
					</navigator> -->
					
				</view>
			</view>
		</view>
		
		<view class="flex align-center" style="height: 100rpx;">
			<view class="flex-1 flex align-center justify-center"
			v-for="(item,index) in tabBars" :key="index"
			:class="index === tabIndex ? 'font-lg font-weight-bold text-main':'font-md'"
			@click="changeTab(index)">
			{{item.name}}</view>
		</view>
		
		
		<view v-if="tabIndex === 0" class="px-3 animated fast fadeIn">
			<view class="px-2 border-bottom">
				<view class="font-md py-2">账号信息</view>
				<view class="font">账号年龄：12天</view>
				<view class="font">账号ID：1</view>
			</view>
			<view class="px-2 border-bottom">
				<view class="font-lg py-2">个人信息</view>
				<view class="font">星座：天蝎座</view>
				<view class="font">职业：IT</view>
				<view class="font">故乡：中国</view>
				<view class="font">情感：未婚</view>
			</view>
		</view>
		<view v-else-if="tabIndex === 1" class="animated fast fadeIn">
			<block v-for="(item2,index2) in list1" :key="index2">
				<!-- 列表样式 -->
				<common-list :item="item2" :index="index2" @follow="follow(1,$event)" @doSupport="doSupport(1,$event)"></common-list>
				<!-- 全局分割线 -->
				<divider></divider>
			</block>
		</view>
		<view v-else-if="tabIndex === 2" class="animated fast fadeIn">
			<block v-for="(item2,index2) in list2" :key="index2">
				<!-- 列表样式 -->
				<common-list :item="item2" :index="index2" @follow="follow(2,$event)" @doSupport="doSupport(2,$event)"></common-list>
				<!-- 全局分割线 -->
				<divider></divider>
			</block>
		</view>
		
		<uni-popup ref="popup" type="top">
			<view class="flex align-center justify-center py-2 animated faster font-md border-bottom border-light-secondary" hover-class="pulse main-color">
				<text class="iconfont icon-sousuo mr-2"></text>
				移除黑名单
			</view>
			<view v-show="!userinfo.isblack" 
			class="flex align-center justify-center py-2 animated faster font-md"
			hover-class="pulse main-color">
				<text class="iconfont icon-qingchu mr-2"></text> 
				聊天
			</view>
		</uni-popup>
		
	</view>
</template>

<script>
	const demo = [{
		username:"昵称",
		userpic:"/static/default.jpg",
		newstime:"2019-10-20 下午04:30",
		isFollow:false,
		title:"我是标题",
		titlepic:"/static/demo/datapic/11.jpg",
		support:{
			type:"support", // 顶
			support_count:1,
			unsupport_count:2
		},
		comment_count:2,
		share_num:2
	},
	{
		username:"昵称",
		userpic:"/static/default.jpg",
		newstime:"2019-10-20 下午04:30",
		isFollow:false,
		title:"我是标题",
		titlepic:"",
		support:{
			type:"unsupport", // 踩
			support_count:1,
			unsupport_count:2
		},
		comment_count:2,
		share_num:2
	},
	{
		username:"昵称",
		userpic:"/static/default.jpg",
		newstime:"2019-10-20 下午04:30",
		isFollow:false,
		title:"我是标题",
		titlepic:"",
		support:{
			type:"", // 未操作
			support_count:1,
			unsupport_count:2
		},
		comment_count:2,
		share_num:2
	}];
	import commonList from '@/components/common/common-list.vue';
	import uniPopup from '@/components/uni-ui/uni-popup/uni-popup.vue';
	export default {
		components: {
			commonList,
			uniPopup
		},
		data() {
			return {
				spacedata:[
					{ name:"获赞", num:0 },
					{ name:"关注", num:0 },
					{ name:"粉丝", num:0 },
				],
				tabIndex:0,
				tabBars:[{
					name:"主页",
				},{
					name:"帖子",
				},{
					name:"动态",
				}],
				list1:demo,
				list2:demo
			}
		},
		onNavigationBarButtonTap(e) {
			if(e.index==0){ 
				this.$refs.popup.open()
			}
		},
		methods: {
			changeTab(index){
				this.tabIndex = index
			},
			// 关注
			follow(i,e){
				// 拿到当前的选项卡对应的list
				let list = this['list'+i]
				list[e].isFollow = true
				uni.showToast({ title: '关注成功' })
			},
			// 顶踩操作
			doSupport(i,e){
				// 拿到当前的选项卡对应的list
				let list = this['list'+i]
				// 拿到当前对象
				let item = list[e.index]
				let msg = e.type === 'support' ? '顶' : '踩'
				// 之前没有操作过
				if (item.support.type === '') {
					item.support[e.type+'_count']++
				} else if (item.support.type ==='support' && e.type === 'unsupport') {
					// 顶 - 1
					item.support.support_count--;
					// 踩 + 1
					item.support.unsupport_count++;
				} else if(item.support.type ==='unsupport' && e.type === 'support'){ 					// 之前踩了
					// 顶 + 1
					item.support.support_count++;
					// 踩 - 1
					item.support.unsupport_count--;
				}
				item.support.type = e.type
				uni.showToast({ title: msg + '成功' });
			},
		}
	}
</script>

<style>

</style>
