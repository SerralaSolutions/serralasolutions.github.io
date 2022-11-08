# Using your own URL 

## Setting up Custom URL's for the transaction page

It is possible to set up a Custom URL for our transaction page. So you could have `https://pay.yourcompany.com/[ATID]` instead of `https://transaction.accepteasy.com/[ATID]`

Please contact our Operations department to set this up.
It will involve setting 2 DNS records (1 TXT and 1 CNAME) and signing a Certificate Signing Request (CSR) to set up SSL.

It is also possible to customize the ShortURL for use in Text messages.

## Using the Custom URL in the REST API

> Response

```json
{
  "ATID": "120b6125-fdfa-4124-a08c-dbf63f38e162",
  "SRRID": "r180205114728321",
  "AETemplateID": "4a5c25a1-787a-439c-9089-2b78914be777",
  "PaymentReference": "LI-748925",
  "Amount": 12.95,
  "Description": "Payment for insurance deductible",
  "ExpiryDate": "2023-04-02T09:00:00Z",
  "Status": "Open",
  "Address": {
    "Email": "",
    "PhoneNumber": ""
  },
  "Communication": [],
  "Links": {
    "TransactionURL": "https://pay.yourcompany.com/120b6125-fdfa-4124-a08c-dbf63f38e162",
    "ShortURL": "https://trx.ae/JWELEvr9JEGgjNv2PzjhYg",
    "Images": {
      "ImageURL1": "https://images.accepteasy.com/?id=120b6125-fdfa-4124-a08c-dbf63f38e162&Culture=nl-NL&part=1",
      "ImageURL2": "https://images.accepteasy.com/?id=120b6125-fdfa-4124-a08c-dbf63f38e162&Culture=nl-NL&part=2"
    }
  }
}
```

Once set up and linked to the AETemplate the calls to our REST API will be the same as described in [Creating a Bill](#creating-a-bill). 
Be sure to use the `AETemplateID` to which the custom URL is linked. The respone will now contain the Custom URL (see example). In all communication sent by us we will also use the custom URL.
