<template>
	<div>
		<div class="navbar container has-shadow">
			<div class="navbar-brand">
				<a class="navbar-burger">
					<span aria-hidden="true"></span>
					<span aria-hidden="true"></span>
					<span aria-hidden="true"></span>
				</a>
			</div>
			<div class="navbar-menu">
				<div class="navbar-start">
					<router-link tag="a" to="/" class="navbar-item">
						Inicio
					</router-link>
					<router-link tag="a" to="/items" class="navbar-item">
						Amostras
					</router-link>
					<router-link tag="a" to="/transports" class="navbar-item">
						Transportes
					</router-link>
					<router-link tag="a" to="/protocols" class="navbar-item">
						Protocolos
					</router-link>
					<router-link tag="a" to="/users" class="navbar-item">
						Usuários
					</router-link>
				</div>
				<div class="navbar-end">					
					<router-link tag="p" to="/login" class="navbar-item">
						<a href="" class="button">
						Entrar
						</a> 
					</router-link>
				</div>
			</div>
		</div>
		<br>
		<router-view class="container" :objects="objects">
		</router-view>
	</div>
</template>
<script type="text/javascript">
	var objects = []

	export default {
		created() {
			var vm = this

			//done
			vm.$http
			.get(`/api/inner/user/list?token=${localStorage.getItem('token')}`)
			.then(
				function(response){
					console.log('USER')
					response = response.body
					console.log(response)
					for(var object of response.return){
						console.log(object)
						objects.push(object)
					}
				}
			)
			
			//done
			vm.$http
			.get(`/api/inner/item/list?token=${localStorage.getItem('token')}`)
			.then(
				function(response){
					console.log('ITEM')
					response = response.body
					console.log(response)
					for(var object of response.return){
						objects.push(object)
					}
				}
			)

			//done
			vm.$http
			.get(`/api/inner/transportation/list?token=${localStorage.getItem('token')}`)
			.then(
				function(response){
					console.log('TRANSPORTANTION')
					response = response.body
					console.log(response)
					for(var object of response.return){
						objects.push(object)
					}
				}
			)

			//done
			vm.$http
			.get(`/api/inner/protocol/list?token=${localStorage.getItem('token')}`)
			.then(
				function(response){
					console.log('PROTOCOL')
					response = response.body
					console.log(response)
					for(var object of response.return){
						objects.push(object)
					}
				}
			)
		},
		data: function(){
			return {
				objects
			}
		}
	}
</script>


<style>
.item {
	background: "#FF0000"
}
</style>

