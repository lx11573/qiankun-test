/**
 * @Author lv
 * @Date 2021/6/30 4:19 下午
 */
/*
 * @Author: lyu
 * @Date: 2021-03-26 15:54:16
 * @LastEditTime: 2021-06-30 16:17:31
 * @LastEditors: lyu
 * @FilePath: /payment-vue-element/src/permission.js
 */
import router from './router'

// if (process.env.NODE_ENV !== 'production') {
// }
router.beforeEach((to, from, next) => {
	console.log('main-router')
	// start progress bar
	// set page title
	document.title = to.meta.title || '这是name'
	next()
})

router.afterEach(() => {
	// finish progress bar

})
