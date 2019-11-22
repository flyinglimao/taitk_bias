<template>
  <div class="column col-9 col-md-8 col-sm-12 d-flex">
    <article>
      <h1>{{ post.title }}</h1>
      <div class="text-left content-area mx-auto">{{ post.content }}
        <PostMark :marks="marks[i]"
          :content="post.content"
          :color="colorSet[i]"
          v-for="(b, i) of keymap"
          v-bind:key="'post-mark-' + b"
          v-show="show[i]"
        />
      </div>
    </article>
    <div class="divider-vert p-0"></div>
    <aside>
      <div class="form-group" style="font-size: 1.6em; font-weight: bold">
        <label 
          v-for="(b, i) of keymap"
          v-bind:key="'show-toggle-' + b">
          <input type="checkbox" v-model="show[i]" class="d-none">
          <span v-show="show[i]" :style="{color: colorSet[i]}">●</span>
          <span v-show="!show[i]" :style="{color: colorSet[i]}">○</span>          
        </label>
        <button class="btn btn-success" @click="saveMarked" :class="{loading: saving}">儲存</button>
      </div>
      <SentenceList :marks="marks" :show="show" :colorSet="colorSet" :content="post.content" />
    </aside>
  </div>
</template>

<script>
import { Post, PostService } from '../post.model'
import PostMark from './PostMark'
import SentenceList from './SentenceList'

export default {
  name: 'Post',
  data () {
    return {
      post: new Post(-1, '', ''),
      marks: [[], [], [], [], []],
      show: [true, true, true, true, true],
      keymap: ['!', '@', '#', '$', '%'],
      colorSet: ['rgba(17, 162, 252, .2)', 'rgba(107, 17, 252, .2)',
                'rgba(252, 17, 45, .2)', 'rgba(252, 225, 17, .2)',
                'rgba(17, 252, 107, .2)',],
      saving: false,
    }
  },
  components: {
    PostMark,
    SentenceList
  },
  methods: {
    saveHotKey (evt) {
      if (!(evt.key === 's' && evt.ctrlKey) && !(evt.which === 19)) return true
      this.saveMarked()
      evt.preventDefault()
      return false
    },
    saveMarked () {
      this.saving = true
      PostService.saveMarked(+this.$route.params.id, this.marks).then(() => this.saving = false)
    },
    keyboardListener(e) {
      let markIndex = this.keymap.indexOf(e.key)
      if ( markIndex !== -1 && !window.getSelection().isCollapsed) {
        let flag = false
        let selection = window.getSelection().getRangeAt(0)

        let drops = []
        let start = selection.startOffset, end = selection.endOffset

        window.getSelection().collapseToStart()
        
        this.marks[markIndex].forEach((set, index) => {
          // if start inside a mark and end out side
          // concat them
          if (selection.startOffset >= set[0] && selection.endOffset <= set[1]) {
            flag = true
          } else if (selection.endOffset >= set[0] && selection.endOffset <= set[1]) {
            drops.push(index)
            end = this.marks[markIndex][index][1]
          } else if (selection.startOffset >= set[0] && selection.startOffset <= set[1]) {
            drops.push(index)
            start = this.marks[markIndex][index][0]
          } else if (selection.startOffset <= set[0] && selection.endOffset >= set[1]) {
            drops.push(index)
          }
        })

        if (flag) return

        drops.sort((a, b) => a < b)
        drops.forEach(i => this.marks[markIndex].splice(i, 1))

        this.marks[markIndex].push([start, end])
        
        this.marks[markIndex].sort((a, b) => a[1] < b[1]) // largest first
      }
    }
  },
  created () {
    PostService.getPost(+this.$route.params.id).then(data => {
      data = data.body
      this.post = data
      data.marks.forEach(rec => {
        this.marks[rec.type].push([rec.start, rec.end])
      })
      this.marks.forEach(set => set.sort((a, b) => a[1] < b[1]))
    })
    document.addEventListener('keyup', this.keyboardListener)
    document.addEventListener('keydown', this.saveHotKey)
    setInterval(this.saveMarked, 10000)
  },
  beforeDestory () {
    document.removeEventListener('keyup', this.keyboardListener)
    document.removeEventListener('keydown', this.saveHotKey)
  },
  watch: {
    '$route'() {
      PostService.getPost(+this.$route.params.id).then(data => {
        data = data.body
        this.post = data
        this.marks = [[], [], [], [], []]
        data.marks.forEach(rec => {
          this.marks[rec.type].push([rec.start, rec.end])
        })
        this.marks.forEach(set => set.sort((a, b) => a[1] < b[1]))
      })
    }
  }
}
</script>

<style scoped>
article {
  max-width: 800px;
  margin-left: 30px;
  max-height: calc(100vh - 60px);
  overflow: auto;
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

aside {
  width: 300px;
  max-height: calc(100vh - 60px);
  overflow: auto;
}
.btn {
  display: block;
  width: calc(100% - 16px);
  margin: 8px;
}
</style>
