<template>
  <div class="column col-9 col-md-8 col-sm-12">
    <article>
      <h1>{{ post.title }}</h1>
      <div class="text-left content-area mx-auto">{{ post.content }}
        <PostMark :marks="marks[i]" :content="post.content" :color="colorSet[i]" v-for="(b, i) of keymap" v-bind:key="'post-mark-' + b"/>
      </div>
    </article>
  </div>
</template>

<script>
import { Post, PostService } from '../post.model'
import PostMark from './PostMark'

export default {
  name: 'Post',
  data () {
    return {
      post: new Post(-1, '', ''),
      marks: [[], [], [], [], []],
      keymap: ['!', '@', '#', '$', '%'],
      colorSet: ['rgba(17, 162, 252, .2)', 'rgba(107, 17, 252, .2)',
                'rgba(252, 17, 45, .2)', 'rgba(252, 225, 17, .2)',
                'rgba(17, 252, 107, .2)',]
    }
  },
  components: {
    PostMark
  },
  methods: {
    keyboardListener(e) {
      let markIndex = this.keymap.indexOf(e.key)
      if ( markIndex !== -1 && !window.getSelection().isCollapsed) {
        let flag = false
        let selection = window.getSelection().getRangeAt(0)

        this.marks[markIndex].forEach(set => {
          // if start inside a mark and end out side
          // concat them
          if (flag) {
            return
          } else if (selection.startOffset >= set[0] && selection.startOffset <= set[1] && selection.endOffset >= set[1]) {
            set[1] = selection.endOffset
            flag = true
          } else if (selection.startOffset <= set[0] && selection.endOffset >= set[0] && selection.endOffset <= set[1]) {
            set[0] = selection.startOffset
            flag = true
          } else if (selection.startOffset <= set[0] && selection.endOffset >= set[1]) {
            set[0] = selection.startOffset
            set[1] = selection.endOffset
            flag = true
          } else if (selection.startOffset >= set[0] && selection.endOffset <= set[1]) {
            flag = true
          }
        })

        if (!flag) {
          this.marks[markIndex].push([selection.startOffset, selection.endOffset])
        }
        this.marks[markIndex].sort((a, b) => a[1] < b[1]) // largest first

        window.getSelection().collapseToStart()
      }
    }
  },
  created () {
    this.post = PostService.getPost(+this.$route.params.id)
    document.addEventListener('keyup', this.keyboardListener)
  },
  beforeDestory () {
    document.removeEventListener('keyup', this.keyboardListener)
  }
}
</script>

<style scoped>
article {
  max-width: 800px;
  margin: 0 auto;
}
.content-area {
  white-space: pre-wrap;
  position: relative;
}
.content-shadow-area {
  width: 100%;
  height: 100%;
  top: 0;
  left: 0;
  position: absolute;
  color: rgba(0, 0, 0, 0);
  user-select: none;
  z-index: -100;
}
.content-shadow-area mark {
  padding: 0;
}
</style>
