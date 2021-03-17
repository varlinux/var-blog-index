<template>
  <div class="detail-content">
    <div class="detail-back">
      <el-button class="border-0" icon="el-icon-d-arrow-left" @click="goBack"
        >返回</el-button
      >
    </div>
    <div class="detail-con-title">
      <h1>{{ detail.atc_title }}</h1>
    </div>
    <div class="detail-con-info color-a7a7a7 font-0-8">
      <div class="detail-con-date" v-if="detail.atc_edit_time || detail.atc_create_time">
        <span class="el-icon-date">最后修于： {{ detail.atc_edit_time || detail.atc_create_time}}</span>
      </div>
      <div class="detail-con-author" v-if="detail.atc_author">
        <span class="el-icon-user-solid">作者：{{ detail.atc_author }}</span>
      </div>
    </div>
    <md-viewer ref="content" :viewerText="transContent(detail.atc_content)" />
  </div>
</template>

<script>
import MdViewer from "../components/MdViewer";
import {reverseTrans} from '@/utils/CharacterUtils';

export default {
  inject: ['reload'],
  data() {
    return {
      isStart: false,
      list: [],
      detail: {},
      id: "",
      isEditing: false
    };
  },
  components: {
    MdViewer,
  },
  computed: {
    transContent: () => content => reverseTrans(content)
  },
  watch: {
    $route: function (to, from) {
      console.log(to.path, from.path);
      if (!to.path || !from.path) {
        this.$router.push(to.path || from.path);
      }
    },
  },
  beforeMount() {
    window.addEventListener("beforeunload", this.preventNav)
    this.$once("hook:beforeDestroy", () => {
      window.removeEventListener("beforeunload", this.preventNav);
    })
  },
  beforeRouteLeave(to, from, next) {
    if (this.isEditing) {
      if (!window.confirm("您真的要离开当前页吗?")) {
        return;
      }
    }
    next();
  },
  mounted() {
    const query = this.$route.query;
    console.log(`query : `, query)
    if (query && query.hasOwnProperty("atc_id")) {
      this.id = query.atc_id;
      this.getDetail();
    }
  },
  methods: {
    init() {
      return new Promise(resolve => {
        if (!isNullForObject(this.$route.query)) {
          const {atc_id} = this.$route.query
          resolve(atc_id)
        }
      })
    },
    goBack() {
      return this.$router.push("/article");
    },
    getDetail() {
      const formData = {
        atc_id: this.id,
      };
      this.$store.dispatch("article/getByObj", formData).then((res) => {
        if (res && res._data) {
          const {_data}  = res
          this.detail = _data[0]
        }
      });
    },
    preventNav(event) {
      if (!this.isEditing) return
      event.preventDefault()
      event.returnValue = ""
    },
  },
  directives: {},
};
</script>

<style scoped lang="sass">
@import "~@/assets/style/views/article/detail"
</style>
