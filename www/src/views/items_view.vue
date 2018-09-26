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
				page_name: "Protocols"
			}),
		props: { objects: Array},
		mixins: [eligible_objects("ITEM")],
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
							cards : this.eligible_objects,
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
								cardColor: '#2196f3',
								defaultHeader:{
									draw: (obj, index) =>	`<span class="icon is-small">
																	<i class="fas fa-box" aria-hidden="true"></i>
															</span>
															&nbsp;
																${obj.name} (Código ${obj.code})`
								},
								defaultContent:{
									draw: (obj, index) =>	`
															<b>Protocolo:&nbsp;</b> ${obj.protocol}</br>
															${(obj.last_place)?(`<b>Local Atual:&nbsp;</b>${obj.last_place}</br>`):('')}
															`
								}
							},
							defaultHero:{
								defaultTitle: {
									draw : () => `Amostras`
								},
								defaultSubtitle:{
									draw : () => `<i>Amostras no Lab</i>`
								}
							},
							defaultFilter:{
								placeholder:"Pesquisar...",
								onFilter: (obj, index, key) =>	true
																// obj.code.toString().match(new RegExp(key, 'i')) ||
																// obj.protocol.toString().match(new RegExp(key, 'i')) ||
																// obj.from.match(new RegExp(key, 'i')) ||
																// obj.to.match(new RegExp(key, 'i')) ||
																// obj.requested_user.match(new RegExp(key, 'i')) ||
																// vm.$parent.findUser(obj.requested_user).full_name.match(new RegExp(key, 'i')) ||
																// vm.$parent.findUser(obj.requester_user).full_name.match(new RegExp(key, 'i')) ||
																// obj.requester_user.match(new RegExp(key, 'i'))
							}
						}
			}
		},
		components: {cardView}

	}
</script>

<style type="text/css">
	
</style>