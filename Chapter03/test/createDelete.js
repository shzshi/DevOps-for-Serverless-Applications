var assert = require('assert');
var request = require('request');
var fs = require('fs');

describe('Create, Delete', function() {
	this.timeout(5000);
    it('should create a new Task, & delete it', function(done) {
		// Build and log the path
		var path = "https://" + process.env.TASKS_ENDPOINT + "/mytasks";

		// Fetch the comparison payload
		require.extensions['.txt'] = function (module, filename) {
		    module.exports = fs.readFileSync(filename, 'utf8');
		};
		var desiredPayload = require("./data/newTask1.json");

		// Create the new Task
		var options = {'url' : path, 'form': JSON.stringify(desiredPayload)};
 		request.post(options, function (err, res, body){
			if(err){
				throw new Error("Create call failed: " + err);
			}
			assert.equal(200, res.statusCode, "Create Status Code != 200 (" + res.statusCode + ")");
			var task = JSON.parse(res.body);
			// Now delete the task
			var deletePath = path + "/" + task.id;
			request.del(deletePath, function (err, res, body){
				if(err){
					throw new Error("Delete call failed: " + err);
				}
				assert.equal(200, res.statusCode, "Delete Status Code != 200 (" + res.statusCode + ")");
				done();
		  	});
  		});
    });
});
