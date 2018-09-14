<template>
	<div class="modal">
		<div class="modal-background" v-on:click=""></div>
		<div class="modal-card">
			<section class="modal-card-body">
				Nome: {{data}}
			</section>
		</div>
		<button class="modal-close" v-on:click=""></button>
	</div>
</template>

<script type="text/javascript">
	export default {
		props: ['data'],
		mixins: []
	}
</script>