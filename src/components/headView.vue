<template>
    <header class="headerBd header-area1">
		<div class="headerBox1">
			<div class="leftBox">
				<div class="">
					<div class="imgBox">
						<a href="#"><img src="../assets/3388-logo2.png" class="imgLogo"></a>
					</div>
				</div>
			</div>
			<div class="rightBox">
				<div class="btnBox">
					<div class="input-group input-search">
						<input type="text" class="form-control input-text" placeholder="查找" aria-label="Recipient's username" aria-describedby="button-addon2" v-model="searchTerm">
						<button class="btn btn-search" type="button" id="button-addon2" @click="performSearch">搜尋</button>
					</div>
					<button type="button" class="btn area_btn text-light border" @click="setLocale('zh_cn')">简体中文</button>
					<button type="button" class="btn area_btn text-light border" @click="setLocale('zh_hk')">繁體中文</button>
					<button type="button" class="btn area_btn text-light border" @click="setLocale('en')">English</button>
				</div>
			</div>
		</div>
	</header>
	<header class="headerBd p-3">
		<div class="headerBox2">
			<!-- <router-link to="/" :class="{ active: isActive('/') }" class="router-link">
				<div class="pcRouterBox">
					<div class="pcRouterImg">
						<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" class="bi bi-house-door" viewBox="0 0 16 16">
							<path d="M8.354 1.146a.5.5 0 0 0-.708 0l-6 6A.5.5 0 0 0 1.5 7.5v7a.5.5 0 0 0 .5.5h4.5a.5.5 0 0 0 .5-.5v-4h2v4a.5.5 0 0 0 .5.5H14a.5.5 0 0 0 .5-.5v-7a.5.5 0 0 0-.146-.354L13 5.793V2.5a.5.5 0 0 0-.5-.5h-1a.5.5 0 0 0-.5.5v1.293zM2.5 14V7.707l5.5-5.5 5.5 5.5V14H10v-4a.5.5 0 0 0-.5-.5h-3a.5.5 0 0 0-.5.5v4z"/>
						</svg>
					</div>
					<div class="textBox">{{ $t('home') }}</div>
				</div>
			</router-link> -->
			<router-link to="/soccer" :class="{ active: isActive('/soccer') }" class="router-link">
				<div class="pcRouterBox">
					<div class="pcRouterImg">
						<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-life-preserver" viewBox="0 0 16 16">
							<path d="M8 16A8 8 0 1 0 8 0a8 8 0 0 0 0 16m6.43-5.228a7.03 7.03 0 0 1-3.658 3.658l-1.115-2.788a4 4 0 0 0 1.985-1.985zM5.228 14.43a7.03 7.03 0 0 1-3.658-3.658l2.788-1.115a4 4 0 0 0 1.985 1.985zm9.202-9.202-2.788 1.115a4 4 0 0 0-1.985-1.985l1.115-2.788a7.03 7.03 0 0 1 3.658 3.658m-8.087-.87a4 4 0 0 0-1.985 1.985L1.57 5.228A7.03 7.03 0 0 1 5.228 1.57zM8 11a3 3 0 1 1 0-6 3 3 0 0 1 0 6"/>
						</svg>
					</div>
					<div class="textBox">{{ $t('soccer') }}</div>
				</div>
			</router-link>
			<router-link to="/basketball" :class="{ active: isActive('/basketball') }" class="router-link">
				<div class="pcRouterBox">
					<div class="pcRouterImg">
						<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" class="bi bi-dribbble" viewBox="0 0 16 16">
							<path fill-rule="evenodd" d="M8 0C3.584 0 0 3.584 0 8s3.584 8 8 8c4.408 0 8-3.584 8-8s-3.592-8-8-8m5.284 3.688a6.8 6.8 0 0 1 1.545 4.251c-.226-.043-2.482-.503-4.755-.217-.052-.112-.096-.234-.148-.355-.139-.33-.295-.668-.451-.99 2.516-1.023 3.662-2.498 3.81-2.69zM8 1.18c1.735 0 3.323.65 4.53 1.718-.122.174-1.155 1.553-3.584 2.464-1.12-2.056-2.36-3.74-2.551-4A7 7 0 0 1 8 1.18m-2.907.642A43 43 0 0 1 7.627 5.77c-3.193.85-6.013.833-6.317.833a6.87 6.87 0 0 1 3.783-4.78zM1.163 8.01V7.8c.295.01 3.61.053 7.02-.971.199.381.381.772.555 1.162l-.27.078c-3.522 1.137-5.396 4.243-5.553 4.504a6.82 6.82 0 0 1-1.752-4.564zM8 14.837a6.8 6.8 0 0 1-4.19-1.44c.12-.252 1.509-2.924 5.361-4.269.018-.009.026-.009.044-.017a28.3 28.3 0 0 1 1.457 5.18A6.7 6.7 0 0 1 8 14.837m3.81-1.171c-.07-.417-.435-2.412-1.328-4.868 2.143-.338 4.017.217 4.251.295a6.77 6.77 0 0 1-2.924 4.573z"/>
						</svg>
					</div>
					<div class="textBox">{{ $t('basketball') }}</div>
				</div>
			</router-link>
		</div>
	</header>
	<!-- <div class="headerBd p-3">
		<div class="headerBox2 two">
          <div class="bodyTitleBox">
            <button type="button" class="btn btnBox" @click="selectMatch(null)">{{$t('AllEvents')}}</button>
            <button type="button" class="btn btnBox" @click="liveSelectMatch(true)">{{$t('Live')}}</button>
            <button type="button" class="btn btnBox">{{$t('Finished')}}</button>
            <button type="button" class="btn btnBox">{{$t('Schedule')}}</button>
          </div>
          <div class="bodyTitleBox">
            <input type="checkbox" v-model="isCheck" /> 
            <div class="m-2">{{$t('TimeSorting')}}</div>
          </div>
        </div>
	</div> -->
