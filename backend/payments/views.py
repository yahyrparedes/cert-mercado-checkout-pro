from django.shortcuts import render

# Create your views here.
from rest_framework.response import Response
from rest_framework.views import APIView

import mercadopago

mercadopago_sdk = 'TEST-2225224039440102-071512-75c1cf19a34636f79875e391d6a1957a__LD_LB__-260357063'  # yahyrparedesarteaga@gmail.com


class MercadoPagoApiView(APIView):

    # Utilizar el serializer
    def post(self, request):
        # TODO: obtain token using model django
        sdk = mercadopago.SDK(mercadopago_sdk)

        preference_data = {
            'items': [
                {
                    'title': request.data['title'],
                    'description': request.data['description'],
                    'quantity': int(request.data['quantity']),
                    'currency_id': 'PEN',
                    'unit_price': int(request.data['unit_price'])
                }
            ],
            'back_urls': {
                'success': 'http://localhost:3000/success',
                'failure': 'http://localhost:3000/failure',
                'pending': 'http://localhost:3000/pending'
            },
            'auto_return': 'approved',
            'external_reference': '30'  # pendiente de info
        }

        preference_response = sdk.preference().create(preference_data)  #

        preference = preference_response['response']
        return Response({
            'sandbox_init_point': preference['sandbox_init_point'],
            'id': preference['id'],
            'init_point': preference['init_point'],
        })
