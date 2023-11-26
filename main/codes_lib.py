"""
(c) 2023, Himank Deka.
"""
from django.http import HttpResponseRedirect
class Code :
    def __init__(self, code) :
        self.code = code

    def decode(self, redirection) :
        if self.code == 1 :
            return HttpResponseRedirect(redirection)
        
        else :
            return None
        
    def throw_404(self) :
        return HttpResponseRedirect("http://localhost:8000/page-not-found")