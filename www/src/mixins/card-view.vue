<template>
	<div>
		{{JSON.stringify(mergedRendererOptions)}}
		<div class="columns v-toolbar" v-if="mergedRendererOptions.tools.length > 0">
			<transition name="toolbar">
				<div v-if="state.inSelectionMode" class="box column">
					<div class="columns">	
						<a
							v-for="(tool, index) in mergedRendererOptions.tools"
							class="navbar-item column has-text-centered"
							v-html="(tool.draw||mergedRendererOptions.defaultToolbar.defaultTool.draw)(tool,index)"
							v-on:click="(tool.onClick||mergedRendererOptions.defaultToolbar.defaultTool.onClick)(tool,index)"
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
				<div :key="index" v-for="(object, index) in mergedRendererOptions.cards" class="column is-3">
						<card
							:rendererOptions="mergedRendererOptions"
							:buttons="mergedRendererOptions.buttons"
							:object="object"
							:state="state"
							:header="(object.header||mergedRendererOptions.defaultCard.defaultHeader).draw()"
							:content="(object.content||mergedRendererOptions.defaultCard.defaultContent).draw()"
							v-on:selected="(object.onSelected||mergedRendererOptions.defaultCard.onSelected)(object,index)"
							v-on:deselected="(object.onDeselected||mergedRendererOptions.defaultCard.onDeselected)(object,index)"
							v-on:event="event">
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
import merge from 'deepmerge'
export default
	{
		props: 	{ 
			rendererOptions : 	{
				type: Object,
				default: function (){
					return 	{}
				}
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
			},
			defaultRendererOptions :
				{
					tools :[],
					cards : [],
					buttons : [],

					defaultToolbar: {
						defaultTool : {
							onClick: function (obj, index) {console.log(`Deafult Tool ${index} Click`)},
							draw: function (obj, index) { return `<i>Tool ${index+1}</i>`}
						}
					},
					defaultCard: {
						onSelected : (obj, index)=> console.log(`Card ${index+1} Selected`),
						onDeselected: (obj, index)=> console.log(`Card ${index+1} Deselected`),

						defaultButton: {
							onClick : (obj, index)=> console.log(`Button Click ${index+1}`),
							draw : (obj, index) => `Button ${index+1}`
						},

						defaultHeader: {
							onClick : (obj, index)=> console.log(`Header ${index+1} Click`),
							draw : () => "<h1>Header</h1>"
						},

						defaultContent: {
							onClick : () => console.log('Body Click'),
							draw : () => "<h2>Body</h2>"
						}
					}
				}
		}),
		components: {card , modal},
		methods:{
			event: function(eventName, eventData, obj){
				console.log(`eventName ${eventName}`)
				switch(eventName){
					case 'SELECT_ITEM':
						this.toggle_selection(obj, 1)
						break
					case 'DESELECT_ITEM':
						this.toggle_selection(obj, 0)
						break
				}
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
			},
			mergedRendererOptions: function(){
				return merge(this.defaultRendererOptions, this.rendererOptions)
			}
		},
		mounted (){

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
		transition: all .5s;
	}
	.toolbar-enter, .toolbar-leave-to{
		opacity: 0;
		transform: translateY(-20px);
	}
</style>