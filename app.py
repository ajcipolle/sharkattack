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
engine = create_engine(f'postgresql://postgres:{password}@localhost:5432/<database name>')

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




# Boiler plate flask app code
if __name__ == "__main__":
    app.run(debug=True)
