# Sending a bill or mandate
When creating the records, it is possible to plan all future communications based on certain conditions. So you can choose to send the transaction through email right away, again through text a week later if it hasn't been paid yet, and finally a few days before expiry.

## Sending a record
Add an array of communications to your bill body to send it right away. The communication array can contain multiple communications.
##### Optional for: `POST /v2/Bill` & `POST /v2/Mandate`
##### Request body:

| Field                                      | Type                                | Explanation                                                                                                                                                                                                              |
|:-------------------------------------------|:------------------------------------|:-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| **Channel** <br/> `Required`      |  `Email`, `Text` or `PDF`        | The channel for which to send through; Email or Text. Can also be PDF to create pdf's to be shown on the transaction page.                                                                                               |
| **Template**        |  String           | The ID of the template to send with. If not supplied will fall back to the default emailtemplate or [Communication Plan](?document=sendingMessages&header=using-the-communication-plan) as defined in the AETemplate                                     |
| **ScheduledDate**                               |  ISO DateTime format                             | The moment for when the mailing is scheduled. If not set, it will send immediately                                                                                                                                       |
| **PaymentStatus**                               |  String (enumeration)             | Filter option to send the message or not based on the Payment Status. See [Glossary & Statuses](?document=glossary&header=communication-status) for info.                                                                             |
| **MessageStatus**                               |   String (enumeration)                | Filter option to send the message or not based on the Message Status of previous messages for this mailing. See [Glossary & Statuses](?document=glossary&header=bill--mandate-communication-message-status) for info. |

An example that might be posted to `/v2/Bill/` would be:

<details>
<summary>Example request body</summary>

```json
{
  "PaymentReference": "123456",
  "Description": "MonthlyInvoice",
  "Address": {
    "Email": "contact@accepteasy.com",
    "PhoneNumber": "+31 20 261 00 20"
  },
  "Amount": 1299,
  "Communication": [
    {
      "Channel": "Email",
      "Template": "initialPaymentRequest",
      "ScheduledDate": "2023-02-05T10:11:22Z"
    },
    {
      "Channel": "Text",
      "PaymentStatus": "Open",
      "Template": "preminderText",
      "ScheduledDate": "2023-02-12T15:11:22Z"
    },
    {
      "Channel": "Email",
      "PaymentStatus": "Open",
      "Template": "finalPreminder",
      "ScheduledDate": "2023-02-25T10:11:22Z"
    }
  ]
}
```
This will send an email and text message and another Email before expiry
</details>

Besides adding it within the `POST` for the Bill it is also possible to do separate calls to create or change the communications:

`GET /v2/Bill/[ATID]/Communication`

`POST /v2/Bill/[ATID]/Communication`

`DELETE /v2/Communication/[communicationId]`

`PATCH /v2/Communication/[communicationId]`

For Mandates, the calls are similar:

`GET /v2/Mandate/[ATID]]/Communication`

`POST /v2/Mandate/[ATID]/Communication`

`DELETE /v2/MandateCommunication/[communicationId]`

`PATCH /v2/MandateCommunication/[communicationId]`
