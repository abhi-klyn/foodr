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
                             passwd=password, db=database_name, autocommit=True)


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

# Takses a restaurant name and gives revies in list
# input: 'Sushi Sushi'
# Output: ['good Asian food', 'pho is good']


def getReviews(restaurantName=None):
    rows = runQuery(
        'SELECT review FROM reviews WHERE restaurantname = \'{}\''.format(restaurantName))
    reviews = []
    for r in rows:
        reviews.append(r[0])
    return reviews


print(getReviews('Doaba Deli'))