</template>

<script>
	import matchesSoccer from '@/matches.json';

    export default {
		name: 'HeadView',
		emits: ['select-match'],
		data(){
			return{
				searchTerm:"",
				searchResults :[],
			}
		},
		watch: {
			searchTerm(newTerm) {
				console.log(this.filterMatches(newTerm))
				this.searchResults = this.filterMatches(newTerm);
			}
		},
        methods: {
			selectMatch(id) {
				this.$emit('select-match', id);
			},
            setLocale(locale) {
				this.$i18n.locale = locale;
            },
			isActive(route) {
				return this.$route.path === route;
			},
			filterMatches(term) {
				return matchesSoccer.filter(match => {
					const matchName = match.matchName || "";
					const matchNameEn = match.matchNameEn || "";
					return matchName.includes(term) || matchNameEn.includes(term);
				});
			},
			performSearch() {
				this.searchResults = this.filterMatches(this.searchTerm);
			}
			// selectMatch(id) {
			// 	this.$emit('select-match', id);
			// },
			// liveSelectMatch(value){
			// 	this.isLive = value;
			// 	this.selectedMatchID = null;
			// }
        },
		
    }
</script>

<style lang="scss">

	header{
		height: 40px; /*K*/
		background: #0b998d;  /* fallback for old browsers */
		background-size: contain;
	}

	.headerBd{
		display: flex;
		justify-content: center;
	}

	.headerBox1{
		width: 1200px;
		display: flex;
		justify-content: space-between;
	}

	.headerBox2{
		width: 1200px;
		display: flex;
		align-items: center;

		.pcRouterBox{
			display: flex;
			// color: #ffffff;
			align-items: flex-start;
			gap: 5px;
			

			.textBox{
				display: flex;
				align-items: flex-end;
				font-size: 0.9rem;
				text-decoration: none;
				margin: 5px 5px 0px 5px;
			}

			.pcRouterImg{
				width: 17px;
				height: 17px;
				margin: 3px -5px 0px 0px;
			}
		}
	}

	.headerBox2.two{
		justify-content: space-between;
	}

	.btnBox{
		display: flex;
		flex-direction:row;
		height: 100%;
		color: rgb(0, 0, 0);
		
		.btn{
			white-space: nowrap;
			height: 2rem;
			padding: 2px 15px 2px 15px;
		}
	}

	.language{
		color: #FFF;
	}

	.imgBox{
		height: 30px;
	}

	
	.router-link {
		color: #FFF;
		text-decoration: none;
		margin: 0px 10px 0px 10px;
		// padding: 10px 15px;
		// border-radius: 5px;
		// color: white; /* 默认文字颜色 */
	}

	.router-link.active {
		// background-color: black; /* 活动项背景颜色 */
		color: #0b998d;
		background-color: #f5f5f5;
		border-radius: 5px 5px 0px 0px;
		padding: 4px 8px 12px 8px;
		font-size: 0.9rem;
		text-decoration: none;
		margin: 10px 10px 0px 10px;
	}

	.btn {
		background: none;
		border: none;
		color: white;
		border-color: #ffffff;
	}

	.btn.text-light {
		color: white;
	}

	.textbtn {
		background: none;
		border: none;
		font-size: 0.9rem;
	}




</style>