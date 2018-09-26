<template>
	<div class="card is-flat"
		:class="{ 'is-selected':isSelected,
				  'in-selection':state.inSelectionMode}">
		<a 	class="card-header"
			:style="{background:rendererOptions.defaultCard.cardColor}"
			v-on:click="toogleSelection">
			<div class="card-header-title" v-html="header"/>
			<span class="card-header-icon">
				<transition name="v-select-check">
					<span class="icon check-icon" v-show="state.inSelectionMode">
								<i 	
									:key="header"
									:class="{fas: state.inSelectionMode && isSelected}"
									class="far fa-check-circle">
								</i>
					</span>
				</transition>
			</span>
		</a>
		<div 	class="card-content v-card-content"
				v-html="content"
				:style="">
		</div>
		<footer class="card-footer">
			<a 	class="card-footer-item"
				v-for="(option, index) in buttons"
				v-html="(option.draw||rendererOptions.defaultCard.defaultButton.draw)(option, index)"
				v-on:click="button_click(option,index)"></a>
		</footer>
	</div>
</template>

<script type="text/javascript">
	import event_handler from '../event-handler'

	export default {
		data: () => (
			{
				isSelected: false,
			}
		),
		props: ['object',
				'header',
				'state',
				'rendererOptions',
				'buttons',
				'content'],
		mixins: [event_handler],
		computed: {
		},
		methods:{
			mouseHandler(type, obj){
				console.log('Handler')
				console.log(obj)
				switch(type){
					case 'OVER':
							obj.style.background = `lighten(${this.rendererOptions.defaultCard.cardColor},10%)`
							break
					case 'OUT':
							obj.style.background = `lighten(${this.rendererOptions.defaultCard.cardColor},1%)`
							break
				}
			},
			toogleSelection(){
				var vm = this
				vm.isSelected = !vm.isSelected
				if (vm.isSelected){
					vm.$emit('selected')
					vm.emitEvent('SELECT_ITEM')
				}
				else{
					vm.$emit('deselected')
					vm.emitEvent('DESELECT_ITEM')
				}
			},
			button_click(option, index){
				(option.onClick || this.rendererOptions.defaultCard.defaultButton.onClick)(this.object, option, index)
			}
		}
	}
</script>

<style lang="scss">

	.card {
		overflow: hidden;
	}
	.card-header-title{
		color: #FFFFFF !important
	}

	/* check-icon*/
			.card .card-header .check-icon {
				color: #21c3ff;
			}
			.card.is-selected .card-header .check-icon {
				color: #22ce00;
			}

	/*card-footer*/
		// none selected
			.card-footer-item{
				transition: filter 1s, color 1s, background .8s !important	;
				background: #fff !important;
				filter: brightness(110%);
				color: #000000;
			}
			.card-footer-item:hover{
				background: #ddd !important;
				color: #000000;
			}
		// in selection
			.card.in-selection .card-footer-item{
				background: #fff !important;
				color: grey;
				pointer-events: none;
				cursor: default;
			}

	/** car-header-title */
			.card-header-title{
					font-weight:normal !important;
			}
	/* card-header */
		// non selected
			.card-header {
				transition: all .5s !important;
				color: #ffffff;
				filter: brightness(110%);
			}
			.card-header:hover {
				filter: brightness(95%);
			}
		// selected
			.card.is-selected .card-header{
			}
			.card.is-selected .card-header:hover{
				filter: brightness(95%);
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
		background: #ffffff
		//filter: brightness(110%) saturate(70%)
	}
</style>