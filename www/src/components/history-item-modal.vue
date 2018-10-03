<template>
	<div class="modal" :class="{'is-active': control.isActive}">
		<div class="modal-background" v-on:click="(control.onClose ||)"></div>
		<div class="modal-card">
			<section class="modal-card-body">
				{{data}}
			</section>
		</div>
		<button class="modal-close" v-on:click="(control.onClose)"></button>
	</div>
</template>

<script type="text/javascript">
	import event_emiter from '../mixins/event-handler'

	export default {
		data(){
			return {
				onClose: ()=>{
					console.log('onClose-Modal')
				}
			}
		},
		props: ['data', 'control'],
		mixins: [event_emiter]
	}
</script>