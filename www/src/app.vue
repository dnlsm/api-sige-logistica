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
		<router-view class="container" :objects="objects">
		</router-view>
	</div>
</template>
<script type="text/javascript">
	export default {
		data: function(){
			return {
				objects: [{type:'ITEM'},{type:'ITEM'}]
			}
		}
	}
</script>


<style>
.item {
	background: "#FF0000"
}
</style>

