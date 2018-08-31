phonon.options({
    navigator: {
        defaultPage: 'home',
        animatePages: true,
        enableBrowserBackButton: true,
        templateRootDirectory: './otherpages'
    },
    i18n: null // for this example, we do not use internationalization
});


var app = phonon.navigator();

/**
 * The activity scope is not mandatory.
 * For the home page, we do not need to perform actions during
 * page events such as onCreate, onReady, etc
*/

app.on({page: 'home', preventClose: true, content: "../index.html", readyDelay: 1}, function(activity) {	
	
	activity.onCreate(function() {	
		//when the page is loaded, the data from database.json will be parsed here
		$(window).on('load', function () {
			$.getJSON("database.json", function(result){
				$.each(result, function(i, field){ //For each object get from the database.json
					$(".current-task-container").append('<div class="single-task" data-id="' + field.taskID + '"><a href="#!viewnote" class="note-click"><h1>' + field.taskTitle + '</h1><p>Today</p><p>' + field.taskDate + '</p></a></div>');	
				}); //display all the task objects here
			});
		});
	});
	
	activity.onClose(function(self) {
		
	});
	
	activity.onHidden(function() {
        
    });

    activity.onHashChanged(function(pizza) {
        
    });
});

/**
 * However, on the second page, we want to define the activity scope.
 * [1] On the create callback, we add tap events on buttons. The OnCreate callback is called once.
 * [2] If the user does not tap on buttons, we cancel the page transition. preventClose => true
 * [3] The OnReady callback is called every time the user comes on this page,
 * here we did not implement it, but if you do, you can use readyDelay to add a small delay
 * between the OnCreate and the OnReady callbacks
*/

app.on({page: 'viewnote', preventClose: true, content: 'viewnote.html', readyDelay: 1}, function(activity) {
	
	activity.onCreate(function() {
		
	});
	
	activity.onClose(function(self) {
		
	});
	
	activity.onHidden(function() {
        
    });

    activity.onHashChanged(function(pizza) {
        
    });
});

app.on({page: 'addtask', preventClose: true, content: 'addtask.html', readyDelay: 1}, function(activity) {
	
	var addTask = function (evt) {
		//call a random number
		var taskId = Math.floor((Math.random() * 100) + 1); //Set the taskID randomly
		//Check if this random id has already existed
		$.getJSON("../database.json", function(result){
			$.each(result, function(i, field){
				while(taskId == field.taskID) //if this id is existed
				{
					taskId = Math.floor((Math.random() * 100) + 1); //get another random number for new task ID
				}
			});
		});
		var JsonObject = { //Create a new JSON Object which has all value getting from the fields
			taskID: taskId,
			taskTitle: $("#task-title").val(),
			taskDate: $("#task-date").val(),
			taskDescription: $("#task-description").val()
		};
		var data1 = JSON.stringify(JsonObject); //Convert that JSON Object into string
		//Now we make an ajax call
		$.ajax({
			type: "POST",
			url: "http://localhost:8080/", //We run a node serve on the script.js file on the port 8080, so this is the link
			data: data1, //data parsed will be the string version of this JSON Object
			success: function (data) {
				alert(data1);
			},
			error: function (data) {
				//alert(data1);
			}
		});
	}
	
	activity.onCreate(function() {
		document.querySelector('.add-task-submit-btn').on('click', addTask); //addTask function will be called when this button is clicked
	});
	
	activity.onClose(function(self) {
		
	});
	
	activity.onHidden(function() {
        
    });

    activity.onHashChanged(function(pizza) {
        
    });
});


// Let's go!
app.start();