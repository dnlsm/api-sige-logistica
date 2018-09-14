export default {
				methods: {
					emitEvent(eventName, eventData) {
						this.$emit('event', eventName, eventData, this)
					}	
				}
}