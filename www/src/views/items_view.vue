<template>
	<div>
		<card-view :rendererOptions="doptions" ref='card-item'></card-view>
	</div>
</template>

<script type="text/javascript">
	
	import cardView from '../mixins/card-view.vue'
	import eligible_objects from '../mixins/eligible-objects'

	export default {
		data: ()=>({
				page_name: "Protocols",
				hasMultipleProtocolsSelected: false
			}),
		props: { objects: Array, currentUser: Object},
		beforeUpdate: function(){
			console.log('BEFORE UPDATE ITEM VIEW')
				this.hasMultipleProtocolsSelected =
				 	this.$refs['card-item'].selectedItems
						.map((el)=> el.object.protocol)
						.reduce((acc, ell)=>{
							if(acc === true)	return acc

							if(acc === null)	return ell

							if(acc !== ell)		return true
							else 				return ell

						}, null)
		},
		mixins: [eligible_objects("ITEM"),],
		computed: {

			doptions: function(){
				var vm = this
				return	{
							buttons : 	[
											{
												draw: (obj,  index) => `Movimentação`
											}
										],
							tools : [
										{
											name: 'Transportar',
											icon: 'fa-truck',
											color: '#24a1ad',
											onlyInSelectionMode: true,
											isVisible: (vm.hasMultipleProtocolsSelected !== true)
														&& ['ROOT', 'LOGISTIC','LABORATORY'].some((el)=>el == vm.currentUser.category),
											onClick: (obj, index)=> console.log('TESTE')
										},
										{
											name: 'Selecionar todos',
											icon: 'fa-clone',
											color: '#24a1ad',
											onlyInSelectionMode: true,
											isVisible: true,
											onClick: (obj, index)=> console.log('TESTE')
										},
										{
											name: 'Excluir',
											icon: 'fa-trash-alt',
											color: '#ad2424',
											onlyInSelectionMode: true,
											isVisible: ['ROOT', 'LOGISTIC'].some((el)=>el == vm.currentUser.category)
										},
										{
											name: 'Adicionar',
											icon: 'fa-plus-circle',
											color: '#24ad2d',
											onlyInSelectionMode: false,
											isVisible: ['ROOT', 'LOGISTIC'].some((el)=>el == vm.currentUser.category)
										}
									],
							cards : this.eligible_objects,
							defaultToolbar:{
								defaultTool: {
									draw: (obj, index) => `<span class="icon is-small" title="${obj.name}">
																	<i class="fas ${obj.icon} fa-lg" aria-hidden="true" ${(obj.color)?(`style="color:${obj.color}"`):('')}></i>
															</span>
															`
								}
							},
							defaultCard:{
								cardColor: '#407fbf',
								defaultHeader:{
									draw: (obj, index) =>	`<span class="icon is-small">
																	<i class="fas fa-box" aria-hidden="true"></i>
															</span>
															&nbsp;
																${obj.name} (N°${obj.code})`
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