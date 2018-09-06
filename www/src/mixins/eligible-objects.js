export function eligible_objects (eligible_type) {
	return {
				data: ()=>({
					eligible_type 
				}),
				computed: {
					eligible_objects() {
						console.log(this.objects)
						return 	this.objects
									.map((el)=>el)
									.filter((el)=>el.type === this.eligible_type)
						
					}	
				}
			}
}