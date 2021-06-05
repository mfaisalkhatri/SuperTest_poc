# POC on SuperTest.

## What is it all about?
I have been using Rest-Assured framework all the time for testing APIs with Java. But this time it was my project's demand to perform API testing in Javascript. 
Being a newbie to JS, I googled for some tools and found `SuperTest`. 
To introduce `SuperTest`, it is a high level abstraction of HTTP requests, making it perfect for testing APIs.
I decided to do a POC of this tool to understand it better, hence this project was created. 
I thought of sharing this on github, so it helps others as well who want to learn more about this tool.
*Checkout [this][] link to learn more about `SuperTest`* 

## Getting Started:
You need to have the following installed in your machine:
1. Node (Latest Version).
2. npm(Latest Version).
3. I have used `mocha` framework for writing tests and `chai` for assertions, following command should help to install the required npm packages:
`npm i -D supertest mocha chai`
4. For running the tests, you need to type the command: `npm test`. *(Check Package.json for more details)*

## Talking more about the Scenarios Covered in this project:
As far as the tests are concerned, I have covered, `GET`, `POST` and `PUT` request and accordingly you can find the tests in the respective spec files for the same.

## Need Assistance?
* Discuss your queries by writing to me @ mohammadfaisalkhatri@gmail.com
* Connect me at [LinkedIn][] or [Twitter][]

 ## :star: What you do if you like the project?
* Spread the word with your network.
* **Star** the project to make it popular.

 
[linkedIn]: https://www.linkedin.com/in/faisalkhatri/
[Twitter]: https://twitter.com/mfaisal_khatri
[this]: https://www.npmjs.com/package/supertest
