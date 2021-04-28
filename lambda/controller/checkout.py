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
print(checkout('abhi.klyn@gmail.com'))
# output -- [[restaurant name, food name, price] .. ]
