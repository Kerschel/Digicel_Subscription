from flask import Flask,request,render_template,jsonify
from flask_sqlalchemy import SQLAlchemy
import uuid
import datetime
from werkzeug.security import generate_password_hash,check_password_hash
from flask_jwt_extended import create_access_token
from flask_jwt_extended import JWTManager

from flask_cors import CORS

app= Flask(__name__)
# GCP MYSQL database connection
app.config['SQLALCHEMY_DATABASE_URI'] = 'mysql://kerschel:digiceldb@34.83.251.158/digicel'
app.config['JWT_SECRET_KEY'] = 'secret'

app.debug=True
db = SQLAlchemy(app)
jwt = JWTManager(app)

CORS(app)


class Customer(db.Model):
	__tablename__ = "customers"
	id = db.Column('id',db.Integer, primary_key=True)
	firstname = db.Column('first_name',db.String(80))
	lastname = db.Column('last_name',db.String(80))
	email = db.Column('email',db.String(80))
	contact = db.Column('contact',db.String(80))
	subscriptions = db.relationship("Subscriptions",backref="custID",lazy="select",uselist=True)

	def __init__(self, firstname, lastname,email,contact):
		self.firstname = firstname
		self.lastname = lastname
		self.email = email
		self.contact = contact

class Subscriptions(db.Model):
	__tablename__ = "subscriptions"
	id = db.Column('id',db.Integer, primary_key=True)
	customer_id = db.Column('customerid',db.Integer,db.ForeignKey('customers.id'))
	active = db.Column('active',db.Boolean,default=True)
	start = db.Column('startdate',db.DateTime, default=datetime.datetime.utcnow, nullable=False)
	end = db.Column('enddate',db.DateTime, nullable=True)
	service = db.Column('serviceid')

	def __init__(self, customer_id, service):
			self.service = service
			self.customer_id = customer_id

class Service(db.Model):
	__tablename__ = "service"
	id = db.Column('id',db.Integer, primary_key=True)
	servicename = db.Column('servicename',db.String(80))
	price = db.Column('price',db.Float(5))

	def __init__(self, servicename, price):
		self.servicename = servicename
		self.price = price

class Agent(db.Model):
	__tablename__ = "agent"
	id = db.Column('id',db.Integer, primary_key=True)
	username = db.Column('username',db.String(80))
	email = db.Column('email',db.String(80))
	password = db.Column('password',db.String(200))
	name = db.Column('name',db.String(80))

	def __init__(self, username, password,name,email):
		self.username = username
		self.password = password
		self.name = name
		self.email = email

@app.route('/agent',methods=['POST'])
def createAgent():
	username = request.json['username']
	password = generate_password_hash(request.json['password'], method='sha256')
	name = request.json['name']
	email = request.json['email']

	newAgent = Agent(username,password,name,email)
	db.session.add(newAgent)
	db.session.commit()
	return jsonify({'status': 200, 'msg':'Agent created'})
	 	
# @app.route('/agent',methods['POST'])
# def loginAgent():
# 	username = request.json['username']
# 	agent = Agent.query.filter_by(username=username)
# 	if(check_password_hash(request.json['password'],agent)):
#   		pass
# 	name = request.json['name']
# 	email = request.json['email']

# 	newAgent = Agent(username,password,name,email)
# 	db.session.add(newAgent)
# 	db.session.commit()
# 	return jsonify({'status': 200, 'msg':'Agent created'})

@app.route('/customer',methods=['POST'])
def createCustomer():
	fname = request.json['first_name']
	lname = request.json['last_name']
	contact = request.json['contact']
	email = request.json['email']

	newcustomer = Customer(fname,lname,email,contact)
	db.session.add(newcustomer)
	db.session.commit()
	
	return jsonify({'status': 200, 'msg':'User created'})
	

@app.route('/customer/<customername>',methods=['GET'])
def get_customer(customername):
	name = customername.split(" ")
	if(len(name) >1):
		cust = Customer.query.filter_by(firstname = name[0],lastname=name[1]).all();
	else:
		cust = Customer.query.filter_by(firstname = customername).all();
	results=[]
	for user in cust:
		value = {
			"id":user.id,
			"firstname":user.firstname,
			"lastname":user.lastname,
			"email":user.email,
			"contact":user.contact}
		results.append(value)
	return jsonify(results)


@app.route('/services',methods=['GET'])
def get_all_services():
	services =	Service.query.all();
	results=[]
	for serve in services:
		val = {
		"id":serve.id,
		"servicename":serve.servicename,
		"price":serve.price}
		results.append(val)	
	return jsonify(results)

	
	# return 


@app.route('/subscribe',methods=['POST'])
def addSubscription():
	print("HJERE")
  	
	cust_id = request.json['customer_id']
	service = request.json['service_id']
	sub = Subscriptions(cust_id,service)
	db.session.add(sub)
	db.session.commit()
	return jsonify({'status': 200, 'msg':'User created'})

@app.route('/removesubscribe',methods=['POST'])
def deactivateSubscription():
	cust_id = request.json['customer_id']
	serviceid = request.json['service_id']
	cust = Subscriptions.query.filter_by(customer_id = cust_id,service=serviceid,active=1).first();
	cust.active=0
	cust.enddate = datetime.date.today()
	db.session.commit()
	return jsonify({'status': 200, 'msg':'Subscription updated'})


@app.route('/subscribe/<customer_id>',methods=['GET'])
def get_subscriptions(customer_id):
	cust = Customer.query.get(customer_id)
	subscriptions = cust.subscriptions
	services=[]
	for sub in subscriptions:
  		if (sub.active):
  				services.append(sub.service)
	return jsonify(services)


@app.route("/")
def helloWorld():
	cust = Customer.query.get(1)
	subscriptions = cust.subscriptions
	serv=[]
	for s in subscriptions:
		serv.append(s.service)
	return jsonify({'status':200,'services':serv})



@app.route('/login', methods=['POST'])
def login():
		username = request.json['username']
		password = request.json['password']
		result =jsonify({"error":"User does not exist"})
		agent = Agent.query.filter_by(username=username).first();
		
		if (agent != None):
			if check_password_hash(agent.password,password ):
				access_token = create_access_token(identity = {'first_name': agent.name, 'email': agent.email})
				result = jsonify({"token":access_token})
			else:
				result = jsonify({"error": "Invalid username and password"})

		return result 

	
if __name__ == "__main__":
	app.run()
