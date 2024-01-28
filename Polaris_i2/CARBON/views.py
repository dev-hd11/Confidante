# (C) Himank Deka, 2023
from django.shortcuts import render, redirect
from django.contrib.auth import login, authenticate, logout
from django.contrib.auth.decorators import login_required
from django.contrib.auth.models import User

# Create your views here.
def home(request) :
    return render(request, "homepage.html")

@login_required(login_url='/auth/?page=Login')
def success(request) :
    return render(request, "sucess.html")

def auth(request) :    
    page = request.GET.get("page")

    if page == 'Login' :
        if request.method == "POST" :
            username = request.POST['usname']
            password = request.POST['pswd']

            user = authenticate(request, username=username, password=password)

            if user is not None :
                login(request, user)
                return redirect('success')
            else :
                return render(request, 'auth.html', {"page" : page, "error" : 'yes'})
            
        else :
            return render(request, "auth.html", {"page" : page, "error" : 'no'})
    
    elif page == 'Signup' :
        if request.method == "POST" :
            username = request.POST['usname'].strip()
            password = request.POST['pswd'].strip()

            if username != "" and password != "" :
                if User.objects.filter(username=username).exists() :
                    return render(request, 'auth.html', {"page" : page, "error" : 'yes'})
                else :
                    user = User.objects.create_user(username=username, password=password)
                    login(request, user)
                    return redirect('success')
            else :
                return render(request, 'auth.html', {"page" : page, "error" : 'yes'})
            
        else :
            return render(request, "auth.html", {"page" : page, "error" : 'no'})