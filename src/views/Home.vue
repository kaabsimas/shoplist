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
				    			<router-link v-bind:to="`/list/${index}`">
			    					{{ name }}
				    			</router-link>
			    			</td>
			    			<td>
								<div class="button is-danger is-large is-pulled-right" @click="remove(index)">
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
				lists: null
			};
		},
		methods: {
			remove( index ) {
				if( this.lists.length > 0 )
					this.lists.splice( index, 1 );
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
                    	this.lists.push( value );
                    	this.$toast.open({message:'nova lista criada', type: 'is-success'});
                    }
                });
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