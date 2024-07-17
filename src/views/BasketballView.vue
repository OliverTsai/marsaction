<template>
  <headView @select-match="handleSelectMatch"/>
  <div class="bodyBd">
    <div class="bodyBox">
      <!-- 側邊攔在這 -->
      <side @select-match="handleSelectMatch" />
      <!-- 表格內容在這邊 -->
      <div class="">
        <div class="bannerBox" data-v-d4c6fef0=""><img src="../assets/banner/scoreBanner_01s_990x102.jpg" class="banner" data-v-d4c6fef0=""><i class="iconfont icon-guanbi close" data-v-d4c6fef0=""></i></div>
        <div class="w-100 area_score">
        <!-- 列表 -->
        <div class="">
          <div class="bodyTitle">
            <div class="bodyTitleBox">
              <button type="button" class="btn btnBox" :class="{ active: selectedButton === 'allEvents' }" @click="selectButton('allEvents')">{{$t('AllEvents')}}</button>
              <button type="button" class="btn btnBox" :class="{ active: selectedButton === 'live' }" @click="selectButton('live')">{{$t('Live')}}</button>
              <button type="button" class="btn btnBox" :class="{ active: selectedButton === 'finished' }" @click="selectButton('finished')">{{$t('Finished')}}</button>
              <button type="button" class="btn btnBox" :class="{ active: selectedButton === 'schedule' }" @click="selectButton('schedule')">{{$t('Schedule')}}</button>
            </div>
            <div class="bodyTitleBox">
              <input type="checkbox" v-model="isCheck" /> 
              <div class="m-2">{{$t('TimeSorting')}}</div>
            </div>
          </div>
        </div>
        <!-- <div class="bodyListBox"> -->
        <div v-for="match in filteredMatches" :key="match.matchID" class="bodyListRow">
          <!-- <div class="bodyListTitle">
            <div v-if="this.$i18n.locale === 'en'" class="bodyListTitle">{{ match.matchNameEn }}</div>
            <div v-else class="bodyListTitle">{{ match.matchName }}</div>
            <div class="bodyListTitle">
              <div class="ColumnW8 titleRight">1</div>
              <div class="ColumnW8 titleRight">X</div>
              <div class="ColumnW8 titleRight">2</div>
            </div>
          </div> -->



          <div class="bodyListTitle">
            <div v-if="this.$i18n.locale === 'en'" class="ColumnW52 bodyListTitle-fontSize">{{ match.matchNameEn }}</div>
            <div v-else class="ColumnW52 bodyListTitle-fontSize">{{ match.matchName }}</div>
            <!-- <div class="ColumnW26"></div> -->
            <div class="ColumnW8"></div>
            <div class="ColumnW8"></div>
            <div class="ColumnW8"></div>
            <div class="ColumnW8"></div>
            <div class="ColumnW10 ColumnCenter">{{ $t('win') }}</div>
            <div class="ColumnW10 ColumnCenter">{{ $t('handicap') }}</div>
            <div class="ColumnW10 ColumnCenter">{{ $t('total') }}</div>
          </div>


          <div v-for="item in match.matchList" :key="item.matchID" class="bodyListBox">
            <div class="ColumnW8">{{ item.matchTime }}</div>
            <div class="ColumnW8" v-if="this.$i18n.locale === 'en'">{{ item.statusEn }}</div>
            <div class="ColumnW8" v-else>{{ item.status }}</div>
            <div class="ColumnW26">
              <div v-if="this.$i18n.locale === 'en'" class="ColumnW26 bodyListLeft">{{ item.team1.nameEn }}</div>
              <div v-else class="ColumnW26 bodyListLeft">{{ item.team1.name }}</div>
              <div v-if="this.$i18n.locale === 'en'" class="ColumnW26 bodyListRight">{{ item.team2.nameEn }}</div>
              <div v-else class="ColumnW26 bodyListRight">{{ item.team2.name }}</div>
            </div>
            <!-- <div v-if="this.$i18n.locale === 'en'" class="ColumnW26 bodyListLeft">{{ item.team1.nameEn }}</div>
            <div v-else class="ColumnW26 bodyListLeft">{{ item.team1.name }}</div> -->
            <div class="ColumnW8">
              <div>{{ item.team1.scoreAll }}</div>
              <div>{{ item.team2.scoreAll }}</div>
            </div>
            <div class="ColumnW8">
              <div>{{ item.team1.score1 }}</div>
              <div>{{ item.team2.score1 }}</div>
            </div>
            <div class="ColumnW8">
              <div>{{ item.team1.score2 }}</div>
              <div>{{ item.team2.score2 }}</div>
            </div>
            <div class="ColumnW8">
              <div>{{ item.team1.score3 }}</div>
              <div>{{ item.team2.score3 }}</div>
            </div>
            <div class="ColumnW8">
              <div>{{ item.team1.score4 }}</div>
              <div>{{ item.team2.score4 }}</div>
            </div>
            <!-- <div class="ColumnW8">{{ item.team1.score }} - {{ item.team2.score }}</div> -->
            <!-- <div v-if="this.$i18n.locale === 'en'" class="ColumnW26 bodyListRight">{{ item.team2.nameEn }}</div>
            <div v-else class="ColumnW26 bodyListRight">{{ item.team2.name }}</div> -->
            <div v-if="item.isLive == true" class="ColumnW8 bodyListLive">
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-collection-play" viewBox="0 0 16 16">
                <path d="M2 3a.5.5 0 0 0 .5.5h11a.5.5 0 0 0 0-1h-11A.5.5 0 0 0 2 3m2-2a.5.5 0 0 0 .5.5h7a.5.5 0 0 0 0-1h-7A.5.5 0 0 0 4 1m2.765 5.576A.5.5 0 0 0 6 7v5a.5.5 0 0 0 .765.424l4-2.5a.5.5 0 0 0 0-.848z"/>
                <path d="M1.5 14.5A1.5 1.5 0 0 1 0 13V6a1.5 1.5 0 0 1 1.5-1.5h13A1.5 1.5 0 0 1 16 6v7a1.5 1.5 0 0 1-1.5 1.5zm13-1a.5.5 0 0 0 .5-.5V6a.5.5 0 0 0-.5-.5h-13A.5.5 0 0 0 1 6v7a.5.5 0 0 0 .5.5z"/>
              </svg>
            </div>
            <div v-else class="ColumnW8">

            </div>
            <div class="ColumnW8">
              {{ item.win }}
            </div>
            <div class="ColumnW8 line">
              <div class="W8-color">
                {{ item.handicapVar }}
              </div>
              {{ item.handicap }}
            </div>
            <div class="ColumnW8 line">
              <div class="W8-color">
                {{ item.totalVar }}
              </div>
              {{ item.total }}
            </div>
          </div>
        </div>
        </div>
      </div>
      <!-- 右邊時間 -->
      <sideTime/>
    </div>
  </div>
  <footView/>
