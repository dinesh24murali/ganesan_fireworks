from rest_framework import serializers
from inventoryman.models import Sales, SalesData, Customer, Cracker


class SalesSerializer(serializers.ModelSerializer):
    class Meta:
        model = Sales
        fields = ['customer', 'invoice_no', 'date', 'discount', 'paid']


class SalesDataSerializer(serializers.ModelSerializer):
    class Meta:
        model = SalesData
        fields = ['item', 'sales_bill', 'quantity']


class CustomerSerializer(serializers.ModelSerializer):
    class Meta:
        model = Customer
        fields = ['name', 'phone_no']


class CrackerSerializer(serializers.ModelSerializer):
    class Meta:
        model = Cracker
        fields = ['name', 'price', 'pack_text']
