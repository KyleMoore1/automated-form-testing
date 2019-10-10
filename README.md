# What Is Automated Form Testing?

Automated Form Testing is a command line form testing suite built with Node.js, Puppeteer, Mocha, Marketo API, and Slack API. It is designed to test whether production forms across multiple sites are submitting properly and creating Marketo accounts successfully. All success and failure notifications are posted to a slack channel.

# Setup

## Marketo
In `marketo-config.json` fill in values for `domain`, `client_id`, and `client_secret`. In `marketo-api-test.js` fill in expected email.

## main.js
Specify tests across multiple urls by adding test objects to the list `tests`.  Test Objects are of the format:

```{
	  name: <form name> //name of form (used for error reporting)
		url: <your url> //url of form page
		success_url: <your success_url> //test will succeed if form goes to this url on submission
		actions {
			#selector: <value>, //fills in selector with value
			#selector: "click" //clicks selector
    }
	}```

## Slack
To enable slack error reporting fill in values for `token`, and `conversationId` in `./scripts/slack-post.js`


# What I Learned
This was my first Node.js project so I learned about npm and the differences between client side and server side JavaScript. In addition, I learned how to write asynchronous code, how to automate tasks in the browser, and improved my ability to work with unfamiliar APIs.

# Open Issues
This code needs to be organized and documented better. Users shouldn't have to go to 4 different files to set this up. A single config file would be better. This is an easy fix and will be implemented when I have time.
