<template>
	<div>
		<card-view :rendererOptions="doptions"></card-view>
	</div>
</template>

<script type="text/javascript">
	
	import eligible_objects from '../mixins/eligible-objects'
	import cardView from '../mixins/card-view.vue'

	export default {
		data: ()=>({}),
		props: { objects: Array},
		mixins: [eligible_objects("PROTOCOL")],
		computed: {
			doptions: function(){
				var vm = this
				return	{
							buttons : 	[
											{
												draw: (obj,  index) => `Ver amostras`
											},
											{
												draw: (obj,  index) => `Retirada`
											},

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
							cards : this.eligible_objects.concat(this.eligible_objects).concat(this.eligible_objects),
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
								cardColor: '#009688',
								defaultHeader:{
									draw: (obj, index) =>	`<span class="icon is-small">
																	<i class="fas fa-map" aria-hidden="true"></i>
															</span>
															&nbsp;
																${obj.name} (Código ${obj.code})`
								},
								defaultContent:{
									draw: (obj, index) =>	`
															${(obj.client)?(`<b>Cliente:&nbsp;</b>${obj.client}</br>`):('')}
															${(obj.glab_code)?(`<b>GLAB:&nbsp;</b>${obj.glab_code}</br>`):('')}
															${(obj.sq_code)?(`<b>SQCODE:&nbsp;</b>${obj.sq_code}</br>`):('')}
															${(obj.cpqdic_code)?(`<b>CPQDIC:&nbsp;</b>${obj.cpqdic_code}</br>`):('')}
															${(obj.photos_url)?(`<b>Fotos:&nbsp;</b><a href="${obj.photos_url}">${obj.photos_url}</a></br>`):('')}
															${(obj.photos_url)?(`<b>Fotos:&nbsp;</b><a href="${obj.photos_url}">${obj.photos_url}</a></br>`):('')}
															`
								}
							},
							defaultHero:{
								defaultTitle: {
									draw : () => `Protocolos`
								},
								defaultSubtitle:{
									draw : () => `<i>Mostrando protocolos com amostras em circulação</i>`
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