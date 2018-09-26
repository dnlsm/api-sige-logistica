<template>
	<div>
		{{time}}, <b>{{userFirstName}}</b>!
	</div>
</template>

<script type="text/javascript">
	
	import eligible_objects from '../mixins/eligible-objects'
	import Item from '../components/item.vue'

	export default {
		data: ()=>({
				page_name: "Home"
			}),
		props: { objects: Array, currentUser: Object},
		mixins: [eligible_objects("Home")],
		computed: {
			time: function(){
				var hours = (new Date()).getHours()

				if (hours >= 6 && hours < 12)
					return 'Bom dia'
				if (hours >= 12 && hours < 19)
					return 'Boa tarde'
				return 'Boa noite'
			},
			userFirstName : function () {
				return this.currentUser.full_name.match(/^(\w+)\W*/)[1]
			}
		}

	}
</script>

<style type="text/css">
	
</style>