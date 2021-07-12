<!-- @Author lv -->
<!-- @Date 2021/6/30 3:08 下午 -->
<template>
    <div id="child-container"></div>
</template>

<script>
import { start } from 'qiankun'
export default {
name: "child",
  mounted() {
    this.$nextTick(() => {
      if (!window.qiankunStarted) {
        window.qiankunStarted = true
        start()
      }
    })
  }
}
</script>

<style scoped lang="scss">

</style>
