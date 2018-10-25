import products from './products.json';
export default class Seeder{
	constructor( app ){
		app.$db.products
			.count((count) => {				
				if(count < 1){
					app.$db.products.bulkAdd(products)
						.catch(app.$db.BulkError, (e) => {
							console.error( e );
						});
				}
			})
			.catch(app.$db.DataError, (e) => { console.error(e) });
	}
}