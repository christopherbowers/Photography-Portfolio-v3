# Portfolio Builder
## A full MERN stack application
By: Christopher Bowers

[LinkedIn](https://linkedin.com/in/christopher-bowers-dev) | [Twitter](https://twitter.com/chrisipedia) | [Trello Board](https://trello.com/b/uo3BYHui)

### ERD
![](assets/ERD.png)

### React Component Diagram
![](assets/Component_Diagram.png)


## Description

This site is a basic web app for building a basic portfolio site with projects and images.

## Technology Stack

 - React
 - node.js
 - Express
 - MongoDB
 - CSS
 - AWS S3


## Deployed site on Heroku

<https://bowers-portfolio.herokuapp.com/>

## Run locally

### Clone the project

```bash
git@github.com:christopherbowers/portfolio_builder.git
```

### Install dependencies


```bash
  npm i && cd client && npm i
```

### Environment Variables

To run this project, you will need to add the following environment variables to your .env file located in the root directory:
`AWS_BUCKET_NAME`
`AWS_BUCKET_REGION`
`AWS_ACCESS_KEY_ID`
`AWS_SECRET_ACCESS`

### AWS S3 Setup

You will need to create an S3 bucket, create a IAM policy for the bucket, and creat a IAM user for the server.


#### Start the express server

```bash
npm start && node
```

#### Start the client

```bash
cd client && npm run dev
```
