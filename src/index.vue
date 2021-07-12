<!-- @Author lv -->
<!-- @Date 2021/7/2 2:50 下午 -->
<template>
  <div>
    <el-menu mode="horizontal" router>
      <el-menu-item index="/qiankun">qiankun 路由</el-menu-item>
      <el-menu-item index="/san/page1">san 路由</el-menu-item>
    </el-menu>
    <router-view></router-view>
  </div>
</template>

<script>
export default {
  name: "index"
}
</script>

<style scoped lang="scss">

</style>
