# sharkattack
![Great Whites](static/img/hero-bg.jpg)

We are looking at shark attacks around the world, predicting the likelyhood of a fatality based on location and other features. 

# A Machine Learning Project



## Contributors: The Delightful Street Artists

- [Daniel Carter](https://github.com/Dcarter15)

- [Tony Cipolle](https://github.com/ajcipolle)

- [John Levear](https://github.com/jlevear)

- [Autum Perconti](https://github.com/aperconti)

# Before You Begin

### Set Up Environment

1.  Clone this repo to your machine.
2.  Open GitBash/ZSH:
    - Create a new environment using the following command:
      `conda create --name <env> python=3.6`
    - Navigate to the cloned folder with the requirements.txt folder and type:
      `pip install -r requirements.txt`
3.  Once everything is installed, use your editor of choice and activate your environment with either:
    `conda activate <env>` or `source activate <env>`

### Database

1.  Open pgAdmin4 and create a new database called "sharkattack"
2.  Load the schema file: [schema](schema/schema.sql)
3.  Follow the 6 steps in the schema file

### API Keys/Passwords

1.  Open the [configEDIT.py](configEDIT.py):
    - Rename the file 'config.py'
    - Open file and replace the string after PW with your Postgres password as a string
    - Save the document and close
2.  Open the [configEDIT.js](static/js/configEDIT.js)
    - Navigate to the static -> js folder and rename the configEDIT.js file as config.js
    - Open the file and insert your [Mapbox](https://www.mapbox.com/) API key
    - Save the document and close

### Start App

1.  Run the app.py application and follow the link.

# Project Specifics


## Data Sources


- **Main Data Source**: [Shark Attacks](https://www.kaggle.com/.... This is a geographic dataset... 

- **Lat/Long Coordinates by Location**: OpenCageGeocode API


## Data Cleaning

- NAs replaced with "unknown"
- Matching and grouping locations

### Considerations

- Grouping and weighting of locations

- Feature importance

<hr>
 
