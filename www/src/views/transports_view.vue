<template>
	<div>
		{{page_name}}
		<br>
		{{eligible_objects}}
	</div>
</template>

<script type="text/javascript">
	
	import {eligible_objects} from '../mixins/eligible-objects'
	import Item from '../components/item.vue'

	export default {
		data: ()=>({
				page_name: "Transports"
			}),
		props: { objects: Array},
		mixins: [eligible_objects("TRANSPORTATION")],
		computed: {}

	}
</script>

<style type="text/css">
	
</style>