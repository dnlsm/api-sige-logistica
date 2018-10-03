
import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

import App from '../app.vue'
import Home from '../views/home_view.vue'
import Login from '../views/login_view.vue'
import Transports from '../views/transports_view.vue'
import Items from '../views/items_view.vue'
import Protocols from '../views/protocols_view.vue'
import Users from '../views/user_view.vue'


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
								meta: { authRequired:true }
							},
							{
								path: 'transports',
								component: Transports,
								meta: { authRequired:true }
							},
							{
								path: 'protocols',
								component: Protocols,
								meta: { authRequired:true }
							},
							{
								path: 'users',
								component: Users,
								meta: { authRequired:true }
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



var router = new VueRouter({routes})

export default router