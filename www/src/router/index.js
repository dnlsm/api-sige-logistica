
import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

import App from '../app.vue'
import Home from '../views/home_view.vue'
import Login from '../views/login_view.vue'
import Transports from '../views/transportes_view.vue'
import Items from '../views/items_view.vue'
import Protocols from '../views/protocols_view.vue'


var routes	=
				[
					{ 	path:'/',
						component: App,
						children:[
							{
								path: '',
								component: Home,
							},
							{
								path: 'login',
								component: Login,
								meta: { noauth:true }
							},
							{
								path: 'items',
								component: Items,
							},
							{
								path: 'transports',
								component: Transports,
							},
							{
								path: 'protocols',
								component: Protocols
							}

						]

					},
					// {
					// 	path: '/dash',
					// 	component: Dash,
					// 	meta: { auth:true },
					// 	children:[
					// 		{
					// 			path: '',
					// 			component: dashView,
					// 		},
					// 	]
					// }
				]




export default new VueRouter({routes})


// router.beforeEach((to, from, next) => {
// 	const authRequired = to.matched.some((route) => route.meta.auth)
// 	const onlyToAuth = to.matched.some((route)=> route.meta.noauth)
// 	const authed = store.state.user.isAuthorized
// 	console.log('router $$$$$$$$$$$$$$$$$$$$$$$$')
// 	console.log('from')
// 	console.log(from)
// 	console.log('to')
// 	console.log(to)
// 	if (authRequired && !authed) {
// 		next('/login')
// 	}
// 	else if(onlyToAuth && authed){
// 		next('/dash')
// 	}
// 	else {
// 		next()
// 	}
// })