<template>
	<div>
		<card-view :rendererOptions="doptions"></card-view>


		<modal
			:class="{'is-active': modal.is_active}"
			v-on:event="event"
			:data="modal.data">
		</modal>

	</div>
</template>

<script type="text/javascript">
	require('../other/array-remove-by-name')
	import eligible_objects from '../mixins/eligible-objects'
	import cardView from '../mixins/card-view.vue'
	import modal from '../mixins/mixins-components/modal.vue'
	import Item from '../components/card.vue'

	export default {
		data: ()=>{
			return{
				modal: {
					is_active: false,
					data : null
				},

			}
		},
		components: {
			cardView,
			modal
		},
		props: { objects: Array},
		mixins: [eligible_objects("USER")],
		methods: {
			event(eventName, data, obj){
				console.log('Event '+ eventName)
				console.log('Received '+ data)
				const vm = this
				switch(eventName){
					case 'BUTTON_CLICK':
						switch(data){
							case 'TEST BUTTON':
								console.log('this')
								vm.toggle_modal(obj.object, 1)
								break
							case 'CLOSE_MODAL':
								console.log('this2')
								vm.toggle_modal(null, 0)
								break
						}
						break;
					case 'SELECT_ITEM':
						vm.toggle_selection(obj.object, 1)
						break
					case 'DESELECT_ITEM':
						vm.toggle_selection(obj.object, 0)
						break
					default:
				}
			},
			generateHeader(obj){
				return `${obj.full_name}`
			},
			generateContent(obj){
				return `<b>Usuário:</b> ${obj.login} (${obj.category})</br>
						<b>Local:</b> ${obj.place.name} (${obj.place.location})</br>`
			},
			toggle_modal(obj, state){
				this.modal.data = obj
				this.modal.is_active = state
			}
		},
		computed:{
			doptions: function (){
				return	{
							tools : [
										{
											name: 'Selecionar Todos',
											icon: 'fa-check-double',
											onClick: (obj, index)=> console.log('TESTE')
										},
										{
											name: 'Excluir',
											icon: 'fa-trash-alt'
										}
									],
							cards : this.eligible_objects.concat(this.eligible_objects).concat(this.eligible_objects).concat(this.eligible_objects).concat(this.eligible_objects),
							defaultToolbar:{
								defaultTool: {
									draw: (obj, index) => `<span class="icon is-small">
																	<i class="fas ${obj.icon}" aria-hidden="true"></i>
															</span>
															<div style="
																    	width: 120px;
																    	overflow: hidden;
																    	white-space: nowrap;">
																${obj.name}
															</div>
															`
								}
							},
							defaultCard:{
								defaultHeader:{
									draw: (obj, index) =>	`<span class="icon is-small">
																	<i class="fas fa-user" aria-hidden="true"></i>
															</span>
															&nbsp;
															<b>
																${obj.full_name}
															</b>`
								},
								defaultContent:{
									draw: (obj, index) =>	`<b>Login:&nbsp</b> ${obj.login} </br>
															<b>Permissões:&nbsp</b> ${obj.category} </br>
															<b>Local:&nbsp</b> ${obj.place.name} (${obj.place.location})`
								}
							},
							defaultHero:{
								defaultTitle: {
									draw : () => `Usuários`
								}
							},
							defaultFilter:{
								placeholder:'Pesquisa',
								onFilter: (obj, index, key) =>	obj.login.match(new RegExp(key, 'i')) ||
																obj.full_name.match(new RegExp(key, 'i'))
							}
						}
				}
		},
		watch:{
		}

	}
</script>
