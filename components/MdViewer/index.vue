<template>
  <viewer v-if="!!content"
          :initialValue="content"
          height="500px" />
</template>
<script>
  import Vue from 'vue'
  const Viewer = Vue.component('Viewer')
  export default {
    name: 'index',
    data() {
      return {
          content: this.viewerText
      }
    },
    components: {
      viewer: Viewer
    },
    props: {
      viewerText: {
        type: String
        // default: '# Content is Null.\n How about trying again?'
      }
    },
    watch: {
      viewerText: {
        immediate: true,
        handler: function(newVal, oldVal) {
          this.content = newVal
        }
      }
    }
  }
</script>
