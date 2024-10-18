# Adding data to be used in messages
When sending bills through email, it can be useful to add some additional information to your calls, so that this data can be used in the email- or text templates. For instance, it's very common to provide a recipient salutation and address lines.

For the RecordData you can define the variables yourself. As long as they don't share the name with an existing variable in the object (you can't add PaymentReference in the RecordData).

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
</details>

##### Verification
The record data will now be visible in the application:

<img style='width:50%;display:block;border:1px solid #eeebee;margin-left:auto;margin-right:auto;' src='documents/images/emaildata.png'/>
