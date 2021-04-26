import pymysql

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

def searchFoodByName(foodName):
    cursor = connection.cursor()
    cursor.execute('SELECT restaurantname, foodname, price, description  FROM food natural join restaurant where foodname LIKE \'%%{}%%\''.format(foodName))

    rows = cursor.fetchall()

    for row in rows:
        print("{0} {1} {2} {3}".format(row[0], row[1], row[2], row[3]))
searchFoodByName('burg')