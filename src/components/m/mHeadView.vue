<template>
    <header class="mheaderBd header-area1">
		<div class="headerBox1">
			<div class="leftBox">
				<div class="">
					<div class="imgBox">
						<a href="#"><img src="../../assets/3388-logo2.png" class="mimgLogo"></a>
					</div>
				</div>
			</div>
			<div class="rightBox">
				<div class="mbtnBox">
					<svg @click="toggleModal" xmlns="http://www.w3.org/2000/svg" width="30" height="30" fill="currentColor" class="bi bi-card-text" viewBox="0 0 16 16">
						<path d="M14.5 3a.5.5 0 0 1 .5.5v9a.5.5 0 0 1-.5.5h-13a.5.5 0 0 1-.5-.5v-9a.5.5 0 0 1 .5-.5zm-13-1A1.5 1.5 0 0 0 0 3.5v9A1.5 1.5 0 0 0 1.5 14h13a1.5 1.5 0 0 0 1.5-1.5v-9A1.5 1.5 0 0 0 14.5 2z"/>
						<path d="M3 5.5a.5.5 0 0 1 .5-.5h9a.5.5 0 0 1 0 1h-9a.5.5 0 0 1-.5-.5M3 8a.5.5 0 0 1 .5-.5h9a.5.5 0 0 1 0 1h-9A.5.5 0 0 1 3 8m0 2.5a.5.5 0 0 1 .5-.5h6a.5.5 0 0 1 0 1h-6a.5.5 0 0 1-.5-.5"/>
					</svg>
				</div>
			</div>
		</div>
	</header>
	<header class="mheaderBd p-2">
		<div class="headerBox2 px-2">
			<!-- <router-link to="/" :class="{ active: isActive('/') }" class="mRouter-link mNavWidth">
				<div class="routerBox mMenu-link">
					<div class="routerImg">
						<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" class="bi bi-house-door" viewBox="0 0 16 16">
							<path d="M8.354 1.146a.5.5 0 0 0-.708 0l-6 6A.5.5 0 0 0 1.5 7.5v7a.5.5 0 0 0 .5.5h4.5a.5.5 0 0 0 .5-.5v-4h2v4a.5.5 0 0 0 .5.5H14a.5.5 0 0 0 .5-.5v-7a.5.5 0 0 0-.146-.354L13 5.793V2.5a.5.5 0 0 0-.5-.5h-1a.5.5 0 0 0-.5.5v1.293zM2.5 14V7.707l5.5-5.5 5.5 5.5V14H10v-4a.5.5 0 0 0-.5-.5h-3a.5.5 0 0 0-.5.5v4z"/>
						</svg>
					</div>
					<p>{{ $t('home') }}</p>
				</div>
			</router-link> -->
			<router-link to="/soccer" :class="{ active: isActive('/soccer') }" class="mRouter-link mNavWidth">
				<div class="routerBox mMenu-link">
					<div class="routerImg">
						<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-life-preserver" viewBox="0 0 16 16">
							<path d="M8 16A8 8 0 1 0 8 0a8 8 0 0 0 0 16m6.43-5.228a7.03 7.03 0 0 1-3.658 3.658l-1.115-2.788a4 4 0 0 0 1.985-1.985zM5.228 14.43a7.03 7.03 0 0 1-3.658-3.658l2.788-1.115a4 4 0 0 0 1.985 1.985zm9.202-9.202-2.788 1.115a4 4 0 0 0-1.985-1.985l1.115-2.788a7.03 7.03 0 0 1 3.658 3.658m-8.087-.87a4 4 0 0 0-1.985 1.985L1.57 5.228A7.03 7.03 0 0 1 5.228 1.57zM8 11a3 3 0 1 1 0-6 3 3 0 0 1 0 6"/>
						</svg>
					</div>
					<p>{{ $t('soccer') }}</p>
					<!-- <button type="button" class="btn text-light">{{ $t('soccer') }}</button> -->
				</div>
			</router-link>
			<router-link to="/basketball" :class="{ active: isActive('/basketball') }" class="mRouter-link mNavWidth">
				<div class="routerBox mMenu-link">
						<div class="routerImg">
						<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" class="bi bi-dribbble" viewBox="0 0 16 16">
							<path fill-rule="evenodd" d="M8 0C3.584 0 0 3.584 0 8s3.584 8 8 8c4.408 0 8-3.584 8-8s-3.592-8-8-8m5.284 3.688a6.8 6.8 0 0 1 1.545 4.251c-.226-.043-2.482-.503-4.755-.217-.052-.112-.096-.234-.148-.355-.139-.33-.295-.668-.451-.99 2.516-1.023 3.662-2.498 3.81-2.69zM8 1.18c1.735 0 3.323.65 4.53 1.718-.122.174-1.155 1.553-3.584 2.464-1.12-2.056-2.36-3.74-2.551-4A7 7 0 0 1 8 1.18m-2.907.642A43 43 0 0 1 7.627 5.77c-3.193.85-6.013.833-6.317.833a6.87 6.87 0 0 1 3.783-4.78zM1.163 8.01V7.8c.295.01 3.61.053 7.02-.971.199.381.381.772.555 1.162l-.27.078c-3.522 1.137-5.396 4.243-5.553 4.504a6.82 6.82 0 0 1-1.752-4.564zM8 14.837a6.8 6.8 0 0 1-4.19-1.44c.12-.252 1.509-2.924 5.361-4.269.018-.009.026-.009.044-.017a28.3 28.3 0 0 1 1.457 5.18A6.7 6.7 0 0 1 8 14.837m3.81-1.171c-.07-.417-.435-2.412-1.328-4.868 2.143-.338 4.017.217 4.251.295a6.77 6.77 0 0 1-2.924 4.573z"/>
						</svg>
					</div>
					<p>{{ $t('basketball') }}</p>
					<!-- <button type="button" class="btn text-light">{{ $t('basketball') }}</button> -->
				</div>
			</router-link>
		</div>
	</header>
	<!-- 语言切换模态框 -->



	<div v-if="isModalVisible" class="modalBox">
      <div class="mmodal-content">
			<span class="mclose " @click="toggleModal">&times;</span>
			<div class="mb-2">{{ $t('select_language') }}</div>
			<div class="modalLine"></div>
		<div class="countryBox msisdeBd">
			<div class="msideBox mbtnTM body">
					<div class="sideImg"><img :src="require(`../../assets/flag/flag_uk.png`)" class="w-100"></div>
					<button class="msideText" @click="changeLanguage('en')">English</button>
			</div>
			<div class="msideBox mbtnTM body">
					<div class="sideImg"><img :src="require(`../../assets/flag/flag_cn.png`)" class="w-100"></div>
					<button class="msideText" @click="changeLanguage('zh_cn')">简体中文</button>
			</div>
			<div class="msideBox mbtnTM body">
					<div class="sideImg"><img :src="require(`../../assets/flag/flag_hk.png`)" class="w-100"></div>
					<button class="msideText" @click="changeLanguage('zh_hk')">繁體中文</button>
			</div>
		</div>
		<!-- <div class="w-100">
			<span class="mclose " @click="toggleModal">&times;</span>
			<div class="mb-2">{{ $t('select_language') }}</div>
			<div class="modalLine"></div>
			<button class="btn px-0 text-left mbtnTM" @click="changeLanguage('en')">English</button>
			<button class="btn px-0 text-left mbtnTM" @click="changeLanguage('zh_cn')">简体中文</button>
			<button class="btn px-0 text-left mbtnTM" @click="changeLanguage('zh_hk')">繁體中文</button>
		</div> -->
        
		<!-- <div class="sideImg"><img src="../../assets/flag_cn.png" class="w-100"><button class="btn px-0 text-left" @click="changeLanguage('en')">English</button></div>
		<div class="sideImg"><img src="../../assets/flag_hk.png" class="w-100"><button class="btn px-0 text-left" @click="changeLanguage('zh_cn')">简体中文</button></div>
        <div class="sideImg"><img src="../../assets/flag_uk.png" class="w-100"><button class="btn px-0 text-left" @click="changeLanguage('zh_hk')">繁體中文</button></div> -->
		<mside @select-match="handleSelectMatch" />
      </div>
    </div>



    <!-- <div v-if="isModalVisible" class="modalBox">
      <div class="mmodal-content">
        <span class="mclose " @click="toggleModal">&times;</span>
        <div class="mb-2">{{ $t('select_language') }}</div>
		<div class="modalLine"></div>
        <button class="btn px-0 text-left btnBox2" @click="changeLanguage('en')">English</button>
		<button class="btn px-0 text-left btnBox2" @click="changeLanguage('zh_cn')">简体中文</button>
        <button class="btn px-0 text-left btnBox2" @click="changeLanguage('zh_hk')">繁體中文</button>
		<mside @select-match="handleSelectMatch" />
      </div>
    </div> -->
