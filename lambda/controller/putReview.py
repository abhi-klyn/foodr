import pymysql
import sys
import json
from botocore.exceptions import ClientError
import boto3

# rm -rf ~/Desktop/function.zip
# zip -r9 ~/Desktop/function.zip .
endpoint = 'food.c3eucazhixwr.us-east-1.rds.amazonaws.com'
username = 'admin'
password = 'Columbia123'
database_name = 'food'

# Connection
connection = pymysql.connect(host=endpoint, user=username,
                             passwd=password, db=database_name)
client = boto3.client('comprehend')


def lambda_handler(event, context):

    body = json.loads(event['body'])
    rName = body['rName']
    review = body['review']
    putReview(rName, review)

    #response = []

    res = {"message": " Thanks for publishing a review for: "+rName}
    resp = {}
    resp['headers'] = {}
    resp['statusCode'] = 200
    resp['headers']['Content-Type'] = 'application/json'
    resp['headers']['Access-Control-Allow-Origin'] = '*'
    resp['body'] = json.dumps(res)
    print(resp)
    return resp


def insertQuery(query):
    try:
        cursor = connection.cursor()
        cursor.execute(query)
        connection.commit()
        return True
    except:
        print("Unexpected error:", sys.exc_info()[0])


def runQuery(query):
    try:
        cursor = connection.cursor()
        cursor.execute(query)
        return cursor.fetchall()
    except:
        print("Unexpected error:", sys.exc_info()[0])

# Takses a restaurant name and reviews, returns nothing
# input: 'Sushi Sushi', 'good Fun here'
# Output: None


def putReview(restaurantName, review):
    insertQuery('INSERT INTO reviews(restaurantname, review) VALUES (\'{}\', \'{}\')'.format(
        restaurantName, review))
    foodId = getFoodIdFromReview(review, restaurantName)
    if foodId != -1:
        getSentimentUpdate(review, foodId)
    return True


def updateRating(foodId, delta):
    rating = getRating(foodId)
    print("rating", rating)
    rating += delta
    insertQuery(
        'UPDATE food SET rating = {} WHERE foodid = {};'.format(rating, foodId))


def getSentimentUpdate(review, foodId):
    sentiment = client.detect_sentiment(
        Text=review, LanguageCode='en')['Sentiment']
    print("sentiment ", sentiment, " review ", review)
    if sentiment == 'NEGATIVE':
        updateRating(foodId, -5)
    else:
        updateRating(foodId, 5)


def getFoodIdFromReview(review, restaurantName):
    rows = runQuery('SELECT foodid, foodname, MATCH(foodname) AGAINST (\'{}\' IN NATURAL LANGUAGE MODE) AS score FROM food natural join restaurant where restaurantname = \'{}\' order by score desc limit 1;'.format(review, restaurantName))
    for row in rows:
        return row[0]
    return -1


def getRating(foodid):
    rows = runQuery(
        'SELECT rating from food where foodid = {};'.format(foodid))
    for row in rows:
        print("getRating returns: ", row[0])
        return int(row[0])
    return 100
