from django.contrib import admin
from .models import SalesData, Sales, Customer, Cracker

# Register your models here.
admin.site.register(SalesData)
admin.site.register(Sales)
admin.site.register(Customer)
admin.site.register(Cracker)

