# Create your views here.
from django.http import HttpResponse, HttpResponseRedirect
from django.shortcuts import get_object_or_404
from django.template import loader
from .models import User, Entry
from .auth_json import *
from .forms import PassResetForm, AuthUserForm
import os
from . import settings_app

one_redirect = 0

def view_acc(request, us_id) :
  temp = is_pre_init()
  if temp != None :
    return temp

  elif is_staff() :
    us = get_object_or_404(User, id = us_id)
    templ = loader.get_template("get_entry.html")
    context = {
      'type' : 'user_pg',
      'us' : us
    }

    return HttpResponse(templ.render(context, request))
  
  elif is_signed() :
    us = get_object_or_404(User, id = us_id)
    if us.id == get_us_id() :
      templ = loader.get_template("get_entry.html")
      context = {
        'type' : 'user_pg',
        'us' : us
      }

      return HttpResponse(templ.render(context, request))
    
    else :
      return return_404()
    
  else :
    return HttpResponseRedirect("http://localhost:8000/")


def home(request) :
  init()
  template = loader.get_template('home.html')
  return HttpResponse(template.render())

def staff(request) :
  temp = is_pre_init()

  if temp != None :
    return temp
  
  elif is_staff() :
    user_all = User.objects.all().values()
    entry_give = Entry.objects.all()
    templ = loader.get_template("staff.html")
    context = {
      'users_all' : user_all,
      'entry_give' : entry_give,
      'myvar' : 1
    }

    return HttpResponse(templ.render(context, request))
  
  else :
    global one_redirect
    user_all = User.objects.all().values()
    entry_give = Entry.objects.all()
    templ = loader.get_template("staff.html")
    context = {
      'users_all' : user_all,
      'entry_give' : entry_give,
      'myvar' : one_redirect
    }

    return HttpResponse(templ.render(context, request))
    

def set_env_var(request) :
  global one_redirect
  set_data({"is_staff" : True})
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
      return return_404()
  
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

      return HttpResponseRedirect(f"http://localhost:8000/inside/user/profile/view/?user={en.holder.id}")

    else :
      return return_404()
    
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
      return return_404()
    
  else :
    return HttpResponseRedirect("http://localhost:8000/staff")
  
def pass_chgn(request, us_id) :
  temp = is_pre_init()

  if temp != None :
    return temp
  
  if is_signed() :
    if get_us_id() == us_id :
      form_p = None
      templ = loader.get_template("pass_change.html")
      if request.method == "POST" :
        form_p = PassResetForm(request.POST)
        if form_p.is_valid() :
          d_set = form_p.cleaned_data["passwd"]
          us = get_object_or_404(User, id = us_id)
          us.passwd = d_set
          us.save()

          return HttpResponseRedirect(f"http://localhost:8000/inside/user/profile/view/?user={us_id}")
        
        else :
          form_p = PassResetForm()

      
      context = {
        'us_id' : User.objects.get(id=us_id),
        'form_p' : form_p
      }
      return HttpResponse(templ.render(context, request))
    
    else :
      return_404()
    
  elif is_staff() :
    form_p = None
    templ = loader.get_template("pass_change.html")
    if request.method == "POST" :
      form_p = PassResetForm(request.POST)
      if form_p.is_valid() :
        d_set = form_p.cleaned_data["passwd"]
        us = get_object_or_404(User, id = us_id)
        us.passwd = d_set
        us.save()

        return HttpResponseRedirect(f"http://localhost:8000/staff")
        
      else :
        form_p = PassResetForm()

      
    context = {
      'us_id' : us_id,
      'form_p' : form_p
    }
    return HttpResponse(templ.render(context, request))
  
  else :
    return return_404()
    

def getUP(request, auth_code) :
  temp = is_pre_init()

  if temp != None :
    return temp
  
  templ = loader.get_template("user_profile.html")
  form_auth = None
  if not is_signed() :
    if auth_code == "lg":
      if request.method == "POST" :

        form_auth = AuthUserForm(request.POST)
        if form_auth.is_valid() :
          try:
            user = User.objects.get(usname=form_auth.cleaned_data["usname"], passwd=form_auth.cleaned_data["passwd"])
            set_data({"user_id" : user.id, "is_signed" : True})
          except User.DoesNotExist:
              context = {
                "auth" : 0,
                "invalid" : "true"
              }

              return HttpResponse(templ.render(context, request))
          
          return HttpResponseRedirect(f"http://localhost:8000/inside/user/profile/view/?user={get_us_id()}")
      else :
        form_auth = AuthUserForm()
          
      context = {
        "auth" : 0,
        "invalid" : "false"
      }

      return HttpResponse(templ.render(context, request))
    
    elif auth_code == "sn" :
      if request.method == "POST" :
        form_auth = AuthUserForm(request.POST)
        if form_auth.is_valid() :
          member = User(usname = form_auth.cleaned_data["usname"], passwd=form_auth.cleaned_data["passwd"])    
          member.save()

          set_data({"user_id" : member.id, "is_signed" : True})

          return HttpResponseRedirect(f"http://localhost:8000/inside/user/profile/view/?user={member.id}")
        
      else :
        form_auth = AuthUserForm()

      context = {
        "auth" : 1
      }
      
      return HttpResponse(templ.render(context, request))
    
  else :
    return HttpResponseRedirect(f"http://localhost:8000/inside/user/profile/view/?user={get_us_id()}")
  
def view_profile(request) :
  us_id = request.GET.get('user')

  user = get_object_or_404(User, id = us_id)

  entries = Entry.objects.filter(holder=user)

  counter = entries.count()
  templ = loader.get_template("user_profile.html")

  context = {
    "auth" : 2,
    "us" : user,
    "entry_val" : counter,
    "entries" : entries
  }

  return HttpResponse(templ.render(context, request))

def log_out(request) :
  os.system(f"py {settings_app.PATH_TO_CLEANER}")
  return HttpResponseRedirect("http://localhost:8000/")