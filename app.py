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
engine = create_engine(f'postgresql://postgres:{password}@localhost:5432/sharkattack')

Base = automap_base()
Base.prepare(engine, reflect=True)

print(Base.classes.keys())

table1 = Base.classes.table1
table2 = Base.classes.table2
table3 = Base.classes.table3
table4 = Base.classes.table4

# Step 4: Create routes including a root level and API call routes
@app.route("/")
def home():

    return render_template('index.html')

@app.route("/api/v1.0/table1data")
def table1data(): 

    session = Session(engine)

    results = session.query(table1.column1).all()

    session.close()

    table1_results = []

    for item in results:
        item_dict = {}
        item_dict["column1"] = item[0]
        table1_results.append(item_dict)

    return jsonify(table1_results)

# Boiler plate flask app code
if __name__ == "__main__":
    app.run(debug=True)
