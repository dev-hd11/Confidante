<div align = "center">
<h1> Confidante </h1>
</div>


**A Django app to maintain your diary entries. Secured with encryption and authentication system.**

## Features :
- Secure
- Encrypted
- For different users
- Capture the moments of your life
- Privacy
- Styled with Bootstrap 5

## Alert :
Project is currently under development. It will get ready soon.

## Dependencies :
1. Python 3.11 or 3.12
2. Django

## Installation :
1. Create a virtual environment.<br>(For Windows)
```shell
python -m venv myenv
cd myenv
./Scripts/activate.bat
``` 

2. Install requirements.<br>
```shell
python -m pip install -r requirements.txt

```

3. Download the latest release.
4. Collect the static files if you have modified them.
```shell
py manage.py collectstatic
```
5. Make migrations.
```shell
py manage.py makemigrations
py manage.py migrate
```
6. Run the sever.
```shell
py manage.py runserver 80
```
7. Go to [localhost](127.0.0.1:80)

**Note: This steps are based on the Pre View 2 version. You need to edit the secret key variable in the settings.py file.**

## Copyright :
See [COPYRIGHTS](./COPYRIGHTS.md)

## Release Notes :

### Release Polaris i1 Pre View :
This release is a preview of the web UI. Not functional yet. This release has some UI components and non-commercial. Please wait till we release our stable version.

**Patch Level: 2023.2.1.3**

Version Code: 0.1.2

Full Changelog: https://github.com/dev-hd11/Confidante/commits/v0.1.1

### Release Polaris i1 Pre View 2 :
This release contains database upgrades with a few UI improvement. This release is also a pre-view. Please wait for the full release.

[ADD] Staff Portal: A lightweight alternative to Django Admin. Contains features to view the database.
[ENHANCED] UI Components: Some new UI components in the homepage.
[ADD] Database Models: New database, with tables for authentication system and diary entries.
[FIX] Security Update: Security tokens updated.

Version Code: 0.2.1

 **Patch level: 2023.3.1.4**

**Full Changelog**: https://github.com/dev-hd11/Confidante/compare/v0.1.1-p...0.2.0


## Contributing :
See [CONTRIBUTING](./CONTRIBUTING.md).
