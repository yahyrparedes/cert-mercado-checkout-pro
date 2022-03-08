
from django.urls import path

from payments import views

urlpatterns = [
    path('mp/preference/', views.MercadoPagoApiView.as_view())
]