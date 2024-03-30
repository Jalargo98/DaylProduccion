from functools import wraps
from django.shortcuts import redirect
from django.contrib import messages
import time

def only_modal_access(view_func):
    @wraps(view_func)
    def _wrapped_view(request, *args, **kwargs):
        if request.META.get('HTTP_X_REQUESTED_WITH') == 'XMLHttpRequest' or request.method == "POST":
            return view_func(request, *args, **kwargs)
        else:
            messages.error(request, "Acceso no autorizado desde esta página. Utilice el modal.")
            return redirect('index')
    return _wrapped_view