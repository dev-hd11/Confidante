# Create your views here.
from django.http import HttpResponse, HttpResponseRedirect, Http404
from django.shortcuts import get_object_or_404
from django.template import loader
from .models import User, Entry
from .auth_json import *
from .forms import PassResetForm
from django.shortcuts import render
one_redirect = False

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
    if us.holder.id == get_us_id() :
      templ = loader.get_template("get_entry.html")
      context = {
        'type' : 'user_pg',
        'us' : us
      }

      return HttpResponse(templ.render(context, request))
    
    else :
      return Http404()


def home(request) :
  init()
  template = loader.get_template('home.html')
  return HttpResponse(template.render())

def staff(request) :
  user_all = User.objects.all().values()
  entry_give = Entry.objects.all()
  templ = loader.get_template("staff.html")
  context = {
    'users_all' : user_all,
    'entry_give' : entry_give,
    'one_redirect' : one_redirect
  }

  return HttpResponse(templ.render(context, request))

def set_env_var(request) :
  set_data("is_staff", True)
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

      return HttpResponseRedirect("http://localhost:8000/staff/")
    
    else :
      form_p = PassResetForm()

    return HttpResponse(templ.render(request, {'form' : form_p}))