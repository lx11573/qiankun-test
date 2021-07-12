import Vue from 'vue'
import App from './App'
import router from './router'
// a modern alternative to CSS resets
import 'normalize.css'
import './permission'
import { registerMicroApps, /*start, initGlobalState*/ } from 'qiankun'


import Element from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css';
Vue.use(Element, { size: 'medium' })
Vue.config.productionTip = false

let loadingService = null
const loader = loading => {
  if (loading) {
    loadingService = Element.Loading.service({
      fullscreen: true,
      lock: true,
      text: 'router-loading',
      background: 'rgba(0,0,0,.3)'
    })
  } else {
    loadingService && loadingService.close()
    loadingService = null
  }
}
registerMicroApps([
    // {
    //   name: 'vue',
    //   entry: '//localhost:8798',
    //   container: '#child-container',
    //   activeRule: '/vue',
    //   props: { router },
    //   loader
    // },
    {
      name: 'san',
      entry: '//localhost:8899',
      container: '#child-container',
      activeRule: '/san',
      props: { router },
      loader
    }
  ],
  {
    beforeMount: [(app, globalData) => console.log('before mount', app, globalData)],
  });


new Vue({
  el: '#container',
  router,
  render: h => h(App)
})

