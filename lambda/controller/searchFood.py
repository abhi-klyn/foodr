
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
endpoint = 'food.c3eucazhixwr.us-east-1.rds.amazonaws.com'
username = 'admin'
password = 'Columbia123'
database_name = 'food'

#Connection
connection = pymysql.connect(host=endpoint, user=username,
    passwd=password, db=database_name)

def lambda_handler(event, context):
    body = json.loads(event['body'])
    
    #body = event['body']

    #rName = body['rName']
    rName = body.get('rName',"")
    #foodName = body['foodName']

    foodName = body.get('foodName',"")
    #foodName = None
    tag, tag2,tag3 = None, None, None
    tag = body['tag']
    try:    
        tag2 = body['tag2']
        tag3 = body['tag3']
    except:
        pass
    #tag = body.get('tag',None)
    #tag = None
    exIng1 = body['exIng1']
    exIng2 = body['exIng2']
    incIng1 = body['incIng1']
    incIng2 = body['incIng2']


    calories = body.get('calories',"")
    if calories!="":
        calories=int(calories)
    #calories = body['calories']
    print('tag',tag)
    res = aggregateResults(rName=rName, foodName=foodName, tag=tag, tag2=tag2, tag3=tag3, calories=calories, exIng1 = exIng1, exIng2 = exIng2, incIng1 = incIng1, incIng2 = incIng2)
    print('New', res)
    for indx in range(len(res)):
        res[indx][3] = ','.join([x for x in res[indx][3]])
        res[indx][2] = float(res[indx][2])
    for i in res:
        print(i)

    response = {}
    response['statusCode']=200
    response['headers']={}
    response['headers']['Content-Type'] = 'application/json'
    response['headers']['Access-Control-Allow-Origin'] = '*'

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

def includeIngredient(ingredientName):
    rows = runQuery('select foodid from food where foodid in (select foodid from food natural join foodingredient natural join ingredient where ingredientname = \'{}\');'.format(ingredientName))
    foodIdSet = set()
    for row in rows:
        foodIdSet.add(row[0])
    return foodIdSet    

def excludeIngredient(ingredientName):
    rows = runQuery('select foodid from food where foodid not in (select foodid from food natural join foodingredient natural join ingredient where ingredientname = \'{}\');'.format(ingredientName))
    foodIdSet = set()
    for row in rows:
        foodIdSet.add(row[0])
    return foodIdSet

def getFoodByTag(tag):
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
    return getPescetarianFood()

def aggregateResults(rName = None, foodName = None, tag = None, tag2 = None, tag3 = None, calories = None, exIng1 = None, exIng2 = None, incIng1 = None, incIng2 = None):
    foodIdSet = set()
    results = []
    print(rName, foodName, tag, tag2, tag3)
    if rName and rName!="":
        result = searchFoodByRestaurantName(rName)
        foodIdSet = foodIdSet.intersection(result) if foodIdSet else result
    if foodName and foodName!="":
        result = searchFoodByName(foodName)
        foodIdSet = foodIdSet.intersection(result) if foodIdSet else result
    if tag and tag != "":
        result = getFoodByTag(tag)
        foodIdSet = foodIdSet.intersection(result) if foodIdSet else result
    if tag2 and tag2 != "":
        result = getFoodByTag(tag2)
        foodIdSet = foodIdSet.intersection(result) if foodIdSet else result
    if tag3 and tag3 != "":
        result = getFoodByTag(tag3)
        foodIdSet = foodIdSet.intersection(result) if foodIdSet else result   
    if exIng1 and exIng1 != "":
        result = excludeIngredient(exIng1)
        foodIdSet = foodIdSet.intersection(result) if foodIdSet else result   
    if exIng2 and exIng2 != "":
        result = excludeIngredient(exIng2)
        foodIdSet = foodIdSet.intersection(result) if foodIdSet else result   
    if incIng1 and incIng1 != "":
        result = includeIngredient(incIng1)
        foodIdSet = foodIdSet.intersection(result) if foodIdSet else result   
    if incIng2 and incIng2 != "":
        result = includeIngredient(incIng2)
        foodIdSet = foodIdSet.intersection(result) if foodIdSet else result                
    if len(foodIdSet) > 0:
        for foodId in foodIdSet:
            results.append(getFoodDetails(foodId))
    return sorted(results, key = lambda x: getRating(x[4]), reverse=True)

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

def getRating(foodid):
    rows = runQuery('SELECT rating from food where foodid = {};'.format(foodid))
    for row in rows:
        print("getRating returns: ", row[0])
        return row[0]
    return 100

print(aggregateResults(incIng1='potato'))