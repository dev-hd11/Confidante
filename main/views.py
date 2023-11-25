# Create your views here.
from django.http import HttpResponse, HttpResponseRedirect, Http404
from django.shortcuts import get_object_or_404
from django.template import loader
from .models import User, Entry
from .auth_json import *
from .forms import PassResetForm, AuthUserForm
from django.shortcuts import render
one_redirect = 0

def view_acc(request, us_id) :
  temp = is_pre_init()
  if temp != None :
    print("Redirected!")
    return temp

  elif is_staff() :
    print("allowed!")
    us = get_object_or_404(User, id = us_id)
    templ = loader.get_template("get_entry.html")
    context = {
      'type' : 'user_pg',
      'us' : us
    }

    return HttpResponse(templ.render(context, request))
  
  elif is_signed() :
    print("allowed!")
    us = get_object_or_404(User, id = us_id)
    if us.id == get_us_id() :
      templ = loader.get_template("get_entry.html")
      context = {
        'type' : 'user_pg',
        'us' : us
      }

      return HttpResponse(templ.render(context, request))
    
    else :
      print("not found!")
      return Http404()
    
  else :
    print("Redirected 2!")
    return HttpResponseRedirect("http://localhost:8000/")


def home(request) :
  init()
  template = loader.get_template('home.html')
  return HttpResponse(template.render())

def staff(request) :
  temp = is_pre_init()

  if temp != None :
    return temp
  
  else :
    global one_redirect
    user_all = User.objects.all().values()
    entry_give = Entry.objects.all()
    templ = loader.get_template("staff.html")
    print(one_redirect)
    context = {
      'users_all' : user_all,
      'entry_give' : entry_give,
      'myvar' : one_redirect
    }

    return HttpResponse(templ.render(context, request))
    

def set_env_var(request) :
  global one_redirect
  print("got here")
  set_data(["is_staff"], [True])
  one_redirect = 1
  return HttpResponseRedirect("http://localhost:8000/staff")
  
  

def view_entry(request, en_id) :
  temp = is_pre_init()

  if temp != None :
    return temp
  

  elif is_staff() :
    en = get_object_or_404(Entry, id = en_id)
    temp = loader.get_template("get_entry.html")
    context = {
      'en' : en
    }

    return HttpResponse(temp.render(context, request))
  
  elif is_signed() :
    en = get_object_or_404(Entry, id = en_id)
    if en.holder.id == get_us_id() :
      temp = loader.get_template("get_entry.html")
      context = {
        'en' : en
      }

      return HttpResponse(temp.render(context, request))
    
    else :
      return Http404()
  
  else :
    return HttpResponseRedirect("http://localhost:8000/staff")

def star_en(request, en_id) :
  temp = is_pre_init()

  if temp != None :
    return temp
  
  elif is_signed() :
    en = get_object_or_404(Entry, id = en_id)
    if en.holder.id == get_us_id() :
      en.is_starred = False if en.is_starred else True
      en.save()

    else :
      return Http404()
    
  elif is_staff() :
    en = get_object_or_404(Entry, id = en_id)
    en.is_starred = False if en.is_starred else True
    en.save()

    return HttpResponseRedirect(f"http://localhost:8000/get_en/{en.id}")
  else :
    return HttpResponseRedirect("http://localhost:8000/staff")
  
def delete(request, en_id) :
  temp = is_pre_init()

  if temp != None :
    return temp
  
  elif is_staff() :
    en = get_object_or_404(Entry, id = en_id)
    en.delete()
    return HttpResponseRedirect("http://localhost:8000/staff")
  
  elif is_signed() :
    en = get_object_or_404(Entry, id = en_id)
    if get_us_id() == en.holder.id :
      en.delete()
      return HttpResponseRedirect("http://localhost:8000/staff")
  
    else :
      return Http404
    
  else :
    return HttpResponseRedirect("http://localhost:8000/staff")
  
def pass_chgn(request, us_id) :
  form_p = None
  templ = loader.get_template("pass_change.html")
  if request.method == "POST" :
    form_p = PassResetForm(request.POST)
    if form_p.is_valid() :
      d_set = form_p.cleaned_data["passwd"]
      us = get_object_or_404(User, id = us_id)
      us.passwd = d_set
      us.save()

      return HttpResponseRedirect(f"http://localhost:8000/inside/user/{us_id}")
    
    else :
      form_p = PassResetForm()

  
  context = {
    'us_id' : us_id,
    'form_p' : form_p
  }
  print(type(context))
  return HttpResponse(templ.render(context, request))

def getUP(request, auth_code) :
  temp = is_pre_init()

  if temp != None :
    return temp
  
  templ = loader.get_template("user_profile.html")
  print(auth_code)
  form_auth = None
  if not is_signed() :
    print("Not signed")
    if auth_code == "lg":
      if request.method == "POST" :
        all_users = User.objects.all()
        print("All usernames:", [user.usname for user in all_users])

        form_auth = AuthUserForm(request.POST)
        if form_auth.is_valid() :
          print(form_auth.cleaned_data["usname"], form_auth.cleaned_data["passwd"])
          try:
            user = User.objects.get(usname=form_auth.cleaned_data["usname"], passwd=form_auth.cleaned_data["passwd"])
          except User.DoesNotExist:
              return HttpResponse("Invalid Credentials")
          
          set_data(["user_id", "is_signed"], [user.id, True])

          print(is_signed())
          print(get_us_id())
          return HttpResponseRedirect(f"http://localhost:8000/inside/user/{get_us_id()}")
  # DEBUG
      else :
        form_auth = AuthUserForm()
          
      context = {
        "auth" : 0,
        "form" : form_auth
      }

      return HttpResponse(templ.render(context, request))