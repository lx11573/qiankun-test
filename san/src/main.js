/*
 * @Author: lyu
 * @Date: 2021-07-10 09:24:04
 * @LastEditors: lyu
 * @FilePath: /qiankun-san/src/main.js
 */
//  import { store } from 'san-store'
// import { builder } from 'san-update'
 import './public-path'
 import { Router } from 'san-router'
 import AppComponent from '@/pages/app.san';
let router;

//  FIXME 重置 setImmediate, 否则 qiankun 中, 视图无法更新
if (window.__POWERED_BY_QIANKUN__) {
	// window.setImmediate = null
}
function render(dom = '#app') {
	// san-router
	 router = new Router();
	 router.add({
		 rule: '/san/page1',
		 Component: AppComponent,
		 target: dom
	 })
	 router.add({
		 rule: '/san/page2',
		 Component: () => import('@/pages/page2'),
		 target: dom
	 })
	 router.setMode('html5')
	 router.listen(() => {
		 console.log('san-router')
	 })
	router.start()

	window.$router = router
	//  san-store
	//  store.raw['initName'] = 'initName'
	// store.addAction('changeInitName', name => builder().set('initName', name))
 }
 export async function bootstrap() {
	 console.log('san bootstrap');
 }
 export async function mount(props = {}) {
	 console.log('san mount')
	 const { container } = props;
	 const dom = container ? container.querySelector('#app') : '#app'
	 render(dom)
	 window.$mainRouter = props.router
 }
 export async function unmount() {
	 console.log('san unmount')
	 router.stop()
	 router = null
	 window.$mainRouter = null
 }

 if (!window.__POWERED_BY_QIANKUN__) {
	 render()
 }
