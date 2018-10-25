<template>
	<div class="container">
		<section class="hero is-primary">
			<div class="hero-body">
				<div class="container">
					<div class="subtitle"  @click="goBack">
						<b-icon pack="fa" icon="long-arrow-left" size="is-medium"></b-icon>
					</div>
					<h3 class="title">{{nome}}</h3>
				</div>
			</div>
		</section>
		<div class="container has-text-centered">
			<table class="table is-fullwidth is-striped is-hoverable">
		    	<tbody>
		    		<tr v-for="(item) in items" class="is-unselectable">
		    			<td class="is-size-4-touch is-size-3-desktop">
	    					{{ item.name }}
		    			</td>
		    			<td>
							<div class="button is-danger is-large is-pulled-right" @click="remove(item.id)">
								<i class="fa fa-trash"></i>
							</div>
		    			</td>
		    		</tr>
		    	</tbody>
		    </table>
		    <new-item v-bind="{listId:this.id, item: this.item}"></new-item>
		    <!-- <div class="button is-link is-large" @click="isModalActive = true">
        		<span class="icon is-small">
			      <i class="fa fa-plus"></i>
			    </span>
			    &nbsp;
			    Novo Item
		    </div>
 -->		</div>
	</div>	
</template>
<script>
	import newItem from '../components/items/_newItem.vue';
	export default {
		data(){
			return {
				id: null,
				nome: null,
				isModalActive: false,
				item: {},
				items: []
			}
		},
		mounted() {
			this.id = this.$route.params.id;
			this.nome = this.$localStorage.get('lists', [])[this.id];
			let items = this.$localStorage.get('items', []);
			if( items.length > 0 ){
				this.items = items.flatMap(
					(item, index) => {
						if(item.list_id == this.id) 
							return {id: index, list_id: item.list_id, name: item.name};
					}
				).filter((item) => item);
			}
		},
		components: {
			newItem
		},
		methods: {
			// save(){
			// 	let newItemName = this.formProps.itemName,
			// 		newItem 	= {list_id: this.id, name: newItemName},
			// 		items   	= this.$localStorage.get('items', []);
			// 	items.push(newItem);
			// 	this.$localStorage.set('items', items);
			// },
			remove( index ){
				let items =	this.$localStorage.get('items', []);

				items.splice(index, 1);
				this.$localStorage.set('items', items);
				this.items = items.flatMap(
					(item, index) => {
						if(item.list_id == this.id) 
							return {id: index, list_id: item.list_id, name: item.name};
					}
				).filter((item) => item);
			},
			goBack () {
		      window.history.length > 1
		        ? this.$router.go(-1)
		        : this.$router.push('/')
		    }
		}
	}
</script>