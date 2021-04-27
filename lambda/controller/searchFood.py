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

# Runs the Query and returns the result
def runQuery(query):
    try:
        cursor = connection.cursor()
        cursor.execute(query)
        return cursor.fetchall()
    except:
        print("Unexpected error:", sys.exc_info()[0])

def searchFoodByName(foodName):
    rows = runQuery('SELECT foodid  FROM food natural join restaurant where foodname LIKE \'%%{}%%\''.format(foodName))
    foodIdSet = set()
    for row in rows:
        foodIdSet.add(row[0])
    return foodIdSet

def searchFoodByRestaurantName(rName):
    rows = runQuery('SELECT foodid  FROM food natural join restaurant where restaurantname LIKE \'%%{}%%\''.format(rName))
    foodIdSet = set()
    for row in rows:
        foodIdSet.add(row[0])
    return foodIdSet

def aggregateResults(rName = None, foodName = None, tag = None, calories = None):
    foodIdSet = set()
    results = []
    if rName:
        result = searchFoodByRestaurantName(rName)
        foodIdSet = foodIdSet.intersection(result) if foodIdSet else result
    if foodName:
        result = searchFoodByName(foodName)
        foodIdSet = foodIdSet.intersection(result) if foodIdSet else result
    for foodId in foodIdSet:
        results.append(getFoodDetails(foodId))
    return results

def getFoodDetails(foodId):
    result = []
    rows = runQuery('SELECT foodid, restaurantname, foodname, price FROM food natural join restaurant where foodid = {}'.format(foodId))
    for row in rows:
        result.append(row[1])
        result.append(row[2])
        result.append(row[3])
        result.append(getIngredientList(row[0]))
    return result

def getIngredientList(foodId):
    results = []
    rows = runQuery('SELECT ingredientname FROM food natural join foodingredient natural join ingredient WHERE foodid = {}'.format(foodId))
    for row in rows:
        results.append(row[0])
    return results

print(aggregateResults(rName='zaad'))
print(aggregateResults(rName='burg'))