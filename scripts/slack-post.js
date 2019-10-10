const { WebClient } = require('@slack/web-api');

  /**
    Description: posts message to slack channel

    @param message message to be posted to slack
  */
function log(message) {
  const token = '<your slack token here>';

  const web = new WebClient(token);

// This argument can be a channel ID, a DM ID, a MPDM ID, or a group ID
  const conversationId = '<your conversationId here>';

  (async () => {
    const res = await web.chat.postMessage({ channel: conversationId, text: message });
  })();
}


module.exports.log = log;
