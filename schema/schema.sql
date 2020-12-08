-- Step 1: run the first create table query
DROP TABLE IF EXISTS fill_blanks;
CREATE TABLE fill_blanks(
    area VARCHAR(100)
    ,activity VARCHAR(300)
    ,sex VARCHAR(10)
    ,age VARCHAR(10)
    ,injury VARCHAR(300)
    ,fatal VARCHAR(10)
    ,time VARCHAR(20)
    ,species VARCHAR(200));

-- Step 2: Import the Fill_blanks.csv to the created table

-- Step 3: run the secoond create table query
DROP TABLE IF EXISTS geo_data;
CREATE TABLE geo_data(
    clean_area VARCHAR(100)
    ,combined_area VARCHAR(100)
	,country VARCHAR(100)
    ,lat FLOAT8
	,long FLOAT8);

-- Step 4: Import the geo_data.csv to the created table

-- Step 5: Run the machine learning jupyter notebooks

-- Step 6: Run the rest of these queries:
ALTER TABLE fill_blanks
ADD attack_id SERIAL PRIMARY KEY;

ALTER TABLE geo_data
ADD PRIMARY KEY (clean_area, country);

DROP TABLE IF EXISTS fatal_counts; 
CREATE TABLE fatal_counts AS
(SELECT 
(SELECT COUNT(fatal) FROM fill_blanks
WHERE fatal = 'Y') AS fatal
,(SELECT COUNT(fatal) FROM fill_blanks
WHERE fatal = 'N') AS non_fatal
,(SELECT COUNT(fatal) FROM fill_blanks
WHERE fatal = 'UNKNOWN') AS unknown
,(SELECT COUNT(fatal) FROM fill_blanks) AS total);

ALTER TABLE fatal_counts
ADD fatal_id SERIAL PRIMARY KEY;

DROP TABLE IF EXISTS sex_counts; 
CREATE TABLE sex_counts AS
(SELECT 
(SELECT COUNT(sex) FROM fill_blanks
WHERE sex = 'M') AS male
,(SELECT COUNT(sex) FROM fill_blanks
WHERE sex = 'F') AS female
,(SELECT COUNT(sex) FROM fill_blanks
WHERE sex = 'UNKNOWN') AS unknown
,(SELECT COUNT(sex) FROM fill_blanks) AS total);

ALTER TABLE sex_counts
ADD sex_id SERIAL PRIMARY KEY;

DROP TABLE IF EXISTS age_counts; 
CREATE TABLE age_counts AS
(SELECT 
(SELECT COUNT(age) FROM fill_blanks 
WHERE age IN ('1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12', '13', '14', '15', '16', '17')) AS "children"
,(SELECT COUNT(age) FROM fill_blanks 
WHERE age IN ('18', '19', '20', '21', '22', '23', '24', '25', '26', '27', '28', '29', '30', '31', '32', '33', '34', '35')) AS "young_adults"
,(SELECT COUNT(age) FROM fill_blanks 
WHERE age IN ('36', '37', '38', '39', '40', '41', '42', '43', '44', '45', '46', '47', '48', '49', '50', '51', '52', '53', '54', '55')) AS "adults"
,(SELECT COUNT(age) FROM fill_blanks 
WHERE age IN ('56', '57', '58', '59', '60', '61', '62', '63', '64', '65', '66', '67', '68', '69', '70', '71', '72', '73', '74', '75')) AS "older_adults"
,(SELECT COUNT(age) FROM fill_blanks 
WHERE age IN ('76', '77', '78', '79', '80', '81', '82', '83', '84', '85', '86', '87')) AS "elderly"
,(SELECT COUNT(sex) FROM fill_blanks
WHERE age = 'UNKNOWN') AS unknown
,(SELECT COUNT(age) FROM fill_blanks) AS total);

ALTER TABLE age_counts
ADD age_id SERIAL PRIMARY KEY;

DROP TABLE IF EXISTS machine_learning_encoded; 
CREATE TABLE machine_learning_encoded AS
(SELECT "Country", "Area", 
CASE 
WHEN "Prediction" = 'N' THEN CAST(0 AS FLOAT)
WHEN "Prediction" = 'Y' THEN CAST(1 AS FLOAT)
END "Prediction",
CASE 
WHEN "Actual" = 'N' THEN CAST(0 AS FLOAT)
WHEN "Actual" = 'Y' THEN CAST(1 AS FLOAT)
WHEN "Actual" = 'UNKNOWN' THEN CAST(.5 AS FLOAT)
END "Actual"
FROM machine_learning_results
ORDER BY "Country", "Area");

DROP TABLE IF EXISTS machine_learning_fatality;
CREATE TABLE machine_learning_fatality AS
(SELECT "Country", "Area", ROUND(AVG("Prediction") * 100) AS "Fatality Predicted (%)", ROUND(AVG("Actual") * 100) AS "Fatality Actual (%)"
FROM machine_learning_encoded
GROUP BY "Country", "Area"
ORDER BY "Country", "Area");

ALTER TABLE machine_learning_fatality
ADD PRIMARY KEY ("Country", "Area");

DROP TABLE IF EXISTS plot_data;
CREATE TABLE plot_data AS
(SELECT "Country" AS country, "Area" AS area, "Fatality Predicted (%)" AS fatality_predicted, "Fatality Actual (%)" AS fatality_actual, lat, long
FROM machine_learning_fatality 
LEFT JOIN geo_data
ON clean_area = "Area" AND country = "Country");

ALTER TABLE plot_data
ADD plot_data SERIAL PRIMARY KEY;



