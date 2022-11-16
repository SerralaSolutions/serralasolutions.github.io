# Asynchronous POST

For the creation of a number of bills in succession we have asynchronous option. This allows for quicker calls and responses while creation is done in the background.

### HTTP Request

> Request

```json
{
  "PaymentReference": "LI-748925",
  "Description": "Payment for insurance deductible",
  "Amount": 1295,
  "ExpiryDate": "2023-04-02T09:00:00Z",
}
```
> Will create a bill for a payment of &euro; 12,95 that expires on April 2nd 2023

`POST /v2/Bill/async`

### Request
The content of the call will be exactly the same as the [synchronous](?document=billSync&header=synchronous-post) version.

### Response

> Response

```json
{
  "ATID": "00000000-0000-0000-0000-000000000000",
}
```

The response of this call will only contain the ATID. The record will then be put in a queue which will then be processed. Normally processing takes a few seconds.




## Asynchronous status
To see the status of your asynchronous call you can get the status.

### HTTP Request

`GET /v2/Bill/[ATID]/status`

### Response

> Response

```json
{
  "ATID": "00000000-0000-0000-0000-000000000000",
  "STATUS": "Processing",
  "PaymentReference": "string",
  "Location": "string",
  "SRRID": "string",
  "ERROR": {
    "Message": "string"
  }
}
```
> 'ERROR' object only available on status 'CreationFailed'.

> 'Location' string only available on status 'CreationSucceeded'

There are 3 possible statuses:

`Processing`,`CreationSucceeded`,`CreationFailed`

### Webhooks
It is also possible to receive a webhook when a record is created or caused an error. See [webhooks](?document=webhooks&header=receiving-webhooks) for more information.
