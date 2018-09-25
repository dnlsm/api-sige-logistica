<template>
	<div class="">
		<section class="container">
			<div class="columns is-centered">
				<div class="column is-3">
					<div class="box">
						<div class="has-text-centered">
							<img src="/assets/logo.png">
						</div>
						<br><br>
						<div class="has-text-centered">
							Entrar
						</div>
						<br>
						<div class="">
							<div class="field">
								<div class="control has-icons-left">
									<input  type="text"
											name="username"
											placeholder="Digite o nome de usuário"
											class="input is-rounded"
											v-model="credentials.user"
											@keyup.enter="$refs.submit.click()">
									<span class="icon is-small is-left">
										<i class="fas fa-user"></i>
									</span>
								</div>
							</div>
							<br>
							<div class="field">
								<div class="control has-icons-left">
									<input  type="password"
											name="password"
											ref="password"
											placeholder="Digite a senha"
											class="input is-rounded"
											v-model="credentials.pwd"
											@keyup.enter="$refs.submit.click()">
									<span class="icon is-small is-left">
										<i class="fas fa-lock"></i>
									</span>
								</div>
							</div>
							<br>
							<div class="columns is-centered">
								<a class="button" ref="submit" v-bind:class="state" @click='login(credentials)'>Entrar</a>
							</div>
						</div>
						<br>
					</div>					
				</div>
			</div>
		</section>
	</div>
</template>

<script type="text/javascript">
	
	export default {
		data : ()=>({
				state:{
					"is-loading" : false
				},
				credentials : {
					user : '',
					pwd : ''
				}
		}),
		methods : {
			login(credentials){
				var vm = this

				vm.state['is-loading'] = true;

				var encodedUser = credentials.user.replace(new RegExp('\&','g'),'%26')
				var encodedPassword = credentials.pwd.replace(new RegExp('\&','g'),'%26')

				console.log(`${encodedUser}:${encodedPassword}`)

				vm.$http.get(`/api/auth?usr=${encodedUser}&pwd=${encodedPassword}`)
				.then(
					(response) =>{
						response = response.body
						console.log(response)
						if (response.status_code === 200){
							localStorage.setItem("token", response.return.token)
							//vm.$store.commit('login')
							vm.$router.push('/')
						}
						vm.state['is-loading'] = false
					},
					(error) =>{
						vm.state['is-loading'] = false
					}

				)
			}
		},
	}
</script>

<style type="text/css">

.box {
	border-radius: 1px !important;
}
	
</style>