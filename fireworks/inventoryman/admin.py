from django.contrib import admin
from .models import Customer, Cracker, SalesData, Sales

# Register your models here.
admin.site.register(SalesData)
admin.site.register(Sales)
admin.site.register(Customer)
admin.site.register(Cracker)

