from flask import Flask
from flask_sqlalchemy import SQLAlchemy

app= Flask(__name__)
app.config['SQLALCHEMY_DATABASE_URI'] = 'mysql://kerschel:digiceldb@34.83.251.158/digicel'

db = SQLAlchemy(app)



	# def __repr__(self):
	# 	return '<Service %r>' % self.servicename

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
	password = db.Column('password',db.String(80))
	name = db.Column('name',db.String(80))

	def __init__(self, username, password,name,email):
		self.username = username
		self.password = password
		self.name = name
		self.email = email
	


	

	
	