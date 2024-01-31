# (C) Himank Deka, 2023
from django.shortcuts import render, redirect
from django.http import HttpRequest
from django.contrib.auth import login, authenticate, logout
from django.contrib.auth.decorators import login_required
from django.contrib.auth.models import User

LOGIN_URL = '/auth/?page=Login'

# Create your views here.
def home(request: HttpRequest) :                          
    if request.user.is_authenticated :
        return redirect('user')
    
    return render(request, "homepage.html")

def passwd(request: HttpRequest) :
    if request.method == "POST" :
        new_passwd = request.POST["passwd"].strip()

        if new_passwd == "" :
            return render(request, "password.html", {"username" : request.user.username, "error" : 'yes'})

        request.user.set_password(new_passwd)
        request.user.save()

        signout(request)
        return redirect('home')

    return render(request, "password.html", {"username" : request.user.username})

@login_required(login_url=LOGIN_URL)
def user(request: HttpRequest) :
    current_user = request.user
    context = {"user" : current_user}
    return render(request, "user.html", context)

@login_required(login_url=LOGIN_URL)
def signout(request: HttpRequest) :
    logout(request)
    return redirect('home')

@login_required(login_url=LOGIN_URL)
def delete(request: HttpRequest) :
    current_user = request.user
    user_obj = User.objects.get(username=current_user.username)

    user_obj.delete()

    logout(request)
    return redirect('home')


def auth(request: HttpRequest) :    
    page = request.GET.get("page")

    if page == 'Login' :
        if request.method == "POST" :
            username = request.POST['usname']
            password = request.POST['pswd']

            user = authenticate(request, username=username, password=password)

            if user is not None :
                login(request, user)
                return redirect('user')
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
                    return redirect('user')
            else :
                return render(request, 'auth.html', {"page" : page, "error" : 'yes'})
            
        else :
            return render(request, "auth.html", {"page" : page, "error" : 'no'})