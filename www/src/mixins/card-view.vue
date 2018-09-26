<template>
	<div>
		<!-- ToolBar -->
		<div class="columns v-toolbar" v-if="mergedRendererOptions.tools.length > 0">
			<transition name="toolbar">
				<div v-if="state.inSelectionMode" class="box column">
					<div class="columns">	
							<a
							v-for="(tool, index) in mergedRendererOptions.tools"
							class="navbar-item column has-text-centered"
							v-html="(tool.draw||mergedRendererOptions.defaultToolbar.defaultTool.draw)(tool, index, api)"
							v-on:click="(tool.onClick||mergedRendererOptions.defaultToolbar.defaultTool.onClick)(tool, index, api)"
							/>
					</div>
				</div>
			</transition>
		</div>
		<!-- Hero -->
		<section class="hero is-small" v-if="mergedRendererOptions.defaultHero.enabled">
			<div class="hero-body">
				<div class="container">
					<h1 class="title" v-html="mergedRendererOptions.defaultHero.defaultTitle.draw()">
					</h1>
					<h2 class="subtitle" v-html="mergedRendererOptions.defaultHero.defaultSubtitle.draw()">
					</h2>
				</div>
			</div>
		</section>
		<!-- Filter -->
		<div class="field search">
			<div class="control has-icons-left has-icons-right">
				<input type="text" class="input" :placeholder="mergedRendererOptions.defaultFilter.placeholder" v-model="filterInput"/>
				<span class="icon is-small is-left">
						<i class="fas" :class="mergedRendererOptions.defaultFilter.icon"></i>
				</span>
			</div>
		</div>
		<br/>
		<br/>
		<!-- Cards -->
		<div>
			<transition-group
				tag="div"
				name="v-card"
				class="columns is-multiline">
				<div :key="index" v-for="(object, index) in mergedRendererOptions.cards" class="column is-4" v-if="(mergedRendererOptions.defaultFilter.onFilter)(object, index, filterInput)">
						<card
							:rendererOptions="mergedRendererOptions"
							:buttons="mergedRendererOptions.buttons"
							:object="object"
							:state="state"
							:header="(object.header||mergedRendererOptions.defaultCard.defaultHeader).draw(object, index, api)"
							:content="(object.content||mergedRendererOptions.defaultCard.defaultContent).draw(object, index, api)"
							v-on:selected="(object.onSelected||mergedRendererOptions.defaultCard.onSelected)(object, index, api)"
							v-on:deselected="(object.onDeselected||mergedRendererOptions.defaultCard.onDeselected)(object, index, api)"
							v-on:event="event">
						</card>
				</div>
			</transition-group>
		</div>
	</div>
</template>
<script type="text/javascript">
	
import card from './mixins-components/card.vue'
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
			toolbar: {
				is_active: false,
			},
			filterInput: '',
			api: {
					selectAll: function(){ console.log('selectAll')}
			},
			defaultRendererOptions :
				{
					tools :[],
					cards : [],
					buttons : [],

					defaultToolbar: {
						defaultTool : {
							onClick: function (obj, index) {console.log(`Default Tool ${index+1} Click`)},
							draw: function (obj, index) { return `<i>Tool ${index+1}</i>`}
						}
					},
					defaultFilter:{
						placeholder: 'Search',
						onFilter: function (obj, index, keyword) { console.log('FILTROOO'); return true},
						icon: 'fa-search'
					},
					defaultCard: {
						onSelected : (obj, index)=> console.log(`Card ${index+1} Selected`),
						onDeselected: (obj, index)=> console.log(`Card ${index+1} Deselected`),
						cardColor: '#777',
						defaultButton: {
							onClick : (obj, button, index)=> console.log(`Button Click ${index+1}`),
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
					},
					defaultHero: {
						enabled: true,
						defaultTitle: {
							draw: ()=> `Title`
						},
						defaultSubtitle: {
							draw: ()=> ``
						}
					}
				}
		}),
		components: {card},
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

		},
		computed:{
			state: function(){
				return	{
							inSelectionMode : this.selectedItems.length > 0
						}
			},
			mergedRendererOptions: function(){
				return merge(this.defaultRendererOptions, this.rendererOptions)
			},
			filteredCards: function(){
				console.log('FILTER')

			}
		},
		mounted (){

		}
	}
</script>



<style type="text/css">
	.v-card-move{
		transition: all 1s;
	}
	.v-card-item{
		transition: all 1s;
	}

	.v-card-leave-active{
		position: absolute;
		transition: all .5s;
		z-index: -1
	}
	.v-card-enter-active{
		transition: all .5s;
	}
	.v-card-enter, .v-card-leave-to{
		opacity: 0;
		transform: scale(0.1);
	}


	.v-toolbar {
		position: fixed;
		left: 50%;
  		transform: translateX(-50%);
  		z-index: 1;
	}
	.toolbar-enter-active, .toolbar-leave-active {
		transition: all .5s;
	}
	.toolbar-enter, .toolbar-leave-to{
		opacity: 0;
		transform: translateY(-20px);
	}

	.search {
		width: 100%;
		padding-right: 0px;
		padding-left: auto;
		position: relative;
		right: 0px;
		align-content: right;
		height: auto;

	}

	.search div {
		width: 30%;
		position:  relative !important;
		right: 0px !important;
		left: auto;
	}
</style>