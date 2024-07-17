<template>
    <headView @select-match="handleSelectMatch"/>
    <div class="bodyBd">
    <div class="bodyBox">
      <!-- 側邊攔在這 -->
      <!-- <div>
        <div>123</div>
        <div>123</div>
        <div>123</div>
        <div>123</div>
      </div> -->
      <!-- 表格內容在這邊 -->
      <div class="">
        <div class="bannerBox" data-v-d4c6fef0=""><img src="../../assets/banner/scoreBanner_01s_990x102.jpg" class="banner" data-v-d4c6fef0=""><i class="iconfont icon-guanbi close" data-v-d4c6fef0=""></i></div>
        <div class="area_score">
        <div class="w-100">
          <div class="mbodyTitle">
            <div class="bodyTitleBox">
              <!-- <button type="button" @click="handleSelectMatch(null)" class="btn btnBox">{{$t('AllEvents')}}</button>
              <button type="button" @click="liveSelectMatch(true)" class="btn btnBox">{{$t('Live')}}</button> -->
              <button type="button" class="btn btnBox" :class="{ active: selectedButton === 'allEvents' }" @click="selectButton('allEvents')">{{$t('AllEvents')}}</button>
              <button type="button" class="btn btnBox" :class="{ active: selectedButton === 'live' }" @click="selectButton('live')">{{$t('Live')}}</button>
              <button type="button" class="btn btnBox" :class="{ active: selectedButton === 'finished' }" @click="selectButton('finished')">{{$t('Finished')}}</button>
              <button type="button" class="btn btnBox" :class="{ active: selectedButton === 'schedule' }" @click="selectButton('schedule')">{{$t('Schedule')}}</button>
              
              <!-- <button type="button" class="btn btnBox" :class="{ active: selectedButton === 'allEvents' }" @click="handleSelectMatch(null)">{{$t('AllEvents')}}</button>
              <button type="button" class="btn btnBox" :class="{ active: selectedButton === 'live' }" @click="liveSelectMatch(true)">{{$t('Live')}}</button>
              <button type="button" class="btn btnBox" :class="{ active: selectedButton === 'finished' }" @click="selectButton('finished')">{{$t('Finished')}}</button>
              <button type="button" class="btn btnBox" :class="{ active: selectedButton === 'schedule' }" @click="selectButton('schedule')">{{$t('Schedule')}}</button> -->
            </div>
            <div class="bodyTitleBox">
              <div class="bodyTitleTime px-2">
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-clock" viewBox="0 0 16 16">
                  <path d="M8 3.5a.5.5 0 0 0-1 0V9a.5.5 0 0 0 .252.434l3.5 2a.5.5 0 0 0 .496-.868L8 8.71z"/>
                  <path d="M8 16A8 8 0 1 0 8 0a8 8 0 0 0 0 16m7-8A7 7 0 1 1 1 8a7 7 0 0 1 14 0"/>
                </svg>
              </div>
            </div>
          </div>
        </div>
        <div class="mbodyList">
          <div v-for="match in filteredMatches" :key="match.matchsID">
            <div class="mbodyListTitle">
              <div class="mbodyListTitleLeft">
                <!-- <div class="">
                  <input type="checkbox" value="None" :id="match.matchsID" name="check" />
                  <label :for="match.matchsID"></label>
                </div> -->
                <!-- 聯賽名稱 -->
                <div v-if="this.$i18n.locale === 'en'" class="leftBox">
                  {{ match.matchNameEn }}
                </div>
                <div v-else class="leftBox">
                  {{ match.matchName }}
                </div>
              </div>
              <div class="mbodyListTitleright">
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-people-fill" viewBox="0 0 16 16">
                  <path d="M7 14s-1 0-1-1 1-4 5-4 5 3 5 4-1 1-1 1zm4-6a3 3 0 1 0 0-6 3 3 0 0 0 0 6m-5.784 6A2.24 2.24 0 0 1 5 13c0-1.355.68-2.75 1.936-3.72A6.3 6.3 0 0 0 5 9c-4 0-5 3-5 4s1 1 1 1zM4.5 8a2.5 2.5 0 1 0 0-5 2.5 2.5 0 0 0 0 5"/>
                </svg>
              </div>
            </div>
            <div v-for="item in match.matchList" :key="item.matchID" class="mbodyListBox mbodyListLine">
              <div class="mColumnW18">
                <div>{{ item.matchTime }}</div>
                <div v-if="this.$i18n.locale === 'en'">{{ item.statusEn }}</div>
                <div v-else>{{ item.status }}</div>
              </div>
              <div class="mColumnW62 leftBox">
                <div v-if="this.$i18n.locale === 'en'">{{ item.team1.nameEn }}</div>
                <div v-else>{{ item.team1.name }}</div>
                <div v-if="this.$i18n.locale === 'en'">{{ item.team2.nameEn }}</div>
                <div v-else>{{ item.team2.name }}</div>
              </div>
              <div class="mColumnW10 rightBox">
                <div v-if="item.isLive == true">
                  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-collection-play" viewBox="0 0 16 16">
                    <path d="M2 3a.5.5 0 0 0 .5.5h11a.5.5 0 0 0 0-1h-11A.5.5 0 0 0 2 3m2-2a.5.5 0 0 0 .5.5h7a.5.5 0 0 0 0-1h-7A.5.5 0 0 0 4 1m2.765 5.576A.5.5 0 0 0 6 7v5a.5.5 0 0 0 .765.424l4-2.5a.5.5 0 0 0 0-.848z"/>
                    <path d="M1.5 14.5A1.5 1.5 0 0 1 0 13V6a1.5 1.5 0 0 1 1.5-1.5h13A1.5 1.5 0 0 1 16 6v7a1.5 1.5 0 0 1-1.5 1.5zm13-1a.5.5 0 0 0 .5-.5V6a.5.5 0 0 0-.5-.5h-13A.5.5 0 0 0 1 6v7a.5.5 0 0 0 .5.5z"/>
                  </svg>
                </div>
              </div>

              <div class="mColumnW10 mrightBox">
                <div>{{ item.team1.score }}</div>
                <div>{{ item.team2.score }}</div>
              </div>
              <div class=""></div>
            </div>
          </div>
        </div>
      </div>
      </div>
    </div>
  </div>
  
