<template>
    <div class="sisdeBd">
        <div class="sideBox">
            <div class="sideText"> {{ $t('Popular') }} </div>
        </div>
        <div class="sideLine"></div>
        <!-- 迴圈顯示熱門賽事資料 -->
        <div class="sideBox body" v-for="match in matches.slice(0, 10)" :key="match.matchID" @click="selectMatch(match.matchsID)">
            <div class="sideImg">
                <img v-if="this.$route.name === 'soccer'" :src="require(`../assets/event_soccer/${match.matchsID}.png`)" class="h-100">
                <img v-if="this.$route.name === 'basketball'" :src="require(`../assets/event_basket/${match.matchsID}.png`)" class="w-100">
                <img v-if="this.$route.name === 'home'" :src="require(`../assets/event_soccer/${match.matchsID}.png`)" class="h-100">
            </div>
            <div v-if="this.$i18n.locale === 'en'" class="sideText">{{ match.matchNameEn }}</div>
            <div v-else class="sideText">{{ match.matchName }}</div>
        </div>
        <!-- 迴圈顯示國家資料 -->
        <div class="sideBox head">
            <div class="sideText"> {{ $t('National') }}</div>
        </div>
        <div class="sideLine"></div>
        <!-- 熱門國家下拉選單 -->
        <div v-for="(country, index) in topItems" :key="index" class="countryBox">
            <div class="sideBox body" @click="popularCountry(index)">
                <div class="sideImg">
                    <img :src="require(`../assets/nation/${country.en}.svg`)" class="w-100">
                </div>
                <div v-if="this.$i18n.locale === 'zh_hk'" class="sideText">{{ country.zh_hk }}</div>
                <div v-if="this.$i18n.locale === 'en'" class="sideText">{{ country.en }}</div>
                <div v-if="this.$i18n.locale === 'zh_cn'" class="sideText">{{ country.zh_cn }}</div>
            </div>
            <div v-show="popularSelectedCountries.includes(index)" class="matchList">
                <div v-for="match in getMatchesByCountry(country.zh_hk)" :key="match.matchID">
                    <a class="K-dropdown-item text-start" href="#" @click.prevent="selectMatch(match.matchsID)">{{ match.matchName }}</a>
                </div>
            </div>
            <!-- <div class="sideImg">
                <img :src="require(`../assets/nation/${country.en}.svg`)" class="w-100">
            </div> -->
            <!-- 這邊是不同語言顯示在國家 -->
            
            <!-- <button v-if="this.$i18n.locale === 'zh_hk'" class="textbtn dropdown-toggle" type="button" id="dropdownMenuButton1" data-bs-toggle="dropdown" aria-expanded="false">
                {{ country.zh_hk }}
            </button> -->
            <!-- <button v-if="this.$i18n.locale === 'en'" class="textbtn dropdown-toggle" type="button" id="dropdownMenuButton1" data-bs-toggle="dropdown" aria-expanded="false">
                {{ country.en }}
            </button>
            <button v-if="this.$i18n.locale === 'zh_cn'" class="textbtn dropdown-toggle" type="button" id="dropdownMenuButton1" data-bs-toggle="dropdown" aria-expanded="false">
                {{ country.zh_cn }}
            </button>
            <ul class="dropdown-menu" :aria-labelledby="'dropdownMenuButton' + index">
                <li v-for="match in getMatchesByCountry(country.zh_hk)" :key="match.matchID">
                    <a class="K-dropdown-item" href="#" @click="selectMatch(match.matchsID)">{{ match.matchName }}</a>
                </li>
            </ul> -->
        </div>

        <div v-if="items.length > 5" @click="showMore = !showMore" class="sideBox body">
            <div class="sideText">{{ showMore ? '隱藏' : '其他' }}</div>
        </div>
        <!-- 其他國家 -->
        <div v-if="showMore == true">
            <div v-for="(country, index) in items" :key="index" class="countryBox">
                <div class="sideBox body" @click="toggleCountry(index)">
                    <div class="sideImg">
                        <img src="../assets/flag.png" class="w-100">
                    </div>
                    <div v-if="this.$i18n.locale === 'zh_hk'" class="sideText">{{ country }}</div>
                    <div v-if="this.$i18n.locale === 'en'" class="sideText">{{ country }}</div>
                    <div v-if="this.$i18n.locale === 'zh_cn'" class="sideText">{{ country }}</div>
                </div>
                <div v-show="selectedCountries.includes(index)" class="matchList">
                    <div v-for="match in getMatchesByCountry(country)" :key="match.matchID">
                        <a class="K-dropdown-item text-start" href="#" @click.prevent="selectMatch(match.matchsID)">{{ match.matchName }}</a>
                    </div>
                </div>
                <!-- <div class="sideImg">
                    <img src="../assets/flag.png" class="w-100">
                </div>
                <button class="textbtn dropdown-toggle" type="button" id="dropdownMenuButton1" data-bs-toggle="dropdown" aria-expanded="false">
                    {{ country }}
                </button>
                <ul class="dropdown-menu" :aria-labelledby="'dropdownMenuButton' + index">
                    <li v-for="match in getMatchesByCountry(country)" :key="match.matchID">
                        <a class="K-dropdown-item" href="#" @click.prevent="selectMatch(match.matchsID)">{{ match.matchName }}</a>
                    </li>
                </ul> -->
            </div>
        </div>
    </div>
