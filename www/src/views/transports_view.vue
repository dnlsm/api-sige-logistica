<template>
	<div>

		<card-view :rendererOptions="doptions"></card-view>

	</div>
</template>

<script type="text/javascript">
	import cardView from '../mixins/card-view.vue'
	import eligible_objects from '../mixins/eligible-objects'

	export default {
		data: ()=>({
				page_name: "Transports"
			}),
		props: { objects: Array},
		mixins: [eligible_objects("TRANSPORTATION")],
		computed: {
			doptions: function(){
				var vm = this
				return	{
							buttons : 	[
											{
												draw: (obj,  index) => `Ver detalhes`
											}
										],
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
							cards : this.eligible_objects.concat(this.eligible_objects),
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
																	<i class="fas fa-truck" aria-hidden="true"></i>
															</span>
															&nbsp;
															<b>
																${obj.from}
																<i class="fas fa-arrow-right" aria-hidden="true"></i>
																${obj.to}
															</b>`
								},
								defaultContent:{
									draw: (obj, index) =>	`
															<b>Código:&nbsp;</b> ${obj.code} (Protocolo ${obj.protocol})</br>
															<b>Envolvidos:&nbsp;</b>
															${vm.$parent.findUser(obj.requester_user).full_name.match(/^(\w+)\W*/)[1]}
															<i class="far fa-hand-point-right" aria-hidden="true"></i>
															${vm.$parent.findUser(obj.requested_user).full_name.match(/^(\w+)\W*/)[1]}
															<br/>
															<b>Data prevista:&nbsp;</b> ${(new Date(obj.date)).toLocaleDateString()} </br>
															`
								}
							},
							defaultHero:{
								defaultTitle: {
									draw : () => `Transportes`
								},
								defaultSubtitle:{
									draw : () => `<i>Mostrando transportes ativos no momento</i>`
								}
							},
							defaultFilter:{
								placeholder:"Pesquisar",
								onFilter: (obj, index, key) =>	obj.code.toString().match(new RegExp(key, 'i')) ||
																obj.protocol.toString().match(new RegExp(key, 'i')) ||
																obj.from.match(new RegExp(key, 'i')) ||
																obj.to.match(new RegExp(key, 'i')) ||
																obj.requested_user.match(new RegExp(key, 'i')) ||
																vm.$parent.findUser(obj.requested_user).full_name.match(new RegExp(key, 'i')) ||
																vm.$parent.findUser(obj.requester_user).full_name.match(new RegExp(key, 'i')) ||
																obj.requester_user.match(new RegExp(key, 'i'))
							}
						}
			}
		},
		components: {cardView}

	}
</script>

<style type="text/css">
	
</style>