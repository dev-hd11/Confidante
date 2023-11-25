from django import forms

class PassResetForm(forms.Form) :
    passwd = forms.CharField(max_length=10)

class AuthUserForm(forms.Form) :
    usname = forms.CharField(max_length = 200)
    passwd = forms.CharField(max_length=10)