</template>

<script>
// @ is an alias to /src
import headView from '@/components/m/mHeadView.vue'
import matches from '@/matches.json'

export default {
  name: 'mHomeView',
  data(){
    return{
      selectedMatchID:null,
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
    headView
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
  padding: 10px 10px 0px 10px;
}

.bodyBox{
  width: 1200px;
	display: flex;
	justify-content: space-between;
}

.mbodyTitle{
  display: flex;
  justify-content: space-between;
}

.bodyTitleBox{
  display: flex;
  align-items: center;
  white-space: nowrap;
  font-size: 0.9rem;

  .btnBox{
    color: #222;
    font-size: 0.9rem;
  }

  .bodyTitleTime{
    padding-left: 1rem;
    box-shadow: -5px 0 6px -5px rgba(0, 0, 0, .2);
  }

  .bodyTitleTime :active{
    color: aqua;
  }
  
}




.mbodyListTitle{
  text-align: start;
}

.mbodyList{
  display: flex;
  flex-direction:column;

  .mbodyListTitle{
    display: flex;
    justify-content: space-between;
    background: #f1f1f1;
    padding: 1px 0.5rem 1px 0.5rem;

    .mbodyListTitleLeft{
      display: flex;
      gap:1rem;

      .leftBox{
        display: flex;
        align-items: center;
      }
    }

    .mbodyListTitleright{
      display: flex;
      align-items: center;
    }
  }
}

.roundedOne {
  width: 28px;
  height: 28px;
  position: relative;
  margin: 3px auto;
  background: #fcfff4;
  background: linear-gradient(to top, #fcfff4 0%, #dfe5d7 40%, #b3bead 100%);
  border-radius: 50px;
  box-shadow: inset 0px 1px 1px white, 0px 1px 3px rgba(0,0,0,0.5);
}

.roundedOne label {
  width: 20px;
  height: 20px;
  cursor: pointer;
  position: absolute;
  left: 4px;
  top: 4px;
  background: #ff0; /* 这里直接使用颜色值 */
  border-radius: 50px;
  box-shadow: inset 0px 1px 1px white, 0px 1px 3px rgba(0,0,0,0.5);
}

.roundedOne label::after {
  content: '';
  width: 16px;
  height: 16px;
  position: absolute;
  top: 2px;
  left: 2px;
  background: linear-gradient(to top, #222 0%, #45484d 100%);
  opacity: 0;
  border-radius: 50px;
  box-shadow: inset 0px 1px 1px rgba(0,0,0,0.5), 0px 1px 0px rgba(255,255,255,1);
}

.roundedOne label:hover::after {
  opacity: 0.3;
}

.roundedOne input[type=checkbox] {
  visibility: hidden;
}

.roundedOne input[type=checkbox]:checked + label::after {
  opacity: 1;
}

.mbodyListLine{
  border-bottom: 1px solid #d8d8d8;
  // margin: 0px 0px 5px 0px;
}

.mbodyListLine:last-child {
  border-bottom: none;
}

.mbodyListBox{
  display: flex;
  // grid-template-columns: repeat(4, 1fr); /* 创建4个等宽的列 */
  // grid-gap: 10px; /* 设置列之间的间距 */
  padding: 2px 1px 2px 1px;
  


  .leftBox{
    display: flex;
    flex-direction:column;
    align-items: start;
  }

  .rightBox{
    display: flex;
    flex-direction:column;
    align-items: end;
    justify-content: center;
    color: red;
  }
  
  .mrightBox{
    display: flex;
    flex-direction:column;
    align-items: end;
    justify-content: center;
    padding-right: 0.5rem;
  }

  .lineBox{
    box-shadow: -5px 0 6px -5px rgba(0, 0, 0, .2);
  }

  .mColumnW18{
    width: 18%;
    font-size: 0.8rem;
  }
  .mColumnW62{
    width: 62%;
    font-size: 0.8rem;
  }
  .mColumnW72{
    width: 72%;
    font-size: 0.8rem;
  }
  .mColumnW10{
    width: 10%;
    font-size: 0.8rem;
  }





}

</style>