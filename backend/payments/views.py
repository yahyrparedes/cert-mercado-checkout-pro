from django.shortcuts import render

# Create your views here.
import mercadopago

# sdk = mercadopago.SDK('TEST-2225224039440102-071512-75c1cf19a34636f79875e391d6a1957a__LD_LB__-260357063')
# # Crea un ítem en la preferencia
# preference_data = {
#     "items": [
#         {
#             "title": "Mi producto",
#             "quantity": 1,
#             "unit_price": 75
#         }
#     ]
# }
#
# preference_response = sdk.preference().create(preference_data)
# preference = preference_response["response"]

from django import template
from django.contrib.auth.decorators import login_required
from django.http import HttpResponse, HttpResponseRedirect
from django.template import loader
from django.urls import reverse

def index(request):
    context = {'segment': 'index'}

    html_template = loader.get_template('index.html')
    return HttpResponse(html_template.render(context, request))