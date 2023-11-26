"""
(c) 2023, Himank Deka.
"""
import json
from . import codes_lib

data_dict = dict()

def is_pre_init() :
    if data_dict == {} :
        code = codes_lib.Code(1)
        return code.decode("/")
    
    else :
        code = codes_lib.Code(0)
        return code.decode("/")

def init() :
    global data_dict
    file = open("./data.json", "r")
    data_dict = json.load(file)

    file.close()

def is_signed() :
    global data_dict
    return data_dict["is_signed"]

def is_staff() :
    global data_dict
    
    return data_dict["is_staff"]

def set_data(pairs: dict) :
    file = open("./data.json", "w")
    data_dict = {"is_staff" : False, "is_signed" : False, "user_id" : 0}
    for key, val in pairs.items() :
        data_dict[key] = val
        
    json.dump(data_dict, file, indent=4)
    file.close()

    init()

def get_us_id() :
    global data_dict
    
    return data_dict["user_id"]

def return_404() :
    code = codes_lib.Code(2)
    return code.throw_404()
