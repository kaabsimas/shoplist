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
           	<div class="container has-text-centered">
			    <table class="table is-fullwidth is-striped is-hoverable">
			    	<tbody>
			    		<tr v-for="(name, index) in lists" class="is-unselectable">
			    			<td class="is-size-4-touch is-size-3-desktop">
				    			<router-link v-bind:to="`/list/${name.id}`">
			    					{{ name.title }}
				    			</router-link>
			    			</td>
			    			<td>
								<div class="button is-danger is-large is-pulled-right" @click="remove(name.id)">
									<i class="fa fa-trash"></i>
								</div>
			    			</td>
			    		</tr>
			    	</tbody>
			    </table>
	        	<div class="button is-link is-large" @click="prompt">
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
	export default {
		data: function(){
			return {
				lists: []
			};
		},
		methods: {
			update(){
				return new Promise((resolve, reject) => {
					this.$db.nada.toArray()
						.then( lists => this.lists = lists )
						.catch(error => reject(error));
				});
			},
			add( value ){
				return new Promise((resolve, reject) => {
					this.$db.lists.add({
						title: value,
						created_at: new Date()
					})
					.then(() => {
						resolve(this.update()); 
					}).catch(error => reject(error));
				});
			},
			remove(id){
		    	this.$db.lists.where('id').equals(id).delete()
		    		.then(() => {
		    			throw {message: "Erro Porra!"};
		    			this.update()
		    		})
		    		.then(() => this.$toast.open({message:'lista removida', type: 'is-warning'}));
		    },
			prompt() {
				this.$dialog.prompt({
                    message: `Nova Lista`,
                    inputAttrs: {
                        placeholder: 'Nome ex.:"compras de mês"',
                        confirmText: "Criar",
                        cancelText: "Cancelar",
                        maxlength: 50
                    },
                    onConfirm: (value) => {
                    	this.add( value ).then(() => {
                    		this.$toast.open({message:'nova lista criada', type: 'is-success'});
                    	}).catch((e) => {
                    		this.$toast.open({message:`houve um erro ao salvar a lista: ${e.message}`, type: 'is-danger'});
                    	});
                    }
                });
			}
		},
		mounted() {
			this.update()
				.catch(e => {
					this.$toast.open(
						{
							message: `houve um erro ao buscar listas`, 
							type: 'is-danger',
							duration: 3500
						});
				});
		}
	}
</script>