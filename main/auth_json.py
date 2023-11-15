"""
(c) 2023, Himank Deka.
"""
import json

data_dict = {}

def is_signed() :
    global data_dict
    file = open("./data.json", "r")
    data_dict = json.load(file)

    return data_dict["is_signed"]

def is_staff() :
    global data_dict
    file = open("./data.json", "r")
    data_dict = json.load(file)

    return data_dict["is_staff"]

def set_data(key, val) :
    global data_dict
    file = open("./data.json", "w")

    data_dict[key] = val

    json.dump(data_dict, file, indent=4)
    file.close()

