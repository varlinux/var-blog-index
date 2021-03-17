<template>
  <div class="list-container">
    <list-template 
      :item-list="articleList" 
      @trigger-loading="getArticleList"
      :loading="loading">
      <div class="display-f justify-content-sb">
        <el-button icon="el-icon-d-arrow-left" @click="goBack">返回</el-button>
        <!-- <el-button @click="reload">
          <span>刷新</span>
          <i class="el-icon-refresh-right"></i>
        </el-button> -->
      </div>
    </list-template>
  </div>
</template>

<script>
import { isNullForObject } from "@/utils/ObjectUtils";
import ListTemplate from "@/pages/article/components/ListTemplate";

export default {
  name: "index",
  inject: ["reload"],
  data() {
    return {
      articleList: [],
      pageIndex: 0,
      size: 9,
      loading: true
    };
  },
  watch: {
  },
  components: {
    ListTemplate
  },
  mounted() {
    this.getArticleList();
  },
  methods: {
    getArticleList() {
      const formData = {
        pageIndex: this.pageIndex,
        size: this.size,
        order: "desc"
      };
      return this.$store.dispatch("article/getOrderByLimit", formData).then(res => {
        if (res && res._data) {
          const { _data } = res;
          // this.articleList = _data;
          console.log(`_data : `, _data);
          if (_data.length <= 0) {
            this.$message({
              type: "warning",
              message: "加载不出来更多的文章了！",
            });
            this.loading = false;
          }
          if (this.articleList.length > 0) {
            console.log(`if this.articleList : `, this.articleList);
            this.articleList = Array.from(this.articleList).concat(
              Array.from(_data)
            );
          } else {
            this.articleList = _data;
          }
          this.pageIndex++;
        }
      });
    },
    goBack() {
      return this.$router.go(-1);
    }
  }
};
</script>

<style scoped lang="sass">
@import '~@/assets/style/views/article/list'
</style>
