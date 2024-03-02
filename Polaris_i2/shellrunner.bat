@echo off
echo ShellRunner(TM) v1 for Confidante
echo Copyright (C) 2024, Himank Deka.
python -m pip install --upgrade pip
pip install -r requirements.txt
py manage.py makemigrations
py manage.py migrate
py manage.py collectstatic --ignore=admin
py manage.py runserver
