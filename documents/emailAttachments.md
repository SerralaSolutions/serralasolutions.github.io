# Adding attachments to emails
If you want to add an invoice or details for a certain payment to the email you can add a PDF-attachment. See the Attachment object in the code example below.

The Attachment-filename in this call is what the file will be named (including extension) when attaching the file.
The binary needs to be a base64-encoded string of the PDF contents.

When a record is created with an attachment, all emails sent out for this record will have the attachment added to it.
##### Optional for: `POST /v2/Bill` & `POST /v2/Mandate`
##### Request body:

<details>
<summary>Example request body</summary>

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
</details>
