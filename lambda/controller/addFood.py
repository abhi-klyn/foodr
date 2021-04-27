import pymysql
import sys

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
    cursor = connection.cursor()
    cursor.execute('SELECT * from foodTable')

    rows = cursor.fetchall()

    for row in rows:
        print("{0} {1}".format(row[0], row[1]))

def runQuery(query):
    try:
        print(query)
        cursor = connection.cursor()
        cursor.execute(query)
        return cursor.fetchall()
    except:
        print("Unexpected error:", sys.exc_info()[0])

def addToCart(foodId, emailId):
    if not foodId or not emailId:
        return False
    rows = runQuery('INSERT INTO orders(email, foodid) VALUES (\'{}\', \'{}\')'.format(emailId, foodId))
addToCart(2, 'abhi.klyn@gmail.com')