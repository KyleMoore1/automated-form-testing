//importing modules
const marketoApiTest = require('./tests/marketo-api-test');
const formTest = require('./tests/form-test.js');
const utils = require('./scripts/utils.js');
const slack = require('./scripts/slack-post.js');
const marketoConfig = require('./marketo-config.json');
const assert = require('assert');

const tests =  [
  {
    "name": "<first test>",
    "url": "<form url here>",
    "success_url": "<success url here>",
    "actions": {
      "#FirstName": "test",
      "#LastName": "cool",
      "#Company": "test",
      "#Title": "test",
      "#Email": "test" + utils.getDateTime()+"@test.com",
      "#Phone": "123-455-3234",
      "#Country": "United States",
      "#State": "WA",
      "#Button": "click"
    },
    "name": "<second test>",
    "url": "<form url here>",
    "success_url": "<success url here>",
    "actions": {
      "#FirstName": "test",
      "#LastName": "cool",
      "#Company": "test",
      "#Title": "test",
      "#Email": "test" + utils.getDateTime()+"@test.com",
      "#Phone": "123-455-3234",
      "#Country": "United States",
      "#State": "WA",
      "#Button": "click"
    },
  }
]

runTests(tests);

//running tests for each test object
function runTests(tests, email) {
  for (let test of tests) {
    describe(test.name + ' Test', function() {
        it('should submit form successfully', async function () {
            try {
              assert.equal(true, await formTest.run(test.actions, test.url, test.success_url));
            }
            catch (e) {
              slack.log(test.name + " form test failed!");
              throw(e);
            }
          });
          it('should find marketo user', async function () {
              marketoConfig["email"] = test["input[name = email]"];
              marketoConfig["dateTime"] = utils.getDate();
              try {
                assert.equal(true, await marketoApiTest.run(marketoConfig));
              }
              catch (e) {
                slack.log(test.name + " form test failed!");
                throw(e);
              }
            });
      });
  }
}
