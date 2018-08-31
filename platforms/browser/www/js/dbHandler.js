var dbHandler = {
	db: null,
	createDB: function() {
		this.db = window.openDatabase("task.db", "1.0", "task database", 1000000);
		this.db.transaction(
			function(tx){
				//run the sql here
				tx.executeSQL (
					"create table if not exists task "
				);
			}, 
			function (error) {
				alert("Errors: " + error.message);
			},
			function(){
				alert("Create DB Transaction completed...");
			}
		);
	}
	
}