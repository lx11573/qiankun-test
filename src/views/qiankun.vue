<!-- @Author lv -->
<!-- @Date 2021/6/29 1:46 下午 -->
<template>
  <div>
    <el-button @click="$router.push('/qiankun/page1')">qiankun 页面 1</el-button>
    <el-button @click="$router.push('/qiankun/page2')">qiankun 页面2</el-button>
    <router-view></router-view>
  </div>
</template>

<script>
export default {
name: "IndexVue"
}
</script>

<style scoped lang="scss">

</style>