</template>

<script>
	import mside from '@/components/m/mSideView.vue';

    export default {
		data() {
			return {
				selectedMatchID: null,
				isModalVisible: false,
			};
		},
		components: {
			mside,
		},
        methods: {
            // setLocale(locale) {
            // 	this.$i18n.locale = locale;
            // },
			toggleModal() {
				this.isModalVisible = !this.isModalVisible;
			},
			changeLanguage(lang) {
				this.$i18n.locale = lang;
				this.toggleModal();
			},
			handleSelectMatch(id) {
				this.$emit('select-match', id);
				this.selectedMatchID = id;
				this.isModalVisible = false;
			},
			isActive(route) {
				return this.$route.path === route;
			}
        }
    }
</script>

<style lang="scss">

	// header{
	// 	height: 60px;
	// 	background: #0b998d;
	// 	background-size: contain;
	// }

	.mheaderBd{
		display: flex;
		justify-content: center;
		height: 3.3rem;
	}

	.headerBox1{
		width: 1200px;
		display: flex;
		justify-content: space-between;
	}

	.headerBox2{
		width: 1200px;
		display: flex;
		// gap:2rem;
		gap:5px; /*K*/
	}

	.routerBox{
		display: flex;
		flex-direction:column;
		align-items: center;

		&.routerImg{
			width: 20px;
			height: 20px;
		}

		&>p{
			font-size: 0.8rem;
		}
	}
	.mbtnBox{
		color: rgb(255, 255, 255);
		padding: 5px 5px 5px 5px;
	}

	.btnBox{
		color: rgb(255, 255, 255);
		// height: 28px;
	}

	.btnBox2{
		color: #000;
		width: 100%;
		text-align: left;
	}

	.language{
		color: #FFF;
	}

	.imgBox{
		height: 30px;
	}

	
	.mRouter-link {
		text-decoration: none;
		padding: 4px 8px 12px 8px;
		border-radius: 5px;
		color: rgb(63 197 185); /* 默认文字颜色 */
		margin-top: 12px;
	}

	.mNavWidth{
		width: 50%;
		padding: 5px 0px 0px 0px;
	}
	
	.mRouter-link.active {
		color: rgb(255, 255, 255); /* 活动项文字颜色 */
	}

	.btn {
		background: none;
		border: none;
		color: black;
	}

	.btn.text-light {
		color: black;
	}

	.modalBox {
		display: block;
		position: fixed;
		z-index: 1;
		left: 0;
		top: 0;
		width: 100%;
		height: 100%;
		overflow: auto;
		background-color: #f9f9f9;
	}

	.mmodal-content {
		display: flex;
		flex-direction:column;
		align-items: flex-start;
		// background-color: #fefefe;
		padding: 0px 5px 10px 10px;
		// border: 1px solid #888;
		width: 100%;

		.mclose{
			margin-left: 95%;
		}
	}
		.modal-content {
			display: flex;
			flex-direction:column;
			align-items: flex-start;
			background-color: #fefefe;
			padding: 20px;
			border: 1px solid #888;
			width: 100%;

			.close{
				margin-left: 95%;
			}
		}
		
	.modalLine{
		width: 100%;
		height: 2px; 
		background-color: #e0e1e2; 
	}

	.close {
		color: #aaa;
		float: right;
		font-size: 28px;
		font-weight: bold;
	}

	.close:hover,
	.close:focus {
	color: black;
	text-decoration: none;
	cursor: pointer;
	}

	.mclose {
		color: #adadad;
		float: right;
		font-size: 28px;
		font-weight: bold;
	}

	.mclose:hover,
	.mclose:focus {
	color: black;
	text-decoration: none;
	cursor: pointer;
	}


.mbtnTM{
	background-color: #ffffff !important;
	color: black;
	border-radius: 3px !important;
	padding: 5px !important;
	margin: 2px 5px 2px 5px;
	width: 96%;
}
.mbtnTM:hover, .mbtnTM:focus {
	background-color: #d4d4d4;
	color: black;
	text-decoration: none;
	cursor: pointer;
	padding: 5px;
	margin: 0px 5px 0px 5px;
	}




</style>