</template>
<script>
// @ is an alias to /src
import headView from '@/components/headView.vue'
import side from '@/components/sideView.vue'
import matches from '@/basketMatches.json'
import sideTime from '@/components/sideRightView.vue'
import footView from '@/components/footView.vue'

export default {
  name: 'HomeView',
  data(){
    return{
      selectedMatchID: null,
      isLive:false,
      isCheck: false,
      selectedButton: 'allEvents',
      matches: matches.map(match => ({ ...match, checked: false })),
      selectedMatches: [] 
    }
  },
  computed: {
    filteredMatches() {
      if (this.selectedMatchID) {
        return this.matches.filter(match => match.matchsID === this.selectedMatchID);
      }
      if (this.selectedButton === 'allEvents') {
        return this.matches;
      }
      if (this.selectedButton === 'live') {
        return this.matches.filter(match =>
          match.matchList.some(item => item.isLive)
        ).map(match => ({
          ...match,
          matchList: match.matchList.filter(item => item.isLive)
        }));
      }
      if (this.selectedButton === 'finished') {
        return this.matches.filter(match =>
          match.matchList.some(item => item.status === '已結束')
        ).map(match => ({
          ...match,
          matchList: match.matchList.filter(item => item.status === '已結束')
        }));
      }
      if (this.selectedButton === 'schedule') {
        return this.matches.filter(match =>
          match.matchList.some(item => item.status === '未开始')
        ).map(match => ({
          ...match,
          matchList: match.matchList.filter(item => item.status === '未开始')
        }));
      }
      return this.matches;
    }
  },
  components: {
    headView,
    side,
    sideTime,
    footView
  },
  methods: {
    handleSelectMatch(id) {
      this.selectedMatchID = id;
      this.isLive = false;
      this.selectedButton = 'allEvents';
    },
    liveSelectMatch(value){
      this.isLive = value;
      this.selectedMatchID = null;
      this.selectedButton = 'live';
    },
    selectButton(button) {
      this.selectedButton = button;
      if (button === 'allEvents') {
        this.handleSelectMatch(null);
      } else if (button === 'live') {
        this.liveSelectMatch(true);
      } else {
        this.isLive = false;
        this.selectedMatchID = null;
      }
    }
  }
}
</script>

<style lang="scss">

.bodyBd{
  display: flex;
	justify-content: center;
  background-color: #f5f5f5; /*K*/
  padding-top: 10px; /*K*/
  padding-bottom: 20px; /*K*/
}

.bodyBox{
  width: 1200px;
	display: flex;
	justify-content: space-between;
}

// .bodyTitle{
//   display: flex;
//   justify-content: space-between;
//   padding: 1rem 0 1rem 0;
// }

// .bodyTitleBox{
//   display: flex;
//   gap:0.2rem;
// }

// .bodyListBox{
//   display: grid;
//   grid-template-columns: repeat(9, 1fr);
//   grid-gap: 10px; /* 设置列之间的间距 */
//   font-size: 0.8rem; /*K*/ 

//   .bodyListRow{
//     display: contents;
//   }

//   .bodyListLeft{
//     text-align:end;
//   }

//   .bodyListRight{
//     text-align:start;
//   }

//   .bodyListLive{
//     color: red;
//   }
// }

// .bodyListTitle{
//   display: flex;
//   background: #f1f1f1;
//   gap:0.8rem;
//   padding: 4px 5px 4px 5px; /*K*/
//   font-size: 0.9rem; /*K*/
// }

.pcListX{
  display: flex;
  justify-content: space-between;
}

// .timeBd{
//   padding: 0rem 0rem 0rem 1rem; /*K*/

//   .timeBox{
//     display: flex;
//     flex-direction:column;

//     .timeText{
//       text-align: start;
//       white-space: nowrap;
//       text-overflow: ellipsis;
//     }

//     .timeText.title{
//       background: #F2F2F2;
//     }
//   }
// }

.btnBox.active {
  // border: 2px solid blue;
  padding: 2px 15px 2px 15px;
  background-color: #eda100 !important;
  color: #ffffff !important;
  height: 2rem;
  font-size: 0.9rem;
  margin: 0px 5px 0px 5px;
}

</style>
