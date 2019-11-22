<template>
  <nav class="side-nav">
    <div class="accordion">
      <input type="checkbox" id="side-nav-toggle" name="accordion-checkbox" hidden checked>
      <label class="accordion-header show-sm" for="side-nav-toggle">
        文章清單
      </label>
      <div class="accordion-body">
        <div class="accordion" v-for="(category, cid) of categories" :key="'category-' + cid">
          <input :id="'category-toggle-' + cid" type="checkbox" name="accordion-checkbox" hidden="">
          <label class="accordion-header c-hand" :for="'category-toggle-' + cid"><i class="icon icon-arrow-right mr-1"></i>{{ category }}</label>
          <div class="accordion-body">
            <ul class="menu menu-nav">
              <li class="menu-item" v-for="(post, pid) of posts.filter(post => post.category === category)" :key="'post-' + cid + '-' + pid">
                <router-link :to="'/' + post.id">{{ post.title }}</router-link>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>

  </nav>
</template>

<script>
import { PostService } from '../post.model'

export default {
  name: 'PostNav',
  data: function () {
    return {
      posts: null,
      categories: null,
    }
  },
  async created () {
    PostService.getIndex().then(data => {
      data = data.body
      this.posts = data.posts
      this.categories = data.categories
    })
  }
}
</script>

<style scoped>
</style>
