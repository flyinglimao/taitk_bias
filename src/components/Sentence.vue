<template>
    <div class="sentence" :style="{backgroundColor: color}" @click="show = !show">
        <p :style="{filter: show ? 'blur(1px)' : ''}">
        <slot></slot>
        </p>
        <div class="cover" :style="{backgroundColor: color}" v-show="show">
            <button @click="del()" class="btn btn-error">刪除</button>
        </div>
    </div>
</template>

<script>
export default {
    name: 'Sentence',
    props: {
        color: null,
        del: null,
    },
    data() {
        return {
            show: false
        }
    }
}
</script>

<style scoped>
p {
    margin: 0;
}
.sentence {
    position: relative;
    margin: 10px;
    border-radius: 4px;
    text-align: left;
    padding: 8px;
}
.cover {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
}
.cover button {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translateX(-50%) translateY(-50%);
}
</style>