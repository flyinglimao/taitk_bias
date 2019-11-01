import VueRouter from 'vue-router'

import Post from './components/Post.vue'

export default new VueRouter({
    routes: [
        { path: '/:id', component: Post }
    ]
})