
from django.core.validators import MinValueValidator
from django.db import models


class Cracker(models.Model):
    name = models.CharField('Cracker name', max_length=300, blank=False)
    price = models.DecimalField('Price', max_digits=8, decimal_places=2, default=0,
                                validators=[MinValueValidator(limit_value=0)])
    pack_text = models.CharField('pack_text', max_length=300, blank=False)

    def __str__(self):
        return self.name

    def wow(self):
        return self.name


class Customer(models.Model):
    name = models.CharField('Customer name', max_length=300, blank=False)
    phone_no = models.CharField('Phone number', max_length=15)

    def __str__(self):
        return self.name


class Sales(models.Model):
    customer = models.ForeignKey(Customer, on_delete=models.CASCADE)
    invoice_no = models.CharField('Invoice number', max_length=15)
    date = models.DateTimeField('Sales date')
    discount = models.DecimalField('Discount', max_digits=4, decimal_places=2, default=0, validators=[MinValueValidator(limit_value=0)])
    paid = models.DecimalField('Amount paid', max_digits=8, decimal_places=2, default=0, validators=[MinValueValidator(limit_value=0)])

    def __str__(self):
        return self.invoice_no


class SalesData(models.Model):
    item = models.ForeignKey(Cracker, on_delete=models.CASCADE)
    sales_bill = models.ForeignKey(Sales, on_delete=models.CASCADE)
    quantity = models.IntegerField('Quantity', default=0, validators=[MinValueValidator(limit_value=0)])

    def __str__(self):
        return self.item.name
