import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

const store = {
	state: {
		user: 	{
					isAuthorized : false
				}
	},
	mutations: {
		login (state) {
			state.user.isAuthorized = true
		},
		logout (state){
			state.user.isAuthorized = false
		}
	}
}


export default new Vuex.Store(store)