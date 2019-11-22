import Vue from 'vue'
import VueRouter from 'vue-router'
import VueResource from 'vue-resource'

import App from './App.vue'
import Router from './router'
import { PostService } from './post.model'

Vue.config.productionTip = false

Vue.use(VueRouter)
Vue.use(VueResource)

new Vue({
  render: h => h(App),
  router: Router,
  created () {
    PostService.init(this.$http)
  }
}).$mount('#app')
