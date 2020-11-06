
from django.core.validators import MinValueValidator
from django.db import models

PACK_TYPES = (
    ("1", "box"),
    ("2", "pouch"),
    ("3", "packet"),
    ("4", "other"),
)


class Cracker(models.Model):
    name = models.CharField('Cracker name', max_length=300, blank=False)
    batch_number = models.CharField('Batch number', max_length=100, null=True, blank=True, default='')
    price = models.DecimalField('Price', max_digits=8, decimal_places=2, default=0,
                                validators=[MinValueValidator(limit_value=0)])
    pack_text = models.CharField('pack_text', max_length=50, blank=False, choices=PACK_TYPES, default='4')

    def __str__(self):
        return self.name

    class Meta:
        unique_together = ('name', 'batch_number',)


class Customer(models.Model):
    name = models.CharField('Customer name', max_length=300, blank=False)
    phone_no = models.CharField('Phone number', max_length=15)
    email = models.EmailField('Email', max_length=100, default='', blank=True)

    def __str__(self):
        return self.name


class Sales(models.Model):
    customer = models.ForeignKey(Customer, on_delete=models.CASCADE)
    invoice_no = models.CharField('Invoice number', max_length=15, unique=True)
    date = models.DateTimeField('Sales date')
    discount = models.DecimalField(
        'Discount',
        max_digits=4,
        decimal_places=2,
        default=0,
        validators=[MinValueValidator(limit_value=0)]
    )
    paid = models.DecimalField(
        'Amount paid',
        max_digits=8,
        decimal_places=2,
        default=0,
        validators=[MinValueValidator(limit_value=0)]
    )

    def __str__(self):
        return self.invoice_no


class SalesData(models.Model):
    item = models.ForeignKey(Cracker, on_delete=models.CASCADE)
    sales_bill = models.ForeignKey(Sales, on_delete=models.CASCADE)
    quantity = models.IntegerField('Quantity', default=0, validators=[MinValueValidator(limit_value=0)])

    def __str__(self):
        return self.item.name
