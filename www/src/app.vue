<template>
	<div>
		<div v-for="item in dados" class="item">
			Numero: {{item}}
			
		</div>
	</div>
</template>
<script type="text/javascript">
	export default {
		data: function(){
			return {dados : [2,3,4,{ASD: "AAA", array: [1,2] },6]}
		}
	}
</script>


<style>
.item {
	background: "#FF0000"
}
</style>

