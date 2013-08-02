
/**
 * Module dependencies.
 */

var Waterline = require('waterline'),
    adapter = require('sails-mongo'),
    NO_USERS_TO_CREATE = 100000,
    DB_URL = 'mongodb://root:@localhost:27017/waterline';


// Build A Model
var User = Waterline.Collection.extend({
    adapter: 'mongo',
    tableName: 'users',

    attributes: {
        first_name: 'string',
        last_name: 'string',
        email: 'string',
        phone: 'string',
        address: 'string',
        prop1: 'string',
        prop2: 'string',
        prop3: 'string',
        prop4: 'string'
    }
});

adapter.config = {
    url: DB_URL
};

// Load Collection passing adapters in
new User({ 
    adapters: { 
        mongo: adapter 
    }
}, function(err, collection) {
    if(err) {
        return;
    }
    testPerf(collection);
});

// run perf test
function testPerf(Users) {
    var timeStr = 'Create ' + NO_USERS_TO_CREATE + ' Users',
        created = 0;

    console.time(timeStr);

    for(var i = 0; i < NO_USERS_TO_CREATE; i++) {

        Users.create({
            first_name: 'First Name' + i,
            last_name: 'Last Name' + i,
            email: 'email...',
            phone: 'phone...',
            address: 'address...',
            prop1: 'prop1...',
            prop2: 'prop2...',
            prop3: 'prop3...',
            prop4: 'prop4...'
        }, function (err, user) {
            created++;
            if(created === NO_USERS_TO_CREATE) {
                console.timeEnd(timeStr);
                Users.drop(function () {
                    console.log('Collection dropped');
                    process.exit(0);
                });
            }
        });

    }

}