"""
(c) 2023, Himank Deka.
"""
import json

print("Updating data...")
file = open("./data.json", "w")
data_dir = {"is_staff" : False, "is_signed" : False, "user_id" : 0}
json.dump(data_dir, file, indent=4)
file.close()
print("File cleaned up!")