



router.post('/', (req,res)=>{
	var from= ,
		intermediate=,
		to=,
		protocol=,
		date=

	if (intermediate){
		findRoute(from, intermediate, protocol)
		.onAny((routes1)=>{
			findRoute(intermediate, to, protocol)
			.onAny((routes2)=>{
				routes2.filter((el)=> (date)?(el.date <= date):(true))
						.map((el)=>{
							el.child = routes1.filter((ell)=> ell.date <= el.date)
						})
			})
			.onZero()
		})
		.onZero()
		.error()
	}
})







findRoute(from, to, protocol, date){
	return SELECT('*', ['TRANSPORTATION'],
					[
						['transportation_is_active', 1],
						['fk_transportation_from_place_name', from],
						['fk_transportation_to_place_name', to],
						['fk_transportation_protocol_code', protocol]
					]
				).exec()
}