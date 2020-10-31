import jsonschema
from django.core.validators import ValidationError

from inventoryman.schemas.schemas import sales_schema


def unpack_sales_data(data):

    try:
        jsonschema.validate(data, sales_schema)

    except Exception as e:
        raise ValidationError(e.message)

    return data


def add_sales(request_data):

    data = unpack_sales_data(request_data)




