# Bill Patch

If you want to update an existing record you can do so using the `PATCH /v2/Bill/[ATID]` call.
You can use this to add an Emailaddress or Phonenumber to the record.
It can also be used to update the status of the record.


### HTTP Request

Request

```json
{
  "Status": "Open",
  "Address": {
    "Email": "string",
    "PhoneNumber": "string"
  }
}
```

`PATCH /v2/Bill/[ATID]`

### Response
> Response

```json
{
  "Status": "Succeeded",
  "Bill": {
    "ATID": "00000000-0000-0000-0000-000000000000",
    "SRRID": "string",
    "AETemplateID": "00000000-0000-0000-0000-000000000000",
    "PaymentReference": "string",
    "Amount": 0
  }
}
```

The response will show you the status of the PATCH and will also contain the Bill object.
