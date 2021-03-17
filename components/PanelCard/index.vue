<template>
  <el-card>
    <div @click="handleClick">
      <el-image class="bgs-60" :src="currentImg"></el-image>
      <div
        class="article-simple-content display-f flex-direction-c justify-content-sb"
      >
        <div>
          <el-tag
            v-for="tag in currentTags"
            :type="tag.tag_color"
            :key="tag.tag_id"
          >
            {{ tag.tag_name }}
          </el-tag>
        </div>
        <div>
          <p class="line-limit-length font-1">{{ item.atc_title }}</p>
          <div class="line-limit-length font-0-6 color-a7a7a7">
            <i class="el-icon-timer"></i>
            <span>发布于：{{ publicDate }} 前</span>
          </div>
        </div>
      </div>
    </div>
  </el-card>
</template>

<script>
import DateUtils from "@/utils/DateUtils";
import ImgConfig from "@/config/ImgConfig";
export default {
  name: "index",
  props: {
    item: {
      type: Object,
      default: {},
    },
    tagList: {
      type: Array,
      default: [],
    },
  },
  computed: {
    currentTags: function () {
      return (tagIds) => {
        if (tagIds) {
          const ids = item.tag_ids.split(",");
          return mapArray(ids, tagList);
        }
      };
    },
    currentImg: function () {
      let imgIsExist,
        imgReg = /!\[.*]\(.*\)/g,
        defaultImg = ImgConfig.headPortrait;
      if (this.item.toString() !== "{}") {
        imgIsExist = this.item.atc_content.match(imgReg);
        return !imgIsExist
          ? defaultImg
          : imgIsExist[0].slice(
              imgIsExist[0].indexOf("http" || "https"),
              imgIsExist[0].length - 1
            );
      }
    },
    publicDate: function () {
      // const date = new Date().getTime() - new Date(this.item.atc_edit_time || this.item.atc_create_time).getTime()
      return DateUtils.autoFormatTimeStamp(
        this.item.atc_edit_time || this.item.atc_create_time
      );
    },
  },
  methods: {
    handleClick() {
      console.log(`click`, this.item);
      return this.$router.push({
        path: "/article/detail",
        query: {
          atc_id: this.item.atc_id,
        },
      });
    },
  },
};
</script>

<style scoped lang="sass">
@import "~@/assets/style/components/PanelCard"
</style>
