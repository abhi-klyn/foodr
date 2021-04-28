import pymysql
import sys
import json
from botocore.exceptions import ClientError
import boto3

# rm -rf ~/Desktop/function.zip
# zip -r9 ~/Desktop/function.zip .
endpoint = 'fooddb.ccykv42klvyg.us-east-1.rds.amazonaws.com'
username = 'admin'
password = 'Columbia123'
database_name = 'food'

#Connection
connection = pymysql.connect(host=endpoint, user=username,
    passwd=password, db=database_name)

def lambda_handler(event, context):

    body = json.loads(event['body'])
    response = []

    return response

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
    insertQuery('INSERT INTO reviews(restaurantname, review) VALUES (\'{}\', \'{}\')'.format(restaurantName, review))
    return True

putReview('Sushi Sushi', 'good Fun here')