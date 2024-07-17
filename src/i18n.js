import { createI18n } from 'vue-i18n'

const messages = {
  en: {
    home: 'Home',
    soccer: 'Soccer',
    basketball: 'Basketball',
    chinese: '中文',
    english: 'English',
    AllEvents: 'All',
    SoccerEvents: 'Soccer',
    BasketballEvents: 'Basketball',
    TimeSorting: 'Time sorting',
    Live: 'Live',
    Finished: 'Finished',
    Schedule: 'Schedule',
    Popular: 'Popular events',
    National: 'National competition',
    Completed: 'Completed schedule',
    Next: 'Next schedule',
    win: 'win',
    handicap: 'handicap',
    total: 'total',
    select_language: 'select_language'
  },
  zh_hk: {
    home: '首頁',
    soccer: '足球',
    basketball: '籃球',
    chinese: '中文',
    english: 'English',
    AllEvents: '全部',
    SoccerEvents: '足球',
    BasketballEvents: '籃球',
    TimeSorting: '時間排序',
    Live: '進行中',
    Finished: '已結束',
    Schedule: '未開始',
    Popular: '熱門賽事',
    National: '國家賽事',
    Completed: '完場賽程',
    Next: '下周賽程',
    win: '獲勝',
    handicap: '讓分',
    total: '總分',
    select_language: '語言選擇'
  },
  zh_cn: {
    home: '首页',
    soccer: '足球',
    basketball: '篮球',
    chinese: '中文',
    english: 'English',
    AllEvents: '全部',
    SoccerEvents: '足球',
    BasketballEvents: '篮球',
    TimeSorting: '时间排序',
    Live: '进行中',
    Finished: '已结束',
    Schedule: '未开始',
    Popular: '热门赛事',
    National: '国家赛事',
    Completed: '完场赛程',
    Next: '下周赛程',
    win: '获胜',
    handicap: '让分',
    total: '總分',
    select_language: '语言选择'
  }
}

const i18n = createI18n({
  locale: 'zh_hk', // 设置默认语言
  messages
})

export default i18n