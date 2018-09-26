<template>
	<div>
		<div class="navbar is-spaced">
			<div class="container">
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
								tag="span"
								to="/"
								class="navbar-item"
								
								>
							<a class="is-link" :class="{'is-selected-tab': $router.currentRoute.path == '/'}">
								Inicio
							</a>
						</router-link>
						<router-link
								tag="span"
								to="/items"
								class="navbar-item"
								>
							<a class="is-link" :class="{'is-selected-tab': $router.currentRoute.path == '/items'}">
								Amostras
							</a>
						</router-link>
						<router-link 
								tag="span"
								to="/transports"
								class="navbar-item"
								>
							<a class="is-link" :class="{'is-selected-tab': $router.currentRoute.path == '/transports'}">
								Transportes
							</a>
						</router-link>
						<router-link
								tag="span"
								to="/protocols"
								class="navbar-item"
								>
							<a class="is-link" :class="{'is-selected-tab': $router.currentRoute.path == '/protocols'}">
								Protocolos
							</a>
						</router-link>
						<router-link
								tag="span"
								to="/users"
								class="navbar-item"
								>
							<a class="is-link" :class="{'is-selected-tab': $router.currentRoute.path == '/users'}">
								Usuários
							</a>
						</router-link>
					</div>
					<div class="navbar-end">					
						<router-link
								tag="span"
								to="/login"
								class="navbar-item"
								>
							<a class="is-link" :class="{'is-selected-tab': $router.currentRoute.path == '/login'}">
								Entrar
							</a> 
						</router-link>
					</div>
				</div>	
			</div>
		</div>
		<progress class="progress is-danger is-flat is-very-small is-animated"
					:value="progress"
					max="100"
					:class="{'hide-progress-bar':!inLoading}"></progress>
		<br>
<!-- 		<keep-alive> -->
 			<router-view class="container" :objects="objects" v-if="!inLoading" :currentUser="currentUserData">
			</router-view>
<!-- 		</keep-alive> -->
		<div class="container" v-if="inLoading">
			<div class="is-centered has-text-centered">
					<div class="loading-icon"></div>
					<br>
					Carregando...
				
			</div>
		</div>
		<div class="content">
		</div>
		<footer class="footer level">
			<div class="level-left">
				<div class="level-item">
					
					© 2018 CPqD
				</div>
			</div>
			<div class="level-right"></div>
		</footer>
	</div>
</template>
<script type="text/javascript">

	export default {
		created() {
			var _token = localStorage.getItem('token')
				this.loadData()
			if (_token !== null)
				console.log('CREATED')
		},
		data: function(){
			return {
				currentUserData: null,
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
			loadData: function(){
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
					.then(response => vm.currentUserData = response.body.return)
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

.footer {
	padding: 20px
}
.is-link{
	color: #202020;
}
.is-link:hover{
	border-bottom: 1px solid #101010
}

.hide-progress-bar{
	transition: opacity 0.5s;
	transition-delay: 1s;
	opacity: 0;
}


.is-selected-tab {
	border-bottom: 1px solid #101010
}
.is-selected-tab:hover {
	border-bottom: 1px solid #101010
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
.loading-icon {
	animation: spinAround 1000ms infinite linear;
    border: 5px solid $primary;
    border-radius: 300000px;
    border-right-color: transparent;
    border-top-color: transparent;
    display: inline-block;
    height: 5em;
    width: 5em;
}
</style>

