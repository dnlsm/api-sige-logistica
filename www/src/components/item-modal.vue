<template>
	<div class="modal">
		<div class="modal-background" v-on:click="emitEvent('BUTTON_CLICK','CLOSE_MODAL')"></div>
		<div class="modal-card">
			<section class="modal-card-body">
				Nome: {{data}}
			</section>
		</div>
		<button class="modal-close" v-on:click="emitEvent('BUTTON_CLICK','CLOSE_MODAL')"></button>
	</div>
</template>

<script type="text/javascript">
	import event_emiter from '../mixins/event-handler'

	export default {
		props: ['data'],
		mixins: [event_emiter]
	}
</script>