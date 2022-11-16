# Bulk POST

If you want to create multiple bills at once, you can use the `/v2/Bill/bulk` call.
Calls to this endpoint can contain an array of bills. Each bill will be formatted like the [synchronous](?document=billSync&header=synchronous-post) option.


### HTTP Request
> Sample

```json
{
  "Bills":
  [
    {
      "PaymentReference": "LI-748925",
      "Description": "Payment for insurance deductible",
      "Amount": 1295,
      "ExpiryDate": "2023-04-02T09:00:00Z",
    },
    {
      "PaymentReference": "LI-748937",
      "Description": "Payment for insurance deductible",
      "Amount": 2844,
      "ExpiryDate": "2023-03-02T09:00:00Z",
    }
  ]
}
```

`POST /v2/Bill/bulk`

### Response
> Response

```json
{
  "BulkId": "00000000-0000-0000-0000-000000000000"
}
```

The response of this call will only contain the bulkId (or an error in case of a wrongly formatted request). The records will be put in a queue which will then be processed. 


## Bulk Status

### Checking the status of processing
To see the status of your bulk call you can make a GET request to the status endpoint.

### HTTP Request
`GET /v2/Bill/bulk/[bulkId]/status`


### Response
> Response

```json
{
  "Bills": [
    {
      "ATID": "00000000-0000-0000-0000-000000000000"
      "STATUS": "CreationSucceeded",
      "Location": "/v2/Bill/00000000-0000-0000-0000-000000000000",
      "PaymentReference": "LI-748937",
      "SRRID": "r220401140452075"
    }
  ],
  "BulkId": "00000000-0000-0000-0000-000000000000",
  "STATUS": "ProcessingCompleted",
  "ERROR": {
    "Message": "string"
  }
}
```
> 'ERROR' object only available on status 'CreationFailed'.

> 'Bills' array only available on status 'CreationSucceeded'


There are 3 possible statuses:

`Processing`,`ProcessingCompleted`,`CreationFailed`

The response (if Status is `ProcessingCompleted`) will contain an array with separate objects for each bill.

### Partial processing
> Partial processing sample

```json
{
  "Bills": [
    {
      "ATID": "00000000-0000-0000-0000-000000000000",
      "ERROR": {
        "Message": "Batch creation failed with error message: Invalid banner template reference"
      },
      "STATUS": "CreationFailed",
      "PaymentReference": "LI-748937"
    },
    {
      "ATID": "00000000-0000-0000-0000-000000000000",
      "STATUS": "CreationSucceeded",
      "Location": "/v2/Bill/00000000-0000-0000-0000-000000000000",
      "PaymentReference": "LI-748925",
      "SRRID": "r220401140452075"
    }
  ],
  "BulkId": "00000000-0000-0000-0000-000000000000",
  "STATUS": "ProcessingCompleted"
}
```

It is possible that a bulk contains 1 or more invalid bills. This will still result in a `ProcessingCompleted`. See sample.

Also if all bills were invalid, it will still result in a `ProcessingCompleted`.

Only if processing completely fails for another reason, will it result in a `CreationFailed`.
 

### Webhooks
It is also possible to receive a webhook when bulk processing is finished. See [webhooks](?document=webhooks&header=receiving-webhooks) for more information.
