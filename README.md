# Customer Subscription application
This application allows Agents to create customers and subscribe them to a phone plan. Features present are:
1. Sign up page for agents
1. Sign in for agent
1. Add a customer to database
1. Search for customers by first name or by first name and last name combination
1. Add or remove a customer from subscriptions of plans
1. Edit customer information
1. View history of plans that were no longer active

I added the plan history in the case where you would want to use Data Mining to provide recommendations based on previous plans.
# Live site:
> https://digicel-customers.appspot.com/

## REST API Endpoint
> https://flask-api-243101.appspot.com

## Local Setup
### Front-end
To run the __web application__ locally:

1. Download and Install [Node-js](https://nodejs.org/en/ ) if you don't have it.

1. Install the [Angular CLI](https://github.com/angular/angular-cli) :

   ```
   $ npm install -g @angular/cli
   ```

1. `cd` to the repository directory and run the following command:

   ```
   $ ng serve
   ```
1. Application can now be accessed localled at:
    > http://127.0.0.1:4200/

### Back-end
To run the __Flask API Backend__ locally:

1. `cd` to the flask server directory:
    ```
    $ cd Flask' 'Server
    ```
1.  Install all dependencies from requirements.txt:
    ```
    $ pip install -r requirements.txt
    ```
1.  Run the flask server: 
    ```
    $ python server.py
    ```


# Development Stack
  * OS: Ubuntu
  * Server Side Scripting: Python 2.7
  * Server Side Framework: Flask
  * ORM: SQLAlchemy
  * Front End Framework: Angular 8
  * CSS: Bootstrap 4

# Hosting:
* Front-end - Google Cloud App Engine
* Back-end - Google Cloud App Engine
* MySql DB - www.freemysqlhosting.net
