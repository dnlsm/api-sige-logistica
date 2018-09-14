import Vue from 'vue'

import VueResource from 'vue-resource'
Vue.use(VueResource)

// import { library } from '@fortawesome/fontawesome-svg-core'
// import { faCoffee } from '@fortawesome/free-solid-svg-icons'
// import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'

// library.add(faCoffee)

// Vue.component('font-awesome-icon', FontAwesomeIcon)


import router from './router'
import store from './store'
import bulma from './style/main.scss'
//require('./style/main.scss')

/* eslint-disable no-new */
const app = new Vue({
	router,
	store
})

var token = localStorage.getItem('token')
if(token){
	app.$http.get(`/api/inner?token=${token}`)
	.then(
		(response)=>{
			response = response.body
			if (response.code === 200){
				store.commit('login')
			}
		},
		(error)=>{
			localStorage.removeItem("token")
		}
	)

}

app.$mount('#app')

