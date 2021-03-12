<template>
  <div class="detail-content">
    <el-card>
      <div class="detail-back">
        <el-button
            class="border-0"
            icon="el-icon-d-arrow-left"
            @click="goBack">返回</el-button>
      </div>
      <div class="detail-con-title">
        <h1>{{ detail.atc_title }}</h1>
      </div>
      <div class="detail-con-info">
        <div class="detail-con-date" v-if="detail.atc_edit_time">
          <span class="el-icon-date">最后修： {{ detail.atc_edit_time }}</span>
        </div>
        <div class="detail-con-author" v-if="detail.atc_author">
          <span class="el-icon-user-solid">{{ detail.atc_author}}</span>
        </div>
      </div>
      <md-viewer  ref='content'
                  :viewerText='detail.atc_content' />
    </el-card>
  </div>
</template>

<script>
import MdViewer from '../components/MdViewer'

export default {
  data() {
    return {
      isStart: false,
      list: [],
      detail: {},
    }
  },
  components: {
    MdViewer
  },
  watch: {
  },
  mounted() {
    this.getDetail()
  },
  methods: {
    goBack() {
      return this.$router.push('/article')
    },
    getDetail() {
      const formData = {
        atc_id: this.$route.query.atc_id
      }
      this.$store.dispatch('article/getByObj', formData).then(res => {
        if(res && res._data) {
          this.detail = res._data[0]
        }
      })
    }
  },
  directives: {}
}
</script>

<style scoped lang="sass">
@import "~@/assets/style/views/article/detail"
</style>