</template>

<script>
import matchesSoccer from '@/matches.json'
import matchesBasketball from '@/basketMatches.json'

export default {
  data() {
    let selectedMatches;
        if (this.$route.name === 'soccer') {
            selectedMatches = matchesSoccer;
        } else if (this.$route.name === 'basketball') {
            selectedMatches = matchesBasketball;
        } else if (this.$route.name === 'home') {
            selectedMatches = matchesSoccer;
        }
    return {
        allMatches: selectedMatches,
        matches: selectedMatches,
        popularSelectedCountries: [],
        selectedCountries: [],
        showMore: false,
        topItems:[{en:'England',zh_hk:'英格蘭',zh_cn:"英格兰"},{en:'Italy',zh_hk:'意大利',zh_cn:"意大利"},{en:'Germany',zh_hk:'德國',zh_cn:"德国"},{en:'Spain',zh_hk:'西班牙',zh_cn:"西班牙"},{en:'France',zh_hk:'法國',zh_cn:"法国"}],
        items: [
        '國際', '歐洲', '美洲', '南美洲', '北美洲', '亞洲', '非洲', '大洋洲', '沙灘', '也門', '千里達及多巴哥', '土耳其', 
        '土庫曼斯坦', '不丹', '中國', '丹麥', '厄瓜多爾', '巴巴多斯', '巴西', '巴拉圭', '巴林', '巴拿馬', '巴勒斯坦', 
        '巴基斯坦', '日本', '比利時', '毛里塔尼亞', '牙買加', '以色列', '加拿大', '加納', '加蓬', '北馬其頓', '北愛爾蘭', 
        '卡塔爾', '古巴', '尼日利亞', '尼日爾', '尼加拉瓜', '尼泊爾', '布基納法索', '布隆迪', '瓦努阿圖', '白俄羅斯', 
        '立陶宛', '伊拉克', '伊朗', '冰島', '匈牙利', '印度', '印度尼西亞', '危地馬拉', '吉布提', '吉爾吉斯', '圭亞那', 
        '多米尼加', '多哥', '安哥拉', '安提瓜和巴布達', '安道爾', '老撾',  '伯利茲', '克羅地亞', '利比利亞', 
        '利比亞', '希臘', '汶萊', '沙地阿拉伯', '貝寧', '坦桑尼亞', '委內瑞拉', '孟加拉', '岡比亞', '拉脫維亞', 
        '法羅群島', '波多黎各', '波黑', '波蘭', '直布羅陀', '肯雅', '芬蘭', '阿美尼亞', '阿根廷', '阿曼', '阿塞拜疆', 
        '阿爾及利亞', '阿爾巴尼亞', '阿魯巴', '阿聯酋', '俄羅斯', '保加利亞', '南非', '哈薩克', '威爾斯', '柬埔寨', 
        '津巴布韋', '洪都拉斯', '玻利維亞', '科威特', '科特迪瓦', '科索沃', '科摩羅', '突尼西亞', '約旦', '美國', 
            '剛果', '剛果民主共和國', '哥倫比亞', '哥斯達黎加', '埃及', '埃塞俄比亞', '庫拉索', '挪威', '格林納達', 
        '格魯吉亞', '泰國', '海地', '烏干達', '烏克蘭', '烏拉圭', '烏茲別克', '秘魯', '納米比亞', '紐西蘭', '索羅門群島', 
        '馬里', '馬來西亞', '馬拉維', '馬達加斯加', '馬爾他', '馬爾代夫', '捷克', '敘利亞', '荷蘭', '莫桑比克', 
        '莱索托', '博茨瓦納', '喀麥隆', '奥地利', '斐濟', '斯里蘭卡', '斯洛文尼亞', '斯洛伐克', '智利', '菲律賓', '越南', 
        '黑山', '塔吉克', '塞內加爾', '塞舌爾', '塞拉里昂', '塞浦路斯', '塞爾維亞',  '愛沙尼亞', '愛爾蘭', 
        '新加坡', '瑞士', '瑞典', '聖馬力諾', '聖基茨和尼維斯', '葡萄牙', '蒙古',  '摩洛哥', '摩爾多瓦', '緬甸', 
        '黎巴嫩', '墨西哥', '澳洲', '盧旺達', '盧森堡', '韓國', '薩爾瓦多', '薩摩亞', '羅馬尼亞', '贊比亞', '蘇丹', 
        '蘇格蘭', '更多內容']
    };
  },
  computed: {
    displayItems() {
      return this.showMore ? this.items : this.items.slice(0, 5);
    }
  },
  methods: {
    selectMatch(id) {
        this.$emit('select-match', id);
    },
    // filterByCountry(country){
    //     this.filteredMatches = this.allMatches.filter(match => match.matchCountry === country);
    // },
    getMatchesByCountry(country) {
        return this.allMatches.filter(match => match.matchCountry === country);
    },
    filterByCountry(index) {
      const country = this.topItems[index];
      this.selectedCountries.splice(index, 1, country);
    },
    toggleCountry(index) {
        if (this.selectedCountries.includes(index)) {
            // this.selectedCountries = this.selectedCountries.filter(i => i !== index);
            this.selectedCountries = [];
            this.popularSelectedCountries = [];
        } else {
            this.selectedCountries = [index];
            this.popularSelectedCountries = [];
        }
    },
    popularCountry(index) {
        if (this.popularSelectedCountries.includes(index)) {
            // this.popularSelectedCountries = this.popularSelectedCountries.filter(i => i !== index);
            this.popularSelectedCountries = [];
            this.selectedCountries = [];
        } else {
            // this.popularSelectedCountries.push(index);
            this.popularSelectedCountries = [index];
            this.selectedCountries = [];
        }
    }
  }
}
</script>

