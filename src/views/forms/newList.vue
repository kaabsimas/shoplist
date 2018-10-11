<script>
	export default {
		props: ['form'],
		data(){
			return { inputValue:'' };
		},
		methods: {
			debug(){
				this.form.name = this.inputValue;
				console.log( this.form.name );
			}
		}
	};
</script>
<template>
	<div class="field">
		<div class="control">
			<input type="text" placeholder="Nome ex.:'compras de mês'" class="input" v-model="inputValue" @change="debug">
		</div>
	</div>
</template>