import json

file = open("./data.json", "w")
data_dir = {"is_staff" : False, "is_signed" : False}
json.dump(data_dir, file, indent=4)
file.close()