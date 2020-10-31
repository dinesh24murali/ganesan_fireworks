
sales_schema = {
    "name": "Sales",
    "type": "object",
    "required": ["customer", "invoice_no", "date", "paid", "products"],
    "properties": {
        "customer": {
            "type": "string"
        },
        "invoice_no": {
            "type": "string"
        },
        "date": {
            "type": "string"
        },
        "discount": {
            "type": "number",
            "minimum": 0,
        },
        "paid": {
            "type": "number",
            "minimum": 0,
        },
        "products": {
            "type": "array",
            "items": {
                "type": "object",
                "required": ["crackerId", "quantity"],
                "properties": {
                    "crackerId": {
                        "type": "string"
                    },
                    "quantity": {
                        "type": "number",
                        "minimum": 1
                    }
                }
            }
        }
    }
}
