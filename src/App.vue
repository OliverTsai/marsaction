<template>
  <member />
  <!-- <nav>
    <router-link to="/">Home</router-link> |
    <router-link to="/about">About</router-link>
  </nav> -->
  <router-view/>
</template>

<script>
import { provide, onMounted, onBeforeUnmount } from 'vue';
import { store } from './store';
import member from '@/components/memberView.vue'

export default {
  name: 'App',
  components: {
    member
  },
  setup() {
    const handleResize = () => {
      store.value = window.innerWidth <= 768;
    };

    onMounted(() => {
      window.addEventListener('resize', handleResize);
    });

    onBeforeUnmount(() => {
      window.removeEventListener('resize', handleResize);
    });

    provide('store', store);
    
  }
};
</script>

<style lang="scss">

#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

nav {
  padding: 30px;
}

nav a {
  font-weight: bold;
  color: #2c3e50;
}

nav a.router-link-exact-active {
  // color: #42b983;
  color: #0b998d;
  background-color: #f5f5f5;
  border-radius: 5px 5px 0px 0px;
  margin-bottom: -11px;
  padding: 4px 10px 4px 10px;
  text-decoration: none;
  font-size: 1rem;
}

nav .mMenu-link{
  width: 20%;
  float:left;
}

.area_score{
  background-color: #ffffff;
  border-radius: 5px;
  padding: 0px 10px 0px 10px;
}

.area_btn{
  margin: 0px 4px 0px 4px;
}



.bodyTitle{
  display: flex;
  justify-content: space-between;
  padding: 3px 0 3px 0;
}

.bannerBox{
  margin: 0px 0px 10px 0px;

  .banner{
  width: 100%;
  border-radius: 5px;
  }

  .theme-init.football-index-page .page-content-box .rightBox .bannerBox .close[data-v-d4c6fef0] {
    font-size: 18px;
    color: #cfe6f8;
    position: absolute;
    right: 10px;
    top: 6px;
  }

  .iconfont{
    font-family: iconfont !important;
    font-size: 16px;
    font-style: normal;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
  }

  .icon-guanbi{

  }

  .close{

  }
  

}



.input-search {
  background-color: #238b8f;
  // border-top-right-radius: 5px;
  // border-end-end-radius: 5px;
  border:1px solid #ffffff;
  border-radius: 5px;
  height: 2rem;
  color: #ffffff;
  margin: 0px 5px 0px 5px;

  .btn-search{
    position: relative;
    z-index: 2;
    color: #ffffff;
  }

  .input-text {
    // background-color: #215d5f;
    border: 0px solid #ffffff;
    color: #ffffff;
    height: 1.9rem;
    border-radius: 4px;
  }

}

.textScore{
  text-align: right;
}

.imgLogo{
  width: 130px;
  text-align: left;
}

.mimgLogo{
    width: 170px;
    text-align: left;
    // vertical-align: middle;
    display: block;
}

.header-area1 {
    padding: 5px !important;
}

.K-dropdown-item{
  display: block;
  width: 100%;
  padding: var(--bs-dropdown-item-padding-y) var(--bs-dropdown-item-padding-x);
  clear: both;
  font-weight: 400;
  color: var(--bs-dropdown-link-color);
  text-align: inherit;
  text-decoration: none;
  white-space: nowrap;
  background-color: transparent;
  border: 0;
  border-radius: var(--bs-dropdown-item-border-radius, 0);
  font-size: 0.9rem !important;
}




</style>
