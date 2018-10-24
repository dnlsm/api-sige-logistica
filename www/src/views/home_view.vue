<template>
	<div>
		<div v-if="isAuthorized">
			{{time}}, {{userFirstName}}
		</div>
		<div v-if="isAuthorized">
			<card-view></card-view>
		</div>
	</div>
</template>

<script type="text/javascript">
	import cardView from '../mixins/card-view.vue'
	import Item from '../components/item.vue'

	export default {
		data: ()=>({
				page_name: "Home"
			}),
		components: {
			cardView
		},
		props: { objects: Array, currentUser: Object},
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
			},
			isAuthorized () {
      			return this.$store.state.user.isAuthorized
    		}
		}

	}
</script>

<style type="text/css">
	
</style>