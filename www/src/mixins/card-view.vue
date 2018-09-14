<template>
	<div>
		<div class="columns v-toolbar" v-if="tools.length > 0">
			<transition name="toolbar">
				<div v-if="state.inSelectionMode" class="box column">
					<div class="columns">	
						<a
							v-for="tool in tools"
							class="navbar-item column has-text-centered"
							v-html="tool.name"
							v-on:click="event"
							/>
					</div>
				</div>
			</transition>
		</div>
		<br>
		<br>
		<div >
			<transition-group
				enter-active-class="animated fadeIn"
				leave-active-class="animated fadeOut"
				:appear="true"
				tag="div"
				class="columns is-multiline">
				<div :key="object" v-for="object in objects" class="column is-3">
						<card
							:object="object"
							:state="state"
							:buttons="buttons"
							:header="object.header"
							:content="object.content"
							v-on:event="event(object)">
						</card>
				</div>
			</transition-group>
			<modal
				:class="{'is-active': modal.is_active}"
				v-on:event="event"
				:data="modal.data">
			</modal>
		</div>
	</div>
</template>
<script type="text/javascript">
	
import card from './mixins-components/card.vue'
import modal from './mixins-components/modal.vue'

export default
	{
		props: 	{ 	objects: 	{
									type: Array,
									default: []
					},
					buttons: 	{
									type: Array,
									default: []
					},
					tools: 		{
									type: Array,
									default: []
					}
				},

		data: ()=>({
			selectedItems : [],
			modal: {
				is_active: false,
				data : null
			},
			toolbar: {
				is_active: false,
			}
		}),
		components: {card , modal},
		methods:{
			event: function(obj){

			},
			toggle_selection: function (obj, state){
				if (state) 	this.selectedItems.push(obj)
				else 		this.selectedItems.removeByName(obj)
			},
			toggle_modal(obj, state){
				this.modal.data = obj
				this.modal.is_active = state
			}
		},
		computed:{
			state: function(){
				return	{
							inSelectionMode : this.selectedItems.length > 0
						}
			}
		}
	}
</script>



<style type="text/css">
	.v-toolbar {
		position: absolute;
		z-index: 1 !important;
		left: 50%;
  		transform: translateX(-50%);
	}
	.toolbar-enter-active, .toolbar-leave-active {
		transition: all 0.8s;
	}
	.toolbar-enter, .toolbar-leave-to{
		opacity: 0;
		transform: translateY(-20px);
	}
</style>