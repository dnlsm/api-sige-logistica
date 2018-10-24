<template>
	<div class="modal" :class="{'is-active': control.isActive}">
		<div class="modal-background" v-on:click=""></div>
		<div class="modal-card">
			<header class="modal-card-head">
				<p class="modal-card-title">
					Protocolo "<span v-html="data.name"/> (Nº <span v-html="data.code"/>)"
				</p>
			</header>
			<section class="modal-card-body">
				<div>
					<div class="field is-horizontal">
						<div class="field-label is-normal">
							<label class="label">*Protocolo</label>
						</div>
						<div class="field-body">
							<div class="field">
								<div class="control">
									<input class="input" type="text" placeholder="Código" v-model="data.code">
								</div>
							</div>
							<div class="field">
								<div class="control">
									<input class="input" type="text" placeholder="Nome">
								</div>
							</div>
						</div>
					</div>
					<div class="field is-horizontal">
						<div class="field-label is-normal">
							<label class="label">*Cliente</label>
						</div>
						<div class="field-body">
							<div class="field">
								<div class="control">
									<input class="input" type="text" placeholder="Cliente">
								</div>
							</div>
						</div>
					</div>

					<div class="field is-horizontal">
						<div class="field-label is-normal">
							<label class="label">IDs</label>
						</div>
						<div class="field-body">
							<div class="field">
								<div class="control">
									<input class="input" type="text" placeholder="GLAB">
								</div>
							</div>
							<div class="field">
								<div class="control">
									<input class="input" type="text" placeholder="SQ">
								</div>
							</div>
							<div class="field">
								<div class="control">
									<input class="input" type="text" placeholder="CPQDIC">
								</div>
							</div>
						</div>
					</div>
					<div class="field is-horizontal">
						<div class="field-label is-normal">
							<label class="label">Fotos</label>
						</div>
						<div class="field-body">
							<div class="field">
								<div class="control">
									<input class="input" type="text" placeholder="e.g. https://www.web1.com/">
								</div>
							</div>
						</div>
					</div>
					<div class="field is-horizontal">
						<div class="field-label is-normal">
							<label class="label">Nota Fiscal</label>
						</div>
						<div class="field-body">
							<div class="field">
								<div class="control">
									<input class="input" type="text" placeholder="Nº">
								</div>
							</div>
							<div class="field">
								<div class="control">
									<input class="input" type="text" placeholder="Pasta">
								</div>
							</div>
						</div>
					</div>
					<div class="field is-horizontal">
						<div class="field-label is-normal">
							<label class="label">Obs.</label>
						</div>
						<div class="field-body">
							<div class="field">
								<div class="control">
									<textarea class="textarea" placeholder="Adicione informações relevantes"></textarea>
								</div>
							</div>
						</div>
					</div>
					<div class="field is-horizontal">
						<div class="field-label is-normal">
							<label class="label">Amostras*</label>
						</div>
						<div class="field-body">
							<div class="field">
								<div class="control">
									<table class="table">
										<thead>
											<tr>
												<th>Nº Amostra</th>
												<th>Nome</th>
												<th>Destino</th>
												<th>
													<a class="button is-small is-success" v-on:click="items.push({})">
														<span class="icon is-small">
															<i class="fas fa-plus"></i>
														</span>
													</a>
												</th>
											</tr>
										</thead>
										<tbody>
											<tr v-for="(item, index) in items">
												<th><input class="input" type="text" name="" placeholder="Nº" v-model="item.code"/></th>
												<th><input class="input" type="text" name="" placeholder="Nome" v-model="item.name"/></th>
												<th><input class="input" type="text" name="" placeholder="Destino" v-model="item.to"/></th>
												<th>
													<a class="button is-small is-danger" v-on:click="items.splice(index,1)">
														<span class="icon is-small">
															<i class="fas fa-times"></i>
														</span>
													</a>
												</th>
											</tr>
										</tbody>
									</table>
								</div>
							</div>
						</div>
					</div>
				</div>
			</section>
			<footer class="modal-card-foot">
				<button class="button" v-on:click="(control.onClose())">Fechar</button>
			</footer>
		</div>
	</div>
</template>

<script type="text/javascript">
	import event_emiter from '../mixins/event-handler'

	export default {
		data (){
			return {
				items: [{}]
			}
		},
		props: ['data', 'control'],
		mixins: [event_emiter]
	}
</script>