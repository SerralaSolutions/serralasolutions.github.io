# Updating a bill

If you want to update an existing record you can do so using the `PATCH /v2/Bill/[ATID]` call.
You can use this to add an Emailaddress or Phonenumber to the record.
It can also be used to update the status of an open record to cancelled, paid or expired.

##### Method: `PATCH`
##### Endpoint: `/v2/Bill/[ATID]`
##### Request body:
<details>
<summary>Example request body</summary>

```json
{
  "Status": "Open",
  "Address": {
    "Email": "string",
    "PhoneNumber": "string"
  }
}
```
</details>

##### Response body:
The response will show you the status of the PATCH and will also contain the Bill object.
<details>
<summary>Example response body</summary>

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
</details>
