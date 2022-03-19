## Getting Started

Run all the commands listed on the bellow documentation only after navigating to the root folder of this project.
Use a command-line terminal to run every command.

## First Steps - Install API Server

This project is using a full fake REST API lib named `json-server` .
Documentation can be founded [HERE](https://github.com/facebook/create-react-app).

#### 1- Install Server Globally

This library has to be intalled globally, otherwise it will not run properly. Just run the following command:

#### `yarn add json-server -g --dev`

This will install the json-server globally and be added to the dev dependencies of this project

###

#### 2- Run Server

To start the API server, please run the following command:

#### `yarn api`

This will start the json-server on `port: 3001` and run the `apps.json` file located on the `api` folder on the root of this project.

After server started successfully, it will be available on this `url` :
` http://localhost:3001/apps`

#### Pre-requisites

These pre-requisites are already implemented, there´s nothing to do here.
Just to inform that the following had to be done to proper use the `json-server api`.

- The `JSON` file must be an object;
- The `JSON` file must have a single root node;
- To make it a single root node, a property `apps` was added on the `JSON` file root, to be complaint to the library standarts;

## Getting the APPS project started

After we´ve got the server running, we have to start the project itselfe.
This project is built in `React Js` and was created by `create-react-app` with `typescript` support.

To mount the project, please follow the steps bellow on the announced order:

#### 1 - Install Dependencies

We need to install all the dependency libraries. To do so just run the following command:

#### `yarn install`

##

#### 2 - Start the APP

After all the dependencies are installed, start the application with:

#### `yarn start`
