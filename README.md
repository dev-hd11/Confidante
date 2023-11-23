<div align = "center">
<h1> Confidante </h1>
</div>

![GitHub release (with filter)](https://img.shields.io/github/v/release/dev-hd11/Confidante)
![GitHub code size in bytes](https://img.shields.io/github/languages/code-size/dev-hd11/Confidante)
![GitHub License](https://img.shields.io/github/license/dev-hd11/Confidante)
![GitHub top language](https://img.shields.io/github/languages/top/dev-hd11/Confidante)
![GitHub Latest Release](https://img.shields.io/badge/latest_release-Polaris%20i1%20CARBON-green)

**A Django app to maintain your diary entries. Secured with encryption and authentication system.**

## Table of Content :
1. [Features](#features-)
2. [Alert](#alert-)
3. [Dependencies](#dependencies-)
4. [Installation](#installation-)
5. [Copyrights](#copyrights-)
6. [Release Notes](#release-notes-)
7. [Contributing](#contributing-)
8. [Support](#support-)

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
6. Create an admin account.
```shell
py manage.py createsuperuser
```
7. Run the sever.
```shell
py manage.py runserver
```
8. Go to [localhost](127.0.0.1:8000)
9. Clean up the files while closing.
```shell
py cleanup.py
```

**Note: This steps are based on the RC1 version. You need to edit the secret key variable in the settings.py file.**

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

[ADD] Staff Portal (v1): A lightweight alternative to Django Admin. Contains features to view the database. [BETA] <br>
[ENHANCED] UI Components: Some new UI components in the homepage.<br>
[ADD] Database Models: New database, with tables for authentication system and diary entries.<br>
[FIX] Security Update: Security tokens updated.<br>

Version Code: 0.2.1

 **Patch level: 2023.3.1.4**

**Full Changelog**: https://github.com/dev-hd11/Confidante/compare/v0.1.1-p...0.2.0

### Release Ploaris i1 RC1 :
This release is a part of the Pre-Views. This series let's you explore the project which is in the last phase of development. Full release coming soon.

[FIX] Bug fixes in JSON auth system.<br>
[ADD] /star/ : Path for starring an entry.<br>
[ADD] /get_en/ : Path for viewing an entry.<br>
[ADD] /delete/ : Path for deleting an entry.<br>
[UPDATE] Staff Portal (v1.4.0) : An updated version of Staff Portal.<br>
[ADD] Confidante UPS (v1) : A system that reserves URLs for authenticated users only. [BETA]<br>
[DEPRECATED] Staff Portal - Star System changed. <br>
[DEPRECATED] Staff Portal (v1) has been removed.<br>
[ENHANCED] UI components on all pages improved.<br>
[ADD] Confidante JAL (v1.0.3) : Python library for Confidante UPS. <br>

**Patch level : 2023.9.3.12**

Version Code: 0.5.1

**Full Changelog**: https://github.com/dev-hd11/Confidante/compare/0.2.0...v0.5.1

## Contributing :
See [CONTRIBUTING](./CONTRIBUTING.md).

## Support
Having problems? Search for it in [NEWS](./NEWS.md) or in *Issues* or raise your own *issue*.
