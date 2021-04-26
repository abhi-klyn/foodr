import pymysql

# 1. Install pymysql to local directory
# pip install -t $PWD pymysql

# 2. (If Using Lambda) Write your code, then zip it all up 
# a) Mac/Linux --> zip -r9 ${PWD}/function.zip 
# b) Windows --> Via Windows Explorer

# Lambda Permissions:
# AWSLambdaVPCAccessExecutionRole

#Configuration Values
endpoint = 'fooddb.ccykv42klvyg.us-east-1.rds.amazonaws.com'
username = 'admin'
password = 'Columbia123'
database_name = 'food'

#Connection
connection = pymysql.connect(host=endpoint, user=username,
    passwd=password, db=database_name)

def lambda_handler(event, context):
    cursor = connection.cursor()
    cursor.execute('SELECT * from foodTable')

    rows = cursor.fetchall()

    for row in rows:
        print("{0} {1}".format(row[0], row[1]))
