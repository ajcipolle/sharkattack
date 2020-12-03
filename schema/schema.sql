DROP TABLE IF EXISTS fill_blanks;
CREATE TABLE fill_blanks(
    area VARCHAR(100)
    ,activity VARCHAR(300)
    ,sex VARCHAR(10)
    ,age VARCHAR(10)
    ,injury VARCHAR(300)
    ,fatal VARCHAR(10)
    ,time VARCHAR(20)
    ,species VARCHAR(200)
);
-- Import Fill_blanks.csv here
ALTER TABLE fill_blanks
ADD attack_id SERIAL PRIMARY KEY;

DROP TABLE IF EXISTS fatal_counts; 
CREATE TABLE fatal_counts AS
(SELECT 
(SELECT COUNT(fatal) FROM fill_blanks
WHERE fatal = 'Y') AS fatal
,(SELECT COUNT(fatal) FROM fill_blanks
WHERE fatal = 'N') AS non_fatal
,(SELECT COUNT(fatal) FROM fill_blanks
WHERE fatal = 'UNKNOWN') AS unknown
,(SELECT COUNT(fatal) FROM fill_blanks) AS total
);
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
,(SELECT COUNT(sex) FROM fill_blanks) AS total
);
ALTER TABLE sex_counts
ADD sex_id SERIAL PRIMARY KEY;

DROP TABLE IF EXISTS age_counts; 
CREATE TABLE age_counts AS
(SELECT 
(SELECT COUNT(age) FROM fill_blanks 
WHERE age IN ('1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12', '13', '14', '15', '16', '17')) AS "1-17"
,(SELECT COUNT(age) FROM fill_blanks 
WHERE age IN ('18', '19', '20', '21', '22', '23', '24', '25', '26', '27', '28', '29', '30', '31', '32', '33', '34', '35')) AS "18-35"
,(SELECT COUNT(age) FROM fill_blanks 
WHERE age IN ('36', '37', '38', '39', '40', '41', '42', '43', '44', '45', '46', '47', '48', '49', '50', '51', '52', '53', '54', '55')) AS "36-55"
,(SELECT COUNT(age) FROM fill_blanks 
WHERE age IN ('56', '57', '58', '59', '60', '61', '62', '63', '64', '65', '66', '67', '68', '69', '70', '71', '72', '73', '74', '75')) AS "56-75"
,(SELECT COUNT(age) FROM fill_blanks 
WHERE age IN ('76', '77', '78', '79', '80', '81', '82', '83', '84', '85', '86', '87')) AS "75+"
,(SELECT COUNT(sex) FROM fill_blanks
WHERE age = 'UNKNOWN') AS unknown
,(SELECT COUNT(age) FROM fill_blanks) AS total
);
ALTER TABLE age_counts
ADD age_id SERIAL PRIMARY KEY;
