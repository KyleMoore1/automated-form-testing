function getDate() {
  const today = new Date();
  return today.getFullYear()+'-'+(today.getMonth()+1)+'-'+today.getDate();
}

function getDateTime() {
  const today = new Date();
  return getDate() + today.getHours() + today.getMinutes() + today.getSeconds();
}

function generateEmail() {
  return "test" + getDateTime() + "@test.com";
}

function assertText(arg1, arg2) {
  if (arg1 !== arg2) {
    console.log(colors.red(arg1 + " is not equal to " + arg2));
  }
}

function delay(time) {
   return new Promise(function(resolve) {
       setTimeout(resolve, time)
   });
}


module.exports.getDate = getDate;
module.exports.getDateTime = getDateTime;
module.exports.generateEmail = generateEmail;
module.exports.assertText = assertText;
module.exports.delay = delay;
