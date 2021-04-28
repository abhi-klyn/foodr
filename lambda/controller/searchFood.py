
import pymysql
import json
'''
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
    cursor.execute("SELECT * from food")

    rows = cursor.fetchall()

    for row in rows:
        print("{0} {1}".format(row[0], row[1]))

import pymysql
'''
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
    #body = json.loads(event['body'])
    
    body = event['body']

    #rName = body['rName']
    rName = body.get('rName',"")
    #foodName = body['foodName']

    foodName = body.get('foodName',"")
    #foodName = None

    tag = body['tag']
    #tag = body.get('tag',None)
    #tag = None

    calories = body.get('calories',"")
    if calories!="":
        calories=int(calories)
    #calories = body['calories']

    res = aggregateResults(rName,foodName,tag,calories)
    print('New', res)
    for indx in range(len(res)):
        res[indx][3] = ','.join([x for x in res[indx][3]])


    for i in res:
        print(i)

    response = {}
    response['statusCode']=200
    response['headers']={}
    response['headers']['Content-Type'] = 'application/json'

    respDict = {}
    respDict['solutions'] = res

    response['body'] = json.dumps(respDict)
    return response

    #print(aggregateResults(rName='zaad'))
    #print(aggregateResults(rName='burg'))
'''
NEW BELOW
'''


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

def getVeganFood():
    rows = runQuery('SELECT foodid from food where foodid not in (SELECT foodid FROM food natural join foodingredient natural join ingredient where ingredient.tag in (\'meat\', \'dairy\', \'eggs\', \'poultry\', \'seafood\'));')
    foodIdSet = set()
    for row in rows:
        foodIdSet.add(row[0])
    return foodIdSet

def getVegitarianFood():
    rows = runQuery('SELECT foodid from food where foodid not in (SELECT foodid FROM food natural join foodingredient natural join ingredient where ingredient.tag in (\'meat\', \'eggs\', \'poultry\', \'seafood\'));')
    foodIdSet = set()
    for row in rows:
        foodIdSet.add(row[0])
    return foodIdSet

def getPescetarianFood():
    rows = runQuery('SELECT foodid from food where foodid not in (SELECT foodid FROM food natural join foodingredient natural join ingredient where ingredient.tag in (\'meat\', \'eggs\', \'poultry\'));')
    foodIdSet = set()
    for row in rows:
        foodIdSet.add(row[0])
    return foodIdSet

def getNutFreeFood():
    rows = runQuery('SELECT foodid from food where foodid not in (SELECT foodid FROM food natural join foodingredient natural join ingredient where ingredient.tag in (\'nuts\'));')
    foodIdSet = set()
    for row in rows:
        foodIdSet.add(row[0])
    return foodIdSet

def getMeatFood():
    rows = runQuery('SELECT foodid from food where foodid in (SELECT foodid FROM food natural join foodingredient natural join ingredient where ingredient.tag in (\'meat\', \'eggs\', \'poultry\', \'seafood\'));')
    foodIdSet = set()
    for row in rows:
        foodIdSet.add(row[0])
    return foodIdSet

def getGlutenFreeFood():
    rows = runQuery('SELECT foodid from food where foodid not in (SELECT foodid FROM food natural join foodingredient natural join ingredient where ingredient.tag in (\'gluten\'));')
    foodIdSet = set()
    for row in rows:
        foodIdSet.add(row[0])
    return foodIdSet

def getFoodByTag(tag):
  print('xuyz', tag)
  if tag == 'vegan': 
    return getVeganFood()
  if tag == 'vegetarian':
    return getVegitarianFood()
  if tag == 'gluten-free':
    return getGlutenFreeFood()
  if tag == 'nut-free':
    return getNutFreeFood()
  if tag == 'contains-meat':
    return getMeatFood()
  if tag == 'pescetarian':
    print('cde', tag)
    return getPescetarianFood()

def aggregateResults(rName = None, foodName = None, tag = None, calories = None):
    print(tag)
    foodIdSet = set()
    results = []
    if rName!="":
        result = searchFoodByRestaurantName(rName)
        foodIdSet = foodIdSet.intersection(result) if foodIdSet else result
    if foodName!="":
        result = searchFoodByName(foodName)
        foodIdSet = foodIdSet.intersection(result) if foodIdSet else result
    if tag != "":
        result = getFoodByTag(tag)
        foodIdSet = foodIdSet.intersection(result) if foodIdSet else result
    if len(foodIdSet) > 0:
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
        result.append(row[0])
    return result

def getIngredientList(foodId):
    results = []
    rows = runQuery('SELECT ingredientname FROM food natural join foodingredient natural join ingredient WHERE foodid = {}'.format(foodId))
    for row in rows:
        results.append(row[0])
    return results