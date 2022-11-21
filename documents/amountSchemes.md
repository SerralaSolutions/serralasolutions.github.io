# Amount Schemes

In some cases, for a bill, you might want to give the customer a choice of which amount they will be paying. We support two options for this. List amounts give the user the option to select the amount from a dropdown of predetermined options. Open amounts give the user the option to enter the amount themselves, with optional lower and upper bounds.

## List amounts

```json
{
    "Amount": 2000,
    "AmountScheme": {
        "List": [
            {
                "Amount": 500,
                "Label": "Option 1"
            },
            {
                "Amount": 1000,
                "Label": "Option 2"
            },
            {
                "Amount": 1500,
                "Label": "Option 3"
            },
            {
                "Amount": 2000,
                "Label": "Option 4"
            }
        ]
    }
}
```

The sample code will create a bill with an amount of &euro;20 but and give the customer a dropdown with amounts of &euro;5 , &euro;10 , &euro;15 and &euro;20 to select from.




## Open amounts

```json
{
    "Amount": 2000,
    "AmountScheme": {
        "Range": {
            "MaximumAmount": 2000,
            "MinimumAmount": 500
        }
    }
}
```

The sample code will create a bill with an amount of &euro;20 but give the customer the option to enter their own amount between &euro;5 and &euro;20.

Both MaximumAmount and MinimumAmount are optional fields to allow for amounts starting at 0 and up to the maximum allowed by the payment method.


## Multiselect amount list

```json
{
    "Amount": 2000,
    "AmountScheme": {
        "MultiSelectList": [
            {
                "Label": "string",
                "Amount": 100,
                "PaymentReference": "string"
            },
            {
                "Label": "string",
                "Amount": 200,
                "PaymentReference": "string"
            },
            {
                "Label": "string",
                "Amount": 300,
                "PaymentReference": "string"
            }
        ]
    }
}
```

The sample code will create a bill with a multiselect list with 3 options to choose from. The customer can select 1 or more from the list to make a payment for.
