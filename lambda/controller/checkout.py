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
    emailId = body['emailId']
    res = checkout(emailId)
    #print('res')
    #print(res)
    #print('\n')

    for indx in range(len(res)):
        res[indx][2] = float(res[indx][2])


    #SENDER = "abhi2@cloudproj.awsapps.com"
    response = {}
    response['headers'] = {}
    response['statusCode']=200
    response['headers']['Content-Type'] = 'application/json'
    response['headers']['Access-Control-Allow-Origin'] = '*'
    response['body'] = json.dumps(res)
    print(response)


    SENDER = "abhi2@cloudproj.awsapps.com"
    AWS_REGION = "us-east-1"
    SUBJECT = "Amazon SES Test (SDK for Python)"
    CHARSET = "UTF-8"
    RECIPIENT = emailId
    BODY_HTML = """<html>
        <head></head>
        <body>
        <h1>Thank you for choosing us as your dining partner</h1>
        <p>Powered by Big Data</p>
        </body>
        </html>
            """ 
    BODY_TEXT = json.dumps(res)
    client = boto3.client('ses',region_name=AWS_REGION)

    try:
        #Provide the contents of the email.
        resp = client.send_email(
            Destination={
                'ToAddresses': [
                    RECIPIENT,
                ],
                },
            Message={
            'Body': {
                #'Html': {
                #    'Charset': CHARSET,
                #    'Data': BODY_HTML,
                #},
                'Text': {
                    'Charset': CHARSET,
                    'Data': BODY_TEXT,
                },
            },
            'Subject': {
                'Charset': CHARSET,
                'Data': SUBJECT,
            },
        },
        Source=SENDER#,
        # If you are not using a configuration set, comment or delete the
        # following line
        #ConfigurationSetName=CONFIGURATION_SET,
        )
    except ClientError as e:
        print(e.response['Error']['Message'])
    else:
        print("Email sent! Message ID:"),
        print(resp['MessageId'])

    return response


    #cursor = connection.cursor()
    #cursor.execute('SELECT * from foodTable')

    #rows = cursor.fetchall()

    #for row in rows:
    #    print("{0} {1}".format(row[0], row[1]))

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

def getFoodIdByMail(email):
    rows = runQuery('SELECT foodid FROM orders WHERE email=\'{}\''.format(email))
    foodIdList = []
    for row in rows:
        foodIdList.append(row[0])
    return foodIdList

def deleteOrdersByMail(email):
    insertQuery('DELETE FROM orders WHERE email=\'{}\''.format(email))

def getFoodDetails(foodId):
    result = []
    rows = runQuery('SELECT restaurantname, foodname, price FROM food natural join restaurant where foodid = {}'.format(foodId))
    for row in rows:
        result.append(row[0])
        result.append(row[1])
        result.append(row[2])
    return result

def checkout(email):
    foodIdList = getFoodIdByMail(email)
    deleteOrdersByMail(email)
    orderList = []
    for foodId in foodIdList:
        orderList.append(getFoodDetails(foodId))
    return orderList

# usage 
#print(checkout('abhi.klyn@gmail.com'))
# output -- [[restaurant name, food name, price] .. ]