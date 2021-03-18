<template>
  <div class="list-template-container">
    <div class="display-f justify-content-sb">
      <el-button icon="el-icon-d-arrow-left" @click="goBack">返回</el-button>
      <!-- <el-button @click="reload">
          <span>刷新</span>
          <i class="el-icon-refresh-right"></i>
        </el-button> -->
    </div>
    <div class="list-template-main">
      <el-card v-for="item in articleList" :key="item.id">
        <el-image
          class="bgs-60"
          @click="getDetail(item)"
          :src="item.first_img"
        ></el-image>
        <div
          class="article-simple-content display-f flex-direction-c justify-content-sb"
        >
          <div>
            <el-tag
              v-for="tag in item.tags"
              :type="tag.tag_color"
              :key="tag.tag_id"
            >
              {{ tag.tag_name }}
            </el-tag>
          </div>
          <div :id="item.atc_id">
            <p class="line-limit-length">{{ item.atc_title }}</p>
            <p class="line-limit-length color-a7a7a7 font-0-6">
              <i class="el-icon-timer">发布于：{{ publicDate(item) }} 前</i>
            </p>
          </div>
        </div>
      </el-card>
    </div>
    <div class="loading-container">
      <div v-show="loading" class="list-template-loading"></div>
    </div>
  </div>
</template>

<script>
import PanelCard from "@/components/PanelCard";
import DateUtils from "@/utils/DateUtils";
import ImgConfig from "@/config/ImgConfig";

export default {
  name: "index",
  data: ({
    articleList: [],
    tagList: [],
    loading: true
  }),
  computed: {
    publicDate: () => item =>
      DateUtils.autoFormatTimeStamp(item.atc_edit_time || item.atc_create_time)
  },
  components: {
    PanelCard
  },
  watch: {
    itemList: function() {
      return this.appendImg(this.itemList);
    }
  },
  mounted() {
    this.triggerLoading(document.querySelector(".list-template-loading"));
  },
  methods: {
    getDetail: function(data) {
      this.$router.push("/article/detail/" + data.atc_id);
    },
    appendImg(arr) {
      let imgIsExist,
        imgReg = /!\[.*]\(.*\)/g;
      arr.forEach(item => {
        imgIsExist = item.atc_content.match(imgReg);
        item.first_img = !imgIsExist
          ? ImgConfig.headPortrait
          : imgIsExist[0].slice(
              imgIsExist[0].indexOf("http"),
              imgIsExist[0].length - 1
            );
        item.simple_content = item.atc_content.replace(imgReg, "");
      });
      return arr;
    },
    triggerLoading(ele) {
      let timer = null, // 节流定时器
        time = 3; // 3s触发一次
      const intersectionObserver = new IntersectionObserver(entries => {
        if (entries[0].intersectionRatio <= 0) {
          console.log(entries[0].intersectionRatio);
          return;
        }
        if (timer) {
          clearTimeout(timer);
        }
        timer = setTimeout(() => {
          this.$emit("trigger-loading", true);
        }, time * 1000);
      });
      intersectionObserver.observe(ele);
    }
  }
};
</script>

<style scoped lang="sass">
@import "~@/assets/style/views/article/components/list-template"
</style>
