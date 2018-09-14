<template>
	
</template>

<script type="text/javascript">
	require('../other/array-remove-by-name')
	import {eligible_objects} from '../mixins/eligible-objects'
	import card_view from '../mixins/card-view'
	import Item from '../components/card.vue'
	export default {
		data: ()=>({
				buttons:[
					{
						caption: "Botão",
						type: "TEST BUTTON"
					}
				]
			}),
		props: { objects: Array},
		mixins: [eligible_objects("USER"), card_view],
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
			}
		},
		watch:{
		}

	}
</script>
