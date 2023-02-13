# Asynchronous creation of a bill
For the creation of a number of bills in succession we have asynchronous option. This allows for quicker calls and responses while creation is done in the background.

## Asynchronous creation
##### Method: `POST`
##### Endpoint: `/v2/Bill/async`
##### Request body: 
The content of the call will be exactly the same as the [synchronous](?document=billSync&header=synchronous-post) version.
<details>
<summary>Example request body</summary>

```json
{
  "PaymentReference": "LI-748925",
  "Description": "Payment for insurance deductible",
  "Amount": 1295,
  "ExpiryDate": "2023-04-02T09:00:00Z",
}
```
This will create a bill for a payment of &euro; 12,95 that expires on April 2nd 2023.

</details>

##### Response body
The response of this call will only contain the ATID. The record will then be put in a queue which will then be processed. Normally processing takes a few seconds. On busier days, this can increase to a few minutes.
<details>
<summary>Example response body</summary>

```json
{
  "ATID": "00000000-0000-0000-0000-000000000000",
}
```

</details>

> When planning a mailing scheduled soon after the call is made, we advise to make sure this is at least a 30 minutes in the future, as the processing can (in busy timeframes) increase to a few minutes it might cause problems when scheduling the mailing.




## Asynchronous status
To see the status of your asynchronous call you can get the status.

##### Method: `GET`
##### Endpoint: `/v2/Bill/[ATID]/status`
##### Response body:
<details>
<summary>Example response body</summary>

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
There are 3 possible statuses:
`Processing`
`CreationSucceeded`
`CreationFailed`

'ERROR' object only available on status 'CreationFailed'.

'Location' string only available on status 'CreationSucceeded'


</details>

### Webhooks
It is also possible to receive a webhook when a record is created or caused an error. See [webhooks](?document=webhooks&header=receiving-webhooks) for more information.
