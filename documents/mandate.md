# Creating a Mandate

A mandate is a special type of bill in which the recipient pays a small fee or first installment for a service he or she will receive. In doing so, he/she gives the sender a mandate to direct debit a payment from that account for a set or variable amount during a set period.

## Creating a mandate

### HTTP Request

`POST /v2/Mandate`

Request
```json
{
  "PaymentReference": "123456",
  "Description": "my description",
  "SequenceType": "OneOff",
  "ToDate": "2023-05-24T11:10:17.7245913Z",
  "AmountType": "Open",
  "MaximumAmount": 5400,
}
```
> <i>This will result in a request that gives the sender the mandate to make a one-time withdrawal of a maximum of 54 euros, before May 24th 2023.</i>

### Fields

| Field                                      | Type                                | Explanation                                                                                                                                                                                                                                                                                                         |
|:-------------------------------------------|:------------------------------------|:--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| **PaymentReference** <br/> `Required`      |  String<br/>`max. 36 chars`         | The paymentreference is used to identify the payment. It is shown on the transaction page and will also show on the bank statement of the customer. <br/><br/> While the maximum length is 36 character, most payment providers allow a maximum of 16 characters, so we advice to keep it at maximum 16 characters. |
| **Description** <br/> `Required`        |  String<br/>`max. 32 chars `           | The description gives an insight in what the payment is for. It is shown on the transaction page and will also show on the bank statement of the customer.                                                                                                                                                          |
| **MaximumAmount**                               |  Integer                            | The maximum amount for which direct debits can be done, posted in cents. e.g. &euro;12,95 will be `1295`<br/> If none is supplied, there is no maximum.                                                                                                                                                             |
| **SequenceType**                               |  `OneOff` or `Recurring`             | Used to set whether the mandate is for a single or recurring direct debits. If none is set, the customer will get to choose on the transaction page.                                                                                                                                                                |
| **ToDate**                               |  ISO DateTime format                | The date up until which the mandate is valid to be used for direct debits. In none is set, the mandate will be valid until the customer revokes the mandate.                                                                                                                                                        |
| **AmountType**                               |  `Fixed` or `Maximum`                 | Sets whether the direct debits will be done for a fixed amount or up to a maximum amount. If not set, the customer can select this on the transaction page.                                                                                                                                                         |
| **CollectionAmount**                               |  Integer              | The fixed amount (in cents) for which direct debits can be done. If not set, the amount is open.                                                                                                                                                                                                                    |
| **FirstInstallment**                               |  Integer             | The amount (in cents) which the first installment of direct debits should be. By setting this, the customer will pay this first installment and by doing so also confirms the mandate. If not set, customer will pay a 1 cent transaction.                                                                          |
| **SRRID**                                   |  String<br/>`max. 36 chars `             | The Sender Record Reference ID is an ID that can be set to use for identifying the record against local systems. It can be used in the [Search](?document=search) and is also referenced in the [Webhooks](?document=webhooks)<br/>If posted, needs to be unique. <br/> If not supplied, will be autogenerated      |
| **AETemplateID**                             |  GUID                               | ID of the AETemplate to be used for this record. See [Glossary & Statuses](?document=glossary) for info. If not set, will be set to the Default AE Template set in the account settings.                                                                                                                            |
| **MandateReference**                             |  String<br/>`max. 35 chars `                                | Reference for the specific mandate which can be used in doing the direct debits. If not set, will be supplied.                                                                                                                                                                                                      |





### Response
From the response, you can use the ShortURL or the full TransactionURL to send to the customer:


> Response
```json
{
  "ATID": "120b6125-fdfa-4124-a08c-dbf63f38e162",
  "SRRID": "r180205114728321",
  "AETemplateID": "4a5c25a1-787a-439c-9089-2b78914be777",
  "PaymentReference": "LI-748925",
  "Amount": 12.95,
  "Description": "Mandate for insurance payments",
  "Status": "ToMandate",
  "FirstInstallment": 1,
  "Address": {},
  "Communication": [],
  "Links": {
    "TransactionURL": "https://transaction.accepteasy.com/Landing?id=120b6125-fdfa-4124-a08c-dbf63f38e162&detail=true",
    "ShortURL": "https://trx.ae/JWELEvr9JEGgjNv2PzjhYg",
    "Images": {
      "ImageURL1": "https://images.accepteasy.com/?id=120b6125-fdfa-4124-a08c-dbf63f38e162&Culture=nl-NL&part=1",
      "ImageURL2": "https://images.accepteasy.com/?id=120b6125-fdfa-4124-a08c-dbf63f38e162&Culture=nl-NL&part=2"
    }
  }
}
```

The response will contain the fields originally supplied in the POST (see above) and a number of fields created in the application:

| Field        | Explanation          |
|:-------------|:------------------|
| **ATID**           |  The unique GUID for this record.|
| **CreationDate**           |  Date on which the record was created.|
| **Status** |  The status of the record. See [Glossary & Statuses](?document=glossary&header=mandate-status) for info.  |
| **Address**       |   The Address object contains the Email and Phonenumber of the customer (if supplied). See [Sending a record](?document=sendingMessages&header=sending-a-record) for info.   |
| **TransactionURL**           |  The URL for the transaction page where the customer can make the payment.|
| **ShortURL**           | The Short URL for the transaction page, to be used in SMS messages or chats.|
| **ImageURL1**           |  The URL for the Banner image of the mandate (left part).|
| **ImageURL2**           |  The URL for the Banner image of the mandate (right part).|
