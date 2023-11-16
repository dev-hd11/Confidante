from django import forms

class PassResetForm(forms.Form) :
    passwd = forms.CharField(max_length=10)