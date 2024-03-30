from functools import wraps
from django.shortcuts import redirect
from .forms import Registro, Login

def ajax_request_required(view_func):
    def _wrapped_view(request, *args, **kwargs):
        form = Login(request.POST)
        if request.headers.get('x-requested-with') == 'XMLHttpRequest' or request.method == 'POST':
            return view_func(request, *args, **kwargs)
        else:
            return redirect('index')
    return _wrapped_view