

router.post('/', (req,res)=>{
	var from= ,
		intermediate=,
		to=,
		protocol=,
		date=

	if (intermediate && date){
		findRoute(from, intermediate)
		.onAny((routes1)=>{
			findRoute(intermediate, to)
			.onAny((routes2)=>{
				routes =
						routes2
								.filter((el)=> el.date)
								.filter((el)=> el.date <= date)
								.map((el)=>{
									el.node = routes1
													.filter((ell)=> ell.date)
													.filter((ell)=> ell.date <= el.date)
									return el
								})
								.filter((el)=> el.node.length !== 0)
				if (routes.length == 0)
					newRoute(date, protocol)
				else{
					var preFinal =
						routes.reduce((acc, route)=>{
							if (acc == null)
								return route
							if (route.protocol == protocol){
								if (acc.protocol == protocol){
									if(acc.date > route.date)
										return acc
									return route
								}
								return route
							}
							if(acc.date > route.date)
								return acc
							return route
						}, null)

					if (preFinal.protocol == protocol)
						useRoute(preFinal)
					else
						newRoute(preFinal, protocol)
				}
			})
			.onZero(()=> newRoute())
		})
		.onZero(()=> newRoute())
		.error()
	}
})







findRoute(from, to){
	return SELECT('*', ['TRANSPORTATION'],
					[
						['transportation_is_active', 1],
						['fk_transportation_from_place_name', from],
						['fk_transportation_to_place_name', to],
					]
				).exec()
}