from rest_framework import serializers
from inventoryman.models import Sales, SalesData, Customer, Cracker


class SalesSerializer(serializers.ModelSerializer):
    class Meta:
        model = Sales
        fields = ['id', 'customer', 'invoice_no', 'date', 'discount', 'paid']


class SalesDataSerializer(serializers.ModelSerializer):
    class Meta:
        model = SalesData
        fields = ['item', 'sales_bill', 'quantity']


class CustomerSerializer(serializers.Serializer):
    id = serializers.IntegerField(read_only=True)
    name = serializers.CharField(required=True, allow_blank=False, max_length=300)
    email = serializers.EmailField(required=False, max_length=100, allow_blank=True, default='')
    phone_no = serializers.CharField(required=True, max_length=15, allow_blank=False)

    def create(self, validated_data):
        """
        Create and return a new `Customer` instance, given the validated data.
        """
        return Customer.objects.create(**validated_data)

    def update(self, instance, validated_data):
        """
        Update and return an existing `Customer` instance, given the validated data.
        """
        instance.name = validated_data.get('name', instance.name)
        instance.email = validated_data.get('email', instance.email)
        instance.phone_no = validated_data.get('phone_no', instance.phone_no)
        instance.save()
        return instance


class Customer1Serializer(serializers.ModelSerializer):
    class Meta:
        model = Customer
        fields = ['id', 'name', 'phone_no', 'email']


class CrackerSerializer(serializers.ModelSerializer):
    class Meta:
        model = Cracker
        fields = ['id', 'name', 'price', 'pack_text']
