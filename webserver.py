"""
webserver.py

File that is the central location of code for your webserver.
"""

from flask import Flask, render_template
import requests
import os

# Create application, and point static path (where static resources like images, css, and js files are stored) to the
# "static folder"
app = Flask(__name__,static_url_path="/static")

@app.route('/index')
def home_page():
    return render_template("Homepage.html")

@app.route('/about')
def about():
    return render_template("Aboutus.html")

@app.route('/contact',methods = ['GET'])
def contact_us():
    return render_template("Contactus.html",notifications=[])

@app.route('/contact',methods = ['POST'])
def contact_us_email():
    name = request.form.get("Name")
    subject = request.form.get("Subject")
    message = request.form.get("Message")
    email = request.form.get("Email")
    notifications = []
    if email[-1] == "o":
    	email = email[0:-1]
    else:
    	email = ""
    if name != "" and subject != "" and message !="" and email !="":
        data = {
            'from': os.environ["INFO253_MAILGUN_FROM_EMAIL"],
            'to': os.environ["INFO253_MAILGUN_TO_EMAIL"],
            'subject': subject,
            'text': message +" from "+name+" "+ email,
        }
        auth = (os.environ["INFO253_MAILGUN_USER"], os.environ["INFO253_MAILGUN_PASSWORD"])

        r = requests.post(
            'https://api.mailgun.net/v3/{}/messages'.format(os.environ["INFO253_MAILGUN_DOMAIN"]),
            auth=auth,
            data=data)
        if r.status_code == requests.codes.ok:
            notifications = "Hi, "+name+". Your email was sent!"
        else:
            notifications ="Hi, "+name+". Your email was not sent. Please try again later."

    return render_template("Contactus.html", notifications=notifications)

@app.route('/blog/8-experiments-in-motivation')
def blog1():
    return render_template("8experimentsinMotivation.html")

@app.route('/blog/a-mindful-shift-of-focus')
def blog2():
    return render_template("AMindfulShiftofFocus.html")

@app.route('/blog/how-to-develop-an-awesome-sense-of-direction')
def blog3():
    return render_template("HowtoDevelopanAwesomeSenseofDirection.html")

@app.route('/blog/training-to-be-a-good-writer')
def blog4():
    return render_template("TrainingtoBeaGoodWriter.html")

@app.route('/blog/what-productivity-systems-wont-solve')
def blog5():
    return render_template("WhatProductiveSystemsWon'tSolve.html")