<style lang="scss">
.sisdeBd{
    display: flex;
    flex-direction:column;
    gap:0.3rem;
    padding: 0rem 1rem 0rem 0rem; /*K*/
    width: 22%; /*K*/
}
.sideBox{
    display: flex;
    gap:0.3rem;
    align-items: center;
    height: 1.3rem; /*K*/
}
.sideBox.head{
    margin-top: 2rem;
}
.sideBox.body{

}
.sideBox.body:hover {
    background-color: #d3d3d3; /* 灰色背景 */
    cursor: pointer;
}
.sideBox.up{
    flex-direction:column;
    align-items:start;
}
.sideLine{
    width: 100%;
    height: 1px; 
    background-color: #e0e1e2; 
    margin: 3px 0 3px 0; /*K*/
}
.sideImg{
    display: flex;
    align-items: center;
    width: 20px;
    height: 20px;
}
.sideTitle{
    white-space: nowrap;
    font-size: 0.9rem; /*K*/
    font-weight: bold; /*K*/
    padding: 2px 0px 2px 0px; /*K*/
}

.sideText{
    white-space: nowrap;
    font-size: 0.8rem; /*K*/
    padding: 2px 0px 2px 0px; /*K*/
}

.dropdownContainer {
    margin-bottom: 1rem;
}
label {
    display: block;
    margin-bottom: 0.5rem;
}
select {
    width: 100%;
    padding: 0.5rem;
}

.matchList {
    display: flex;
    flex-direction: column;
    margin-left: 1.5rem;
}

.countryBox {
    display: flex;
    flex-direction: column;
}

.matchList div:hover {
    background-color: #d3d3d3; /* 灰色背景 */
    cursor: pointer;
}
</style>