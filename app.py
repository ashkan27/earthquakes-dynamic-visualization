import numpy as np
import os

import sqlalchemy
from sqlalchemy.ext.automap import automap_base
from sqlalchemy.orm import Session
from sqlalchemy import create_engine, func
from config import user, password

from flask import Flask, jsonify, render_template
from flask_sqlalchemy import SQLAlchemy


#################################################
# Database Setup
#################################################
rds_connection_string = user + ":" + password + "@localhost:5432/Earth"
engine = create_engine(f'postgresql://{rds_connection_string}')

print(engine.table_names())

# reflect an existing database into a new model
Base = automap_base()
# reflect the tables
Base.prepare(engine, reflect=True)

# Save reference to the table
earthquake = Base.classes.earthquake

session = Session(engine)

#################################################
# Flask Setup
#################################################
app = Flask(__name__)


#################################################
# Flask Routes
#################################################

@app.route("/")
def index():
    """Return the homepage."""
    return render_template("index2.html")

@app.route("/p2")
def index2():
    """Return the second page."""
    return render_template("index.html")



@app.route("/api")
def earth():
    # Create our session (link) from Python to the DB
    session = Session(engine)

    """Return a list of passenger data including the name, age, and sex of each passenger"""
    # Query all passengers
    results = session.query(earthquake.id, earthquake.date, earthquake.year, earthquake.latitude, earthquake.longitude, earthquake.depth, earthquake.magnitude).all()

    session.close()

    # Create a dictionary from the row data and append to a list of all_passengers
    all_earthquakes = []
    for id, date, year, latitude, longitude, depth, magnitude in results:
        earthquake_dict = {}
        earthquake_dict["id"] = id
        earthquake_dict["date"] = date
        earthquake_dict["year"] = year
        earthquake_dict["latitude"] = latitude
        earthquake_dict["longitude"] = longitude
        earthquake_dict["depth"] = depth
        earthquake_dict["magnitude"] = magnitude
        all_earthquakes.append(earthquake_dict)

    return jsonify(all_earthquakes)


if __name__ == '__main__':
    app.run(debug=True)
