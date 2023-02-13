# Creating bills in bulk

If you want to create multiple bills at once, you can use the `/v2/Bill/bulk` call.
Calls to this endpoint can contain an array of bills. Each bill will be formatted like the [synchronous](?document=billSync&header=synchronous-post) option.


## Creating multiple bills
##### Method: `POST`
##### Endpoint: `/v2/Bill/bulk`
##### Request body:
The content of the call will be exactly the same as the [synchronous](?document=billSync&header=synchronous-post) version except it contains an array of bills.
<details>
<summary>Example request body</summary>

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
</details>

##### Response body
The response of this call will only contain the bulkId (or an error in case of a wrongly formatted request). The records will be put in a queue which will then be processed.
<details>
<summary>Example response body</summary>

```json
{
  "BulkId": "00000000-0000-0000-0000-000000000000"
}
```
</details>

## Checking the status
To see the status of your bulk call you can make a GET request to the status endpoint.

##### Method: `GET`
##### Endpoint: `/v2/Bill/bulk/[BulkId]/status`
##### Response body:
The response (if Status is `ProcessingCompleted`) will contain an array with separate objects for each bill.
<details>
<summary>Example response body</summary>

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
There are 3 possible statuses:
`Processing`
`ProcessingCompleted`
`CreationFailed`

'ERROR' object only available on status 'CreationFailed'.

'Bills' array only available on status 'CreationSucceeded'
</details>

## Partial processing
If the bulk call contains multiple bills, it is possible that some bills are processed successfully while others fail. The response will contain a `Bills` array with the status of each bill. 

If a bulk contains 1 or more invalid bills. This will still result in a `ProcessingCompleted`. See sample.
If all bills were invalid, it will still result in a `ProcessingCompleted`.

Only if processing completely fails for another reason, will it result in a `CreationFailed`.
<details>
<summary>Example response body</summary>

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
</details>

## Webhooks
It is also possible to receive a webhook when bulk processing is finished. See [webhooks](?document=webhooks&header=receiving-webhooks) for more information.
