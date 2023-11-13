# Create your views here.
from django.http import HttpResponse
from django.template import loader
from .models import User, Entry

def home(request) :
  template = loader.get_template('home.html')
  return HttpResponse(template.render())

def staff(request) :
  user_all = User.objects.all().values()
  entry_give = Entry.objects.all()
  templ = loader.get_template("staff.html")
  context = {
    'users_all' : user_all,
    'entry_give' : entry_give
  }

  return HttpResponse(templ.render(context, request))