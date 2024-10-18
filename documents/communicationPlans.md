# Using the Communication Plan
You can create Communication Plans in the application. These enable you to set up a default plan to use each time.
In this plan you can set different moments of messaging based on time of creation (e.g. 1 hour after creation of record), time of expiration (e.g. 3 days before expiration) and events (e.g. immediately after payment).

See Templates > Communication Plans in the application for setting up Communication Plans.

Once created, it can be called by adding the `CommunicationPlanId` to the call (see example).

##### Optional for: `POST /v2/Bill` & `POST /v2/Mandate`
##### Request body:
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
</details>

> Adding the CommunicationPlanId will make it so that any other communication added to the call will result in an error.

### Default Communication Plan on AETemplates
Besides adding the Communication Plan in the call you can also define one as default in the AE Template (Templates > AE Templates).

<img style='width:50%;display:block;border:1px solid #eeebee;margin-left:auto;margin-right:auto;' src='documents/images/commplan.png'/>

Now, when creating the record, make sure to use the `AETemplateID` that the Communication Plan was linked to. Don't add any other communication to the call (as this will overrule the default Communication Plan).

<aside class="notice">
The default Communication Plan will take priority over the Default Email Template. If you add a Communication Object with only a Channel (and no template), it will use the Default Communication Plan instead of the Default Email Template.
</aside>
