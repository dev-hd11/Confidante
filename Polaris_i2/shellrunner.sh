#!/bin/bash

python3 -m pip install --upgrade pip

pip3 install -r requirements.txt

python3 manage.py makemigrations

python3 manage.py migrate

python3 manage.py collectstatic --ignore=admin

python3 manage.py runserver
