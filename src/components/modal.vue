<template>
	<div v-bind:class="{ 'is-active':modal.active, modal:true }">
		<div class="modal-background"></div>
		<div class="modal-card">
		    <header class="modal-card-head">
		      	<p class="modal-card-title">{{ modal.title }}</p>
		      	<!-- <button class="delete" aria-label="close" ></button> -->
		    </header>
		    <section class="modal-card-body">
		      	<slot></slot>
		    </section>
		    <footer class="modal-card-foot">
		      	<slot name="footer"></slot>
		    </footer>
		</div>
	</div>
</template>
<script>
	export default{
		props: ['modal']
	}
</script>