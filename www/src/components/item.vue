<template>
	<div class="card" :class="{ 'is-selected':isSelected}">
		<a 	class="card-header"
			v-on:click="toogleSelection">
			<div class="card-header-title">
				{{object.name}}
			</div>
			<span class="card-header-icon">
				<transition name="v-select-check">
					<span class="icon " v-show="inSelection">
								<i 	
									:key="1"
									:class="{fas: inSelection && isSelected}"
									class="far fa-check-circle">
								</i>
					</span>
				</transition>
			</span>
		</a>
		<div class="card-content v-card-content">
			Teste
		</div>
		<footer class="card-footer">
			<a 	class="card-footer-item"
				:class="{'disabled':inSelection}">Retirar</a>
			<a 	class="card-footer-item" 
				:class="{'disabled':inSelection}"
				v-on:click="detail">Detalhes</a>
		</footer>

	</div>
</template>

<script type="text/javascript">

	import event_emiter from '../mixins/event-handler'
	export default {
		data: () => (
			{
				isSelected: false,
			}
		),
		props: ['object', 'inSelection'],
		mixins: [event_emiter],
		methods:{
			toogleSelection(){
				var vm = this
				vm.isSelected = !vm.isSelected
				if (vm.isSelected)
					vm.emitEvent('SELECT_ITEM')
				else
					vm.emitEvent('DESELECT_ITEM')
			},
			detail(){
				this.emitEvent('OPEN_MODAL', 'detail')
			}
		}
	}
</script>

<style lang="scss">

	.card {
		border-radius: 10px;
		overflow: hidden;
	}


	/* footer items transitions */
	.card-footer-item{
		transition: filter 1s, color 2s, background .8s;
	}
	.card-footer-item:hover{
		background: #e9ffd8;
	}
	.card-footer-item.disabled {
		color: grey;
		background: #fafafa;
		pointer-events: none;
		cursor: default;
		//filter: blur(2px);
	}


	/*card header transitions*/
	.card.is-selected .card-header{
		background: #b3f97c;
	}
	.card-header {
		transition: all .3s;
	}
	.card-header:hover {
		background: #e9ffd8;
	}

		/* */
		.v-select-check-enter-active{
			transition: all .2s
		}
		.v-select-check-leave-active{
			transition: all .8s;
		}
		.v-select-check-enter, .v-select-check-leave-to {
			opacity: 0;
		}


	.v-card-content{
		padding-right: 10px !important;
		padding-left: 10px !important;
		padding-top: 5px !important;
		padding-bottom: 5px !important;
	}
</style>