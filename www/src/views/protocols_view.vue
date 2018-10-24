<template>
	<div>
		<card-view :rendererOptions="doptions"></card-view>
		<new-protocol :control="newProtocolControlMerged" v-if="newProtocolControlMerged.isActive"/>
		<view-protocol :control="viewProtocolControlMerged" :data="viewProtocolControlMerged.data" v-if="viewProtocolControlMerged.isActive"/>
	</div>
</template>

<script type="text/javascript">
	
	import eligible_objects from '../mixins/eligible-objects'
	import cardView from '../mixins/card-view.vue'
	import newProtocol from '../components/new-protocol-modal.vue'
	import viewProtocol from '../components/view-protocol-modal.vue'
	export default {
		data: ()=>({
			newProtocolControl: {
				isActive: false,
			},
			viewProtocolControl: {
				isActive: false,
				data: {

				}
			},
		}),
		props: { objects: Array, currentUser: Object},
		mixins: [eligible_objects("PROTOCOL")],
		computed: {
			newProtocolControlMerged: function(){
				var vm = this
				var np = vm.newProtocolControl
				np.onCancel = function(){
					vm.newProtocolControl.isActive = false
				}

				np.onClose = function(){
					
				}

				np.onSubmit = function(){

				}

				return np
			},
			viewProtocolControlMerged: function(){
				var vm = this
				var np = vm.viewProtocolControl
				np.onClose = function(){
					vm.viewProtocolControl.isActive = false
				}
				return np
			},
			doptions: function(){
				var vm = this
				return	{
							buttons : 	[
											{
												draw: (obj,  index) => `Ver amostras`,
												onClick: (obj, option, index) => {
																			vm.viewProtocolControl.data = JSON.parse(JSON.stringify(obj));
																			vm.viewProtocolControl.isActive = true;
																		}
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
										},
										{
											name: 'Novo protocolo',
											icon: 'fa-plus-circle',
											color: '#24ad2d',
											onlyInSelectionMode: false,
											isVisible: ['ROOT', 'LOGISTIC'].some((el)=>el == vm.currentUser.category),
											onClick: (tool, index)=>{
												console.log('New protocol')
												vm.newProtocolControl.isActive = true
											}
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
								cardColor: '#bf7540',
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
		components: {cardView, newProtocol, viewProtocol}


	}
</script>

<style type="text/css">
	
</style>