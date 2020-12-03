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
# table1 = Base.classes.table1
# table2 = Base.classes.table2
# table3 = Base.classes.table3
# table4 = Base.classes.table4

# Step 4: Create routes including a root level and API call routes
@app.route("/")
def home():

    return render_template('index.html')

@app.route("/api/v1.0/fill_blanks_data")
def fill_blanks_data(): 

    session = Session(engine)

    results = session.query(fill_blanks.area, fill_blanks.activity, fill_blanks.sex, fill_blanks.age, fill_blanks.injury, fill_blanks.fatal, fill_blanks.time, fill_blanks.species, fill_blanks.attack_id).all()

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

# Boiler plate flask app code
if __name__ == "__main__":
    app.run(debug=True)
