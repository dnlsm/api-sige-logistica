<template>
	<div class="modal">
		<div class="modal-background" v-on:click=""></div>
		<div class="modal-card">
			<header class="modal-card-head">
				<p class="modal-card-title">Modal title</p>
				<button class="delete" aria-label="close"></button>
			</header>
			<section class="modal-card-body">
				Nome: {{data}}
			</section>
			<footer class="modal-card-foot">
				<button class="button is-success">Save changes</button>
				<button class="button">Cancel</button>
			</footer>
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