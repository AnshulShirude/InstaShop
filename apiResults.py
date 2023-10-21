import requests
import json

itemName = input("Enter Item name: ")
# set up the request parameters
params = {
'api_key': '0CC42161E0A649A2AC3625E7CE64A56E',
  'search_term': itemName,
  'type': 'search',
  'customer_zipcode': '02215',
  'delivery_type': 'in_store_pickup',
  'sort_by': 'best_match',
  'output': 'json'
}

# make the http GET request to RedCircle API
api_result = requests.get('https://api.redcircleapi.com/request', params)

# print the JSON response from RedCircle API
# print(json.dumps(api_result.json()))
response_json = api_result.json()
# Get the data at index zero from "search_results"
# search_result_zero = response_json["search_results"][0]
# print(json.dumps(search_result_zero, indent=4))
# print the JSON data at index zero from "search_results"


product_tcin = response_json["search_results"][0]["product"]["tcin"]

paramsAisleNumber = {
'api_key': '0CC42161E0A649A2AC3625E7CE64A56E',
  'type': 'product',
  'tcin': product_tcin,
  'customer_zipcode': '02215',
  'output': 'json'
}
api_resultAisle = requests.get('https://api.redcircleapi.com/request', paramsAisleNumber)
aisleResult = api_resultAisle.json()
# print(json.dumps(aisleResult))
aisleNumber = aisleResult['product']['aisle']
print("Item name is: " +  aisleResult['product']['title'])
print("Aisle number is: " + aisleNumber)