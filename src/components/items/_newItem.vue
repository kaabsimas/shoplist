<template>
	<form action="">
		<section class="new-item">
			<b-field>
				<b-autocomplete v-model="itemName" placeholder="Produto ex.: Feijão" 
				:data="filteredData" field="name" @select="save">
				</b-autocomplete>
			</b-field>
		</section>
	</form>
</template>
<script>
	export default{
		props: ['listId', 'item'],
		data(){
			return{
				products: this.$localStorage.get('products', []),
				itemName: '',

			}
		},
		computed: {
			filteredData(){
				var data = this.products.filter((product) => {
					return product.name
						.toString()
						.toLowerCase()
						.indexOf(this.itemName.toLowerCase()) >= 0;
				});
				if( data.length == 0 )
					data = [{id:null, name: this.itemName}];
				return data;
			}
		},
		methods: {
			save(option){
				console.log( option );
				if( option.id === null ){
					let products 	= this.$localStorage.get('products', []),
						maxId 		= 0;
					products.each((product) => {
						maxId = product.id > maxId?product.id:maxId;
					});
					option.id = ++maxId;
					products.push(option);
					this.$localStorage.set('products', products);
				}
				this.item = {list_id: this.listId, product_id: option.id};
			}
		}
	}
</script>