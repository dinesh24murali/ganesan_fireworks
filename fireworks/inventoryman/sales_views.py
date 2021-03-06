import jsonschema
from django.core.validators import ValidationError
import datetime

from inventoryman.schemas.schemas import sales_schema
from inventoryman.models import Cracker, Sales, Customer


def validate_sales_data(data):

    try:
        jsonschema.validate(data, sales_schema)

    except Exception as e:
        raise ValidationError(e.message)

    return data


def add_sales(request_data):

    data = validate_sales_data(request_data)

    customer = Customer.objects.get(id=data["customer"])
    date = datetime.datetime.strptime(data["date"], '%Y-%m-%d')

    sales = Sales(
        customer=customer,
        date=date,
        invoice_no= data["invoice_no"],
        discount=data["discount"],
        paid=data["paid"],
    )

    sales.save()

    for item in data["products"]:
        cracker = Cracker(id=item["crackerId"])
        sales.salesdata_set.create(item=cracker, quantity=item["quantity"])


def update_sales(request_data, pk):

    data = validate_sales_data(request_data)

    sales = Sales.objects.get(pk=pk)

    customer = Customer.objects.get(id=data["customer"])
    date = datetime.datetime.strptime(data["date"], '%Y-%m-%d')
    sales.discount = data["discount"]
    sales.paid = data["paid"]
    sales.invoice_no = data["invoice_no"]
    sales.customer = customer
    sales.date = date
    sales.save()

    sales.salesdata_set.all().delete()

    for item in data["products"]:
        cracker = Cracker(id=item["crackerId"])
        sales.salesdata_set.create(item=cracker, quantity=item["quantity"])


