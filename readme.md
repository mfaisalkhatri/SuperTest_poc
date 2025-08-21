# API Testing using SuperTest, Mocha and Chai

[![License](https://img.shields.io/badge/License-Apache%202.0-blue.svg)](https://opensource.org/licenses/Apache-2.0)
[![Node.js CI](https://github.com/mfaisalkhatri/SuperTest_poc/actions/workflows/node.js.yml/badge.svg)](https://github.com/mfaisalkhatri/SuperTest_poc/actions/workflows/node.js.yml)

## Don't forget to give a :star: to make the project popular.

## What is it all about?

I have been using Rest-Assured framework all the time for testing APIs with Java. But this time it was my project's demand to perform API testing in Javascript.
Being a newbie to JS, I googled for some tools and found _**SuperTest**_.
To introduce _**SuperTest**_, it is a high level abstraction of HTTP requests, making it perfect for testing APIs.
I decided to do a POC of this tool to understand it better, hence this project was created.
I thought of sharing this on github, so it helps others as well who want to learn more about this tool.
_Checkout [this](https://www.npmjs.com/package/supertest) link to learn more about `SuperTest`_

## Getting Started:

You need to have the following installed in your machine:

1. Node (Latest Version).
2. npm(Latest Version).
3. `mocha` framework is used for writing tests and `chai` for assertions, following command should help to install the required npm packages:
   `npm i -D -g supertest mocha chai mochawesome`
4. For running the tests, you need to type the command: `npm run test`. _(Check Package.json for more details)_
5. For generating the mochawesome report, run the command `npm run report` _(Check Package.json for more details.)_ It will generate and export the report in `mochawesome-report` folder from which you can open the `index.html` file to view the report.

## Talking more about the Scenarios Covered in this project:

- I have covered, `GET`, `POST`, `PUT`, `PATCH` and `DELETE` requests. You will find the example code in the test folder of the repository.

- End to End scenarios have been added for the restful booker APIs. Check out [API Testing with superTest](https://medium.com/@iamfaisalkhatri/api-testing-using-supertest-ea37522fa329) for more details.

- [Mochawesome reporter](https://www.npmjs.com/package/mochawesome) is used to generate the reports and show summary of the tests. I found it quite useful report as it shows the test description along with the tests and the time taken to run the tests.

<img src="assets/mochawesome-report.png"/>

## :question: Need Assistance?

- Discuss your queries by writing to me @ `mohammadfaisalkhatri@gmail.com`
  OR ping me on any of the social media sites using the below link:
    - [Linktree](https://linktr.ee/faisalkhatri)

## :computer: Paid Trainings

- Contact me for Paid trainings related to Test Automation and Software Testing,
  mail me @ `mohammadfaisalkhatri@gmail.com` or ping me on [LinkedIn](https://www.linkedin.com/in/faisalkhatri/)

## :thought_balloon: Checkout the blogs related to Testing written by me on the following links:

- [Medium Blogs](https://medium.com/@iamfaisalkhatri)
- [LambdaTest Blogs](https://www.lambdatest.com/blog/author/mfaisalkhatri/)
- [My Website](https://mfaisalkhatri.github.io)
