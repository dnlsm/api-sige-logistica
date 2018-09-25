<template>
	<div>
		<div class="navbar has-shadow">
			<div class="navbar-brand">
				<a class="navbar-burger">
					<span aria-hidden="true"></span>
					<span aria-hidden="true"></span>
					<span aria-hidden="true"></span>
				</a>
			</div>
			<div class="navbar-menu">
				<div class="navbar-start">
					<router-link
							tag="a"
							to="/"
							class="navbar-item"
							:class="{'is-selected-tab': $router.currentRoute.path == '/'}">
						Inicio
					</router-link>
					<router-link
							tag="a"
							to="/items"
							class="navbar-item"
							:class="{'is-selected-tab': $router.currentRoute.path == '/items'}">
						Amostras
					</router-link>
					<router-link 
							tag="a"
							to="/transports"
							class="navbar-item"
							:class="{'is-selected-tab': $router.currentRoute.path == '/transports'}">
						Transportes
					</router-link>
					<router-link
							tag="a"
							to="/protocols"
							class="navbar-item"
							:class="{'is-selected-tab': $router.currentRoute.path == '/protocols'}">
						Protocolos
					</router-link>
					<router-link
							tag="a"
							to="/users"
							class="navbar-item"
							:class="{'is-selected-tab': $router.currentRoute.path == '/users'}">
						Usuários
					</router-link>
				</div>
				<div class="navbar-end">					
					<router-link
							tag="p"
							to="/login"
							class="navbar-item"
							:class="{'is-selected-tab': $router.currentRoute.path == '/login'}">
						<a href="" class="button">
						Entrar
						</a> 
					</router-link>
				</div>
			</div>
		</div>
		<progress class="progress is-danger is-flat is-very-small is-animated"
					:value="progress"
					max="100"
					:class="{'hide-progress-bar':!inLoading}"></progress>
		{{progress}}
		<br>
		<keep-alive>
			<router-view class="container" :objects="objects" v-if="!inLoading">
			</router-view>
		</keep-alive>
	</div>
</template>
<script type="text/javascript">

	export default {
		created() {
			var _token = localStorage.getItem('token')
			var vm = this
			new Promise((compute)=> compute(null))
				.then(()=> vm.inLoading = true)
				.then(()=> vm.loadUserData())
				.catch(()=>console.log('ERRO DE AUTENTICAÇÃO'))
				.then(()=> console.log('OK'))
				.then(()=> vm.loadAllUsers())
				.then(()=> vm.loadAllItems())
				.then(()=> vm.loadAllTransportations())
				.then(()=> vm.loadAllProtocols())
				.catch(()=>console.log('ERRO NÃO IDENTIFICADO'))
				.then(()=> vm.inLoading = false)
		},
		data: function(){
			return {
				inLoading: true,
				objects: [],
				loadStatus:{
					protocol: false,
					transportation: false,
					item: false,
					user: false,
					movement: false,
					userData: false
				}
			}
		},
		methods:{
			computeProgress: function(type){
				console.log('PROGRESS')
				switch (type){
					case 'PROTOCOL':
						this.loadStatus.protocol = true
						break;
					case 'TRANSPORTATION':
						this.loadStatus.transportation = true
						break;
					case 'ITEM':
						this.loadStatus.item = true
						break;
					case 'USER':
						this.loadStatus.user = true
						break;
					case 'MOVEMENT':
						this.loadStatus.movement = true
						break;
					case 'USER_DATA':
						this.loadStatus.userData = true
						break;
					default:
				}
			},
			loadAllUsers: function (token = localStorage.getItem('token')) {
				var vm = this
				return vm.getRequest(`/api/inner/user/list?token=${token}`)
					.then(response => vm.parseObjects(response.body))
					.then(response => vm.computeProgress('USER'))
			},
			loadAllItems: function (token = localStorage.getItem('token')) {
				var vm = this
				return vm.getRequest(`/api/inner/item/list?token=${token}`)
					.then(response => vm.parseObjects(response.body))
					.then(response => vm.computeProgress('ITEM'))
			},
			loadAllTransportations: function (token = localStorage.getItem('token')) {
				var vm = this
				return vm.getRequest(`/api/inner/transportation/list?token=${token}`)
					.then(response => vm.parseObjects(response.body))
					.then(response => vm.computeProgress('TRANSPORTATION'))
			},
			loadAllProtocols: function (token = localStorage.getItem('token')) {
				var vm = this
				return vm.getRequest(`/api/inner/protocol/list?token=${token}`)
					.then(response => vm.parseObjects(response.body))
					.then(response => vm.computeProgress('PROTOCOL'))
			},
			loadUserData: function (token = localStorage.getItem('token')){
				var vm = this
				return vm.getRequest(`/api/inner?token=${token}`)
					.then(response => vm.computeProgress('USER_DATA'))
			},
			getRequest: function (url) {
				var vm = this
				return vm.$http.get(url)
			},
			parseObjects: function(response){
				for(var object of response.return){
					this.objects.push(object)
				}
			},
			findUser: function(login){
				return this.objects
							.filter((el)=> el.type == "USER")
							.find((el)=> el.login == login)
			}
		},
		computed:{
			progress: function(){
				console.log('PROGESS COMPUTADE')
				var i = 0, vm = this;
				if (vm.loadStatus.protocol) i++;
				if (vm.loadStatus.transportation) i++;
				if (vm.loadStatus.item) i++;
				if (vm.loadStatus.user) i++;
				if (vm.loadStatus.movement) i++;
				if (vm.loadStatus.userData) i++;

				return (i/5)*100
			}
		}
	}
</script>


<style lang="scss">
@import '~bulma';

.navbar-item{
	transition: background 0.3s;
}

.hide-progress-bar{
	transition: opacity 0.5s;
	transition-delay: 1s;
	opacity: 0;
}


.is-selected-tab {
	background:  lighten($primary, 2%)
}
.is-selected-tab:hover {
	background:  lighten($primary, 7%) !important
}
.is-animated[value]::-webkit-progress-value{
	transition: width 0.6s !important
}
.is-very-small{
	height: 4px !important
}
.is-flat{
	border-radius: 1px !important
}
</style>

