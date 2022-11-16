# Sending messages
When creating the records, it is possible to plan all future communications based on certain conditions. So you can choose to send the transaction through email right away, again through text a week later if it hasn't been paid yet, and finally a few days before expiry.


## Sending a record
An example that might be posted to `/v2/Bill/` would be:

> Request
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
      "ScheduledDate": "2023-02-05T10:11:22Z",
    },
    {
      "Channel": "Text",
      "PaymentStatus": "Open",
      "Template": "preminderText",
      "ScheduledDate": "2023-02-12T15:11:22Z",
    },
    {
      "Channel": "Email",
      "PaymentStatus": "Open",
      "Template": "finalPreminder",
      "ScheduledDate": "2023-02-25T10:11:22Z",
    },
  ]
}
```

> Will send an Email and Text message and another Email before expiry

Fields for the communication object:

| Field                                      | Type                                | Explanation                                                                                                                                                                                                              |
|:-------------------------------------------|:------------------------------------|:-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| **Channel** <br/> `Required`      |  `Email`, `Text` or `PDF`        | The channel for which to send through; Email or Text. Can also be PDF to create pdf's to be shown on the transaction page.                                                                                               |
| **Template**        |  String           | The ID of the template to send with. If not supplied will fall back to the default emailtemplate or [Communication Plan](?document=sendingMessages&header=using-the-communication-plan) as defined in the AETemplate                                     |
| **ScheduledDate**                               |  ISO DateTime format                             | The moment for when the mailing is scheduled. If not set, it will send immediately                                                                                                                                       |
| **PaymentStatus**                               |  String (enumeration)             | Filter option to send the message or not based on the Payment Status. See [Glossary & Statuses](?document=glossary&header=communication-status) for info.                                                                             |
| **MessageStatus**                               |   String (enumeration)                | Filter option to send the message or not based on the Message Status of previous messages for this mailing. See [Glossary & Statuses](?document=glossary&header=bill--mandate-communication-message-status) for info. |

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

## Adding data to be used in messages
> Request
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
      "ScheduledDate": "2018-02-05T10:11:22Z",
    }
  ],
  "RecordData": {
    "RecipientDisplayName": "Arjan",
    "RecipientAddressLine1": "Keizer Karelplein 5",
    "RecipientAddressLine2": "1185 HL",
    "RecipientAddressLine3": "Amstelveen",
    "AccountNumber": "19282489"
  }
}
```

When sending bills through email, it can be useful to add some additional information to your calls, so that this data can be used in the email- or text templates. For instance, it's very common to provide a recipient salutation and address lines.

For the RecordData you can define the variables yourself. As long as they don't share the name with an existing variable in the object (you can't add PaymentReference in the RecordData.)


## Adding attachments to emails

> Request 
```json
{
  "PaymentReference": "123456",
  "Description": "MonthlyInvoice",
  "ExpiryDate": "2023-02-28T23:59:59Z",
  "Address": {
    "Email": "contact@accepteasy.com",
    "PhoneNumber": "+31 20 261 00 20"
  },
  "Amount": 1299,
  "Communication": [
    {
      "Channel": "Email",
      "Template": "initialPaymentRequest",
      "ScheduledDate": "2023-02-05T10:11:22Z",
    }
  ],
  "Attachment": {
    "filename": "invoice1234.pdf",
    "binary":"AAAABBBCC111122223333....."
  }
}
```

If you want to add an invoice or details for a certain payment to the email you can add a PDF-attachment. See the Attachment object in the code example below.

The Attachment-filename in this call is what the file will be named (including extension) when attaching the file.
The binary needs to be a base64-encoded string of the PDF contents.

When a record is created with an attachment, all emails sent out for this record will have the attachment added to it.


## Using the Communication Plan
> Request
```json
{
  "PaymentReference": "123456",
  "Description": "MonthlyInvoice",
  "Address": {
    "Email": "contact@accepteasy.com",
    "PhoneNumber": "+31 20 261 00 20"
  },
  "Amount": 1299,
  "CommunicationPlanId": "commPlanId",
  "RecordData": {
    "RecipientDisplayName": "Arjan",
    "RecipientAddressLine1": "Keizer Karelplein 5",
    "RecipientAddressLine2": "1185 HL",
    "RecipientAddressLine3": "Amstelveen",
    "AccountNumber": "19282489"
  }
}
```


You can create Communication Plans in the application. These enable you to set up a default plan to use each time.
In this plan you can set different moments of messaging based on time of creation (e.g. 1 hour after creation of record), time of expiration (e.g. 3 days before expiration) and events (e.g. immediately after payment).

See Templates > Communication Plans in the application for setting up Communication Plans.

Once created, it can be called by adding the `CommunicationPlanId` to the call (see example)

<aside class="notice">
Adding the CommunicationPlanId will make it so that any other communication added to the call will result in an error.
</aside>

### Default Communication Plan on AETemplates
Besides adding the Communication Plan in the call you can also define one as default in the AE Template (Templates > AE Templates).

<img style='width:50%;display:block;border:1px solid #eeebee;margin-left:auto;margin-right:auto;' src='documents/images/commplan.png'/>

Now, when creating the record, make sure to use the `AETemplateID` that the Communication Plan was linked to. Don't add any other communication to the call (as this will overrule the default Communication Plan).

<aside class="notice">
The default Communication Plan will take priority over the Default Email Template. If you add a Communication Object with only a Channel (and no template), it will use the Default Communication Plan instead of the Default Email Template.
</aside>

## Domain Alignment

When we send emails on behalf of you, we will use an emailaddress with your domain. In order to do this, we will supply you with 2 DNS records (1 TXT and 1 CNAME) which will need to be added to your DNS registry.
If you want to send from invoicing@yourcompany.com the DNS records will look something like this:

`scph0433._domainkey.yourcompany.com` TXT `v=DKIM1; k=rsa; h=sha256; p=MIGfMA0...`

`ae.yourcompany.com` CNAME `eu.sparkpostmail.com`

Doing so will make sure the emails we send will be Domain Aligned (passing SPF, DMARC and DKIM) and make for a smaller chance of them ending up in SPAM folders or being rejected. It will also ensure we receive the bounces for the emails we sent so we can process them.
