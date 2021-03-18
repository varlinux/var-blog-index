<template>
  <div class="tag-content">
    <el-tag
      :type="item.tag_color"
      v-for="item in this.tagList"
      @click="getArticleByTag(item.tag_id)"
      :key="item.tag_id"
    >
      {{ item.tag_name }}
    </el-tag>
  </div>
</template>

<script>
export default {
  inject: ['goBack'],
  data() {
    return {
      tagType: ["default", "success", "info", "warning", "danger"],
      tagList: [],
    };
  },
  mounted() {
    this.$store.dispatch("tag/getAllTag").then((res) => {
      if (res._code === 200) {
        this.tagList = res._data;
      }
    });
  },
  methods: {
    getArticleByTag(id) {
      this.$router.push('/tag/list/' + id)
    }
  },
};
</script>

<style scoped lang="sass">
@import "~@/assets/style/views/tag"
</style>
