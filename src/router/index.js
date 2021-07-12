/**
 * @Author lv
 * @Date 2021/6/29 10:47 上午
 */
import Vue from 'vue'
import Router from 'vue-router'
Vue.use(Router)

const router = new Router({
	mode: 'history',
	routes: [
		{
			path: '/',
			name: 'Index',
			redirect: '/qiankun',
			component: () => import('@/index'),
			children: [
				{
					path: 'qiankun',
					name: 'Qiankun',
					component: () => import('@/views/qiankun'),
					children: [
						{
							path: 'page1',
							component: () => import('@/views/qiankun/page1'),
							meta: {
								title: 'page1'
							}
						},

						{
							path: 'page2',
							component: () => import('@/views/qiankun/page2'),
							meta: {
								title: 'page1'
							}
						}
					],
					meta: {
						title: '首页'
					}
				},

				{
					path: '/san/*',
					component: () => import('@/views/child'),
					meta: {
						title: 'san'
					}
				}
			],
			meta: {
				title: '首页'
			}
		}
	]
})
export default router

