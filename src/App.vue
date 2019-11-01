<template>
  <div id="app" class="container">
    <div class="columns">
      <PostNav class="column col-3 col-md-4 col-sm-12"></PostNav>
      <div class="divider-vert hide-sm p-0"></div>
      <router-view></router-view>
    </div>
  </div>
</template>

<script>
import PostNav from './components/PostNav.vue'

export default {
  name: 'app',
  components: {
    PostNav
  },
}
</script>

<style>
#app {
  font-family: '微軟正黑體', 'Microsoft JhengHei', '微軟雅黑體', 'Microsoft JhengHei', '思源黑體', 'Noto Sans TC', 'NotoSans', '黑體-繁', 'Heiti TC';
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
