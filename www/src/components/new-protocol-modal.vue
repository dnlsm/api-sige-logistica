<template>
	<div class="modal is-active">
		<div class="modal-background" v-on:click=""></div>
		<div class="modal-card">
			<header class="modal-card-head">
				<p class="modal-card-title">
					Novo Protocolo
				</p>
			</header>
			<section class="modal-card-body">
				<div>
					<div class="field is-horizontal">
						<div class="field-label is-normal">
							<label class="label">*Protocolo {{protocol}}</label>
						</div>
						<div class="field-body">
							<div class="field">
								<div class="control">
									<input class="input" type="text" placeholder="Código" v-model="protocol.code">
								</div>
							</div>
							<div class="field">
								<div class="control">
									<input class="input" type="text" placeholder="Nome" v-model="protocol.name">
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
									<input class="input" type="text" placeholder="Cliente" v-model="protocol.client">
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
									<input class="input" type="text" placeholder="GLAB" v-model="protocol.glab_code">
								</div>
							</div>
							<div class="field">
								<div class="control">
									<input class="input" type="text" placeholder="SQ" v-model="protocol.sq_code">
								</div>
							</div>
							<div class="field">
								<div class="control">
									<input class="input" type="text" placeholder="CPQDIC" v-model="protocol.cpqdic_code">
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
									<input class="input" type="text" placeholder="e.g. https://www.web1.com/" v-model="protocol.photos_url">
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
									<input class="input" type="text" placeholder="Nº" v-model="protocol.invoice">
								</div>
							</div>
							<div class="field">
								<div class="control">
									<input class="input" type="text" placeholder="Pasta" v-model="protocol.invoice_folder">
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
									<textarea class="textarea" placeholder="Adicione informações relevantes" v-model="protocol.notes"></textarea>
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
													<a class="button is-small is-success" v-on:click="protocol.items.push({})">
														<span class="icon is-small">
															<i class="fas fa-plus"></i>
														</span>
													</a>
												</th>
											</tr>
										</thead>
										<tbody>
											<tr v-for="(item, index) in protocol.items">
												<th><input class="input" type="text" name="" placeholder="Nº" v-model="item.code"/></th>
												<th><input class="input" type="text" name="" placeholder="Nome" v-model="item.name"/></th>
												<th>
												    <div class="select">
												      <select v-model="item.to">
												        <option disabled>Destino</option>
												        <option v-for="lab in labs">{{lab}}</option>
												      </select>
												    </div>
												</th>
												<th>
													<a class="button is-small is-danger" v-on:click="protocol.items.splice(index,1)">
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
				<button class="button is-success">Criar</button>
				<button class="button" v-on:click="(control.onCancel())">Cancelar</button>
			</footer>
		</div>
	</div>
</template>

<script type="text/javascript">
	import event_emiter from '../mixins/event-handler'

	export default {
		data (){
			return {
				items: [{}],
				protocol:{
					code: null,
					name: null,
					glab_code: null,

					items: []
				},
				labs: [
						'Automação',
						'ACEM',
						'RadioLab',
						'APE',
						'Externo',
				]
			}
		},
		props: ['data', 'control'],
		mixins: [event_emiter]
	}
</script>