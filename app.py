# Step 1: Import Libraries
from config import PW
import numpy as np
from flask import Flask, render_template, jsonify
from flask_cors import CORS
import sqlalchemy
from sqlalchemy.ext.automap import automap_base
from sqlalchemy.orm import Session, sessionmaker
from sqlalchemy import create_engine

# Step 2: Create an app
app = Flask(__name__)

CORS(app)

password = PW

# Step 3: Create engine directed at PostGreSQL Database
engine = create_engine(f"postgresql://postgres:{password}@localhost:5432/sharkattack")

Base = automap_base()
Base.prepare(engine, reflect=True)

print(Base.classes.keys())

fill_blanks = Base.classes.fill_blanks
age_counts = Base.classes.age_counts
fatal_counts = Base.classes.fatal_counts
sex_counts = Base.classes.sex_counts

# Step 4: Create routes including a root level and API call routes
@app.route("/")
def home():

    return render_template('index.html')

@app.route("/api/v1.0/fill_blanks_data")
def fill_blanks_data():

    session = Session(engine)

    results = session.query(fill_blanks.area, fill_blanks.activity, fill_blanks.sex, fill_blanks.age,
                            fill_blanks.injury, fill_blanks.fatal, fill_blanks.time, fill_blanks.species,
                            fill_blanks.attack_id).all()

    session.close()

    fill_blanks_results = []

    for item in results:
        item_dict = {}
        item_dict["area"] = item[0]
        item_dict["activity"] = item[1]
        item_dict["sex"] = item[2]
        item_dict["age"] = item[3]
        item_dict["injury"] = item[4]
        item_dict["fatal"] = item[5]
        item_dict["time"] = item[6]
        item_dict["species"] = item[7]
        item_dict["attack_id"] = item[8]
        fill_blanks_results.append(item_dict)

    return jsonify(fill_blanks_results)

@app.route("/api/v1.0/age_counts_data")
def age_counts_data(): 

    session = Session(engine)

    results = session.query(age_counts.children, age_counts.young_adults, age_counts.adults, age_counts.older_adults,
                            age_counts.elderly, age_counts.unknown, age_counts.total, age_counts.age_id).all()

    session.close()

    age_counts_results = []

    for item in results:
        item_dict = {}
        item_dict["Children (0-17)"] = item[0]
        item_dict["Young Adults (18-35)"] = item[1]
        item_dict["Adults (36-55)"] = item[2]
        item_dict["Older Adults (56-75)"] = item[3]
        item_dict["Elderly (75+)"] = item[4]
        item_dict["Unknown"] = item[5]
        age_counts_results.append(item_dict)

    return jsonify(age_counts_results)

@app.route("/api/v1.0/fatal_counts_data")
def fatal_counts_data(): 

    session = Session(engine)

    results = session.query(fatal_counts.fatal, fatal_counts.non_fatal, fatal_counts.unknown, fatal_counts.total, 
                            fatal_counts.fatal_id).all()

    session.close()

    fatal_counts_results = []

    for item in results:
        item_dict = {}
        item_dict["Fatal"] = item[0]
        item_dict["Non-Fatal"] = item[1]
        item_dict["Unknown"] = item[2]
        fatal_counts_results.append(item_dict)

    return jsonify(fatal_counts_results)

@app.route("/api/v1.0/sex_counts_data")
def sex_counts_data(): 

    session = Session(engine)

    results = session.query(sex_counts.male, sex_counts.female, sex_counts.unknown, sex_counts.total, sex_counts.sex_id).all()

    session.close()

    sex_counts_results = []

    for item in results:
        item_dict = {}
        item_dict["male"] = item[0]
        item_dict["female"] = item[1]
        item_dict["unknown"] = item[2]
        item_dict["total"] = item[3]
        item_dict["sex_id"] = item[4]
        sex_counts_results.append(item_dict)

    return jsonify(sex_counts_results)

# Boiler plate flask app code
if __name__ == "__main__":
    app.run(debug=True)
