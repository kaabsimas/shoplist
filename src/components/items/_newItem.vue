<template>
	<form action="">
		<div class="modal-card">
			<section class="modal-card-body">
				<b-field>
					<b-input type="text" placeholder="produto" v-model:value="formProps.itemName"></b-input>
				</b-field>
			</section>
			<footer class="modal-card-foot">
				<button class="button" type="button" @click="$parent.close()">Cancelar</button>
                <button class="button is-primary" @click="$parent.$parent.save()">Salvar</button>
			</footer>
		</div>
	</form>
</template>
<script>
	export default{
		props: ['formProps']
	}
</script>