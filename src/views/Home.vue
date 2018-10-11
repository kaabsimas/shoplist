<template>
	<div class="container">
        <section class="hero is-primary">
            <div class="hero-body">
                <div class="container">
                    <h1 class="title">Bem vindo(a)!</h1>
                    <h2 class="subtitle">Comece já a fazer a sua lista de compras!</h2>
                </div>
            </div>
        </section>
        <section>
        	<form action="">
        		<modal v-bind:modal=modal>
        			<new-list v-bind:form=newList></new-list>
        			<div slot="footer">
        				<button class="button is-success" @click="this.save">{{ modal.save }}</button>
		      			<button class="button" @click="this.close">{{ modal.cancel }}</button>
        			</div>
        		</modal>
        	</form>
        	<div class="container has-text-centered">
			    <table class="table is-fullwidth is-striped is-hoverable">
			    	<tbody>
			    		<tr v-for="(name, index) in lists" class="is-unselectable">
			    			<td class="is-size-4-touch is-size-3-desktop">
			    				{{ name }}
			    			</td>
			    			<td>
								<div class="button is-danger is-large" @click="remove(index)">
									<i class="fa fa-trash"></i>
								</div>
			    			</td>
			    		</tr>
			    	</tbody>
			    </table>
	        	<div class="button is-link is-large" @click="show">
	        		<span class="icon is-small">
				      <i class="fa fa-plus"></i>
				    </span>
				    &nbsp;
				    Nova Lista
			    </div>
        	</div>
        </section>
    </div>
</template>
<script>
	import modal from '../components/modal.vue';
	import newList from '../views/forms/newList.vue';

	export default {
		data: function(){
			return {
				newList: {name:''},
				modal: {
					title: "Nova Lista",
					save: "Criar",
					cancel: "Cancelar",
					active: false
				},
				lists: null
			};
		},
		components:{
			modal,
			newList
		},
		methods: {
			show: function(){
				this.modal.active = true;
			},
			close() {
		 		this.modal.active = false;
		 	},
		 	save() {
				this.lists.push( this.newList.name );
			},
			remove( index ) {
				if( this.lists.length > 0 )
					this.lists.splice( index, 1 );
			}
		},
		mounted() {
			this.lists = this.$localStorage.get('lists', []);
		},
		watch:{
			lists(value) {
				this.$localStorage.set('lists', value);
			}
		}
	}
</script>