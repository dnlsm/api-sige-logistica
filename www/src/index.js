import Vue from 'vue'
import VueRouter from 'vue-router'
// import VueResource from 'vue-resource'
// import Vuex from 'vuex'

Vue.use(VueRouter)
// Vue.use(VueResource)
// Vue.use(Vuex)

// import { library } from '@fortawesome/fontawesome-svg-core'
// import { faCoffee } from '@fortawesome/free-solid-svg-icons'
// import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'

// library.add(faCoffee)

// Vue.component('font-awesome-icon', FontAwesomeIcon)




// import NotFound from './views/errors/404.vue'
import App from './app.vue'
// import Home from './views/home.vue'
// import Login from './views/login.vue'
// import About from './views/about.vue'
// import Dash from './views/dashboard.vue'




// const store = new Vuex.Store({
// 	state: {
// 		user: 	{
// 					isAuthorized : false
// 				}
// 	},
// 	mutations: {
// 		login (state) {
// 			state.user.isAuthorized = true
// 		},
// 		logout (state){
// 			state.user.isAuthorized = false
// 		}
// 	}
// })




// import dashView from './views/components/dash_view.vue'

// Rotas
const routes = [
	{ 	path:'/',
		component: App,
		// children:[
		// 	{
		// 		path: '',
		// 		component: Home,
		// 	},
		// 	{
		// 		path: 'home',
		// 		component: Home,
		// 	},
		// 	{
		// 		path: 'login',
		// 		component: Login,
		// 		meta: { noauth:true }
		// 	},
		// 	{
		// 		path: 'about',
		// 		component: About,
		// 	},

		// ]

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

const router = new VueRouter({ routes })



// require('./assets/sass/main.scss')

/* eslint-disable no-new */
const app = new Vue({
	router,
	//store
})

// var token = localStorage.getItem('token')
// if(token){
// 	app.$http.get(`/api/validate?token=${token}`)
// 	.then(
// 		(response)=>{
// 			response = response.body
// 			if (response.code === 200){
// 				store.commit('login')
// 			}
// 		},
// 		(error)=>{
// 			localStorage.removeItem("token")
// 		}
// 	)

// }

app.$mount('#app')

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