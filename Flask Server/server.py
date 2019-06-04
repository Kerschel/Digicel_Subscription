from flask import Flask,request,render_template,jsonify
from flask_sqlalchemy import SQLAlchemy
import uuid
from models import Service,Customer,Subscriptions,Agent
from werkzeug.security import generate_password_hash,check_password_hash
from flask_cors import CORS

app= Flask(__name__)
app.config['SQLALCHEMY_DATABASE_URI'] = 'mysql://kerschel:digiceldb@34.83.251.158/digicel'
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
db = SQLAlchemy(app)
CORS(app)

@app.route('/agent',methods=['POST'])
def createAgent():
	username = request.json['username']
	password = generate_password_hash(request.json['password'],method='sha-256')
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
	print ("creating")
	fname = request.json['first_name']
	lname = request.json['last_name']
	contact = request.json['contact']
	email = request.json['email']

	newcustomer = Customer(fname,lname,email,contact)
	db.session.add(newcustomer)
	db.session.commit()
	
	return jsonify({'status': 200, 'msg':'User created'})
	

@app.route('/subscribe',methods=['POST'])
def addSubscription():
	cust_id = request.json['customer_id']
	service = request.json['service_id']
	sub = Subscriptions(cust_id,service)
	db.session.add(sub)
	db.session.commit()
	return jsonify({'status': 200, 'msg':'User created'})


@app.route('/subscribe/<customer_id>',methods=['GET'])
def get_subscriptions(customer_id):
	cust = Customer.query.get(customer_id)
	subscriptions = cust.subscriptions
	services=[]
	for sub in subscriptions:
  		services.append(sub.service)
	return jsonify({'status': 200, 'services': services})
	# sub = Subscriptions(cust_id,service)
	# db.session.add(sub)
	# db.session.commit()
	# return jsonify({'status': 200, 'msg':'User created'})
	# if value == 1:
	# 	subscribe = 
	# 	Subscriptions = Subscriptions.query.filter_by(id=id).first()
	# 	Subscriptions.sub

# @app.route('/customer',methods=['GET'])
# 	def getCustomers():
	

# @app.route('/customer/<customer_name>',methods=['GET'])
# 	def searchCustomer():


# @app.route('/')
# 	def home():
# 	return render_template("index.html")

app.run()
# s = Service.query.all()
# for a in s:
# 	print(a.servicename)