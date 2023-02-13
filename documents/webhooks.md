# Receiving Webhooks
Webhooks can be used to get realtime feedback on the status of Serrala RTP transactions.

## Setting up and requirements
The endpoint for these webhooks can be set in the application under **Account** > **Settings**.
The checkboxes select which webhooks will be sent.


<img style='width:50%;display:block;border:1px solid #eeebee;margin-left:auto;margin-right:auto;' src='documents/images/webhookSettings.png'/>

The endpoint needs to be HTTPS and publicly accessible.

Basic authentication can be added (not mandatory) through adding the username and password in the URL (see screenshot above).

Upon receiving a webhook, for instance, for payment, you can use `GET /v2/Bill/[ATID]`, to fetch additional information such as the account holder name, or account number for the account that completed the payment.

<details>
<summary>Example request body: record created</summary>

Sent after posting a new bill through REST API. Only sent for bills (both sync and async).
```json
{
  "ATID": "120b6125-fdfa-4124-a08c-dbf63f38e162",
  "ERROR": null,
  "PaymentReference": "123456",
  "SRRID": "r180205114728321",
  "STATUS": "CreationSucceeded"
}
```
</details>
<details>
<summary>Example request body: creation error</summary>

Sent after posting a new bill that could not be created through REST API.
```json
{
  "ATID": "120b6125-fdfa-4124-a08c-dbf63f38e162",
  "ERROR":  {
    "Message": "APP0224 - Expiry date must be in the future."
  },
  "PaymentReference": "123456",
  "SRRID": "r180205114728321",
  "STATUS": "CreationFailed"
}
```
</details>
<details>
<summary>Example request body: payment made</summary>

Sent after a customer has finished payment on a bill or mandate.
```json
{
  "ATID": "120b6125-fdfa-4124-a08c-dbf63f38e162",
  "ERROR": null,
  "PaymentReference": "123456",
  "SRRID": "r180205114728321",
  "STATUS": "Paid"
}
```
</details>
<details>
<summary>Example request body: email bounced</summary>

Sent after an email or sms has bounced (both hard and soft bounce).
```json
{
  "ATID": "120b6125-fdfa-4124-a08c-dbf63f38e162",
  "ERROR": null,
  "PaymentReference": "123456",
  "SRRID": "r180205114728321",
  "STATUS": "Bounced"
}
```
</details>
<details>
<summary>Example request body: bulk bills processing completed</summary>

Sends a list of records created for a bulk POST.
```json
{
  "Bills": [
    {
      "ATID": "33cd794c-ac3b-4a28-8fd8-01766c41813d",
      "STATUS": "CreationSucceeded",
      "Location": "/v2/Bill/33cd794c-ac3b-4a28-8fd8-01766c41813d",
      "PaymentReference": "123456",
      "SRRID": "r220701081428282"
    },
    {
      "ATID": "9a58f666-c542-452e-a310-3e60739450e1",
      "STATUS": "CreationSucceeded",
      "Location": "/v2/Bill/9a58f666-c542-452e-a310-3e60739450e1",
      "PaymentReference": "123456",
      "SRRID": "r220701081426939"
    }
  ],
  "BulkId": "0643816a-77bc-4f95-a91c-8ff52222456c",
  "STATUS": "ProcessingCompleted"
}
```
</details>

### Whitelisting

While we don't advice whitelisting the incoming connections for the webhook, we understand the necessity. The originating IP addresses for the webhooks are:

- 104.40.179.234
- 104.40.159.161
- 191.233.82.46
- 104.46.48.100
- 23.97.175.30
- 23.97.171.104
- 23.97.174.120
- 23.97.215.165


### Retry mechanism for webhooks

For varying reasons (network problems, maintenance, etc.) a webhook may not be received by your system. For this scenario, there is a retry-mechanism. Our application will monitor the response from your system and in case of a timeout or failure retry sending the webhook with increasing time intervals (for a maximum of 10 retries, the first occuring after 15 minutes and the final attempt after 6 days).

The retry mechanism can be enabled in the settings-page, right below the REST API Notification URL.

The full retry mechanism also applies to the Outbound trigger (Legacy).

### Email notification
You can also enter an email-address where you will be notified if the 1st retry fails. Another email will be sent once the 10th (and final) retry has failed. A maximum of 1 notification-email per day will be sent.
