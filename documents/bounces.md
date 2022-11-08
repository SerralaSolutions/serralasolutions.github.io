# Bounces 
Some emails will result in a bounce (because a mailbox doesn't exist, is full, etc.).
You can receive a webhook when a message bounces. See webhooks for more information.

## Fetching bounces
To get an overview of the bounces you can do a `GET` call and specify the timeframe in which you want the overview of the bounces.


### HTTP Request
`GET https://api.acceptemail.com/v2/Search/Bounces?bounceDateFrom=2020-07-01&type=Bills`

### Response

> Response 

```json
{
  "Bills": [
    {
      "Status": "Open",
      "AETemplateID": "00000000-0000-0000-0000-000000000000",
      "ATID": "00000000-0000-0000-0000-000000000000",
      "Address": {
        "Email": "wrongemail@accepteasy.com"
      },
      "Amount": 0.01,
      "Description": "Description",
      "PaymentReference": "123456",
      "SRRID": "r210517140901394",
      "ExpiryDate": "2022-04-18T11:59:57.597Z",
      "Links": {
        "TransactionURL": "https://transaction.accepteasy.com/Landing?id=00000000-0000-0000-0000-000000000000&detail=true",
        "ShortURL": "https://trx.ae/YMIqhS4gvUStu6N5KAbyo1",
        "Images": {
          "ImageURL1": "https://images.accepteasy.com/?id=00000000-0000-0000-0000-000000000000&Culture=nl-NL&part=1",
          "ImageURL2": "https://images.accepteasy.com/?id=00000000-0000-0000-0000-000000000000&Culture=nl-NL&part=2",
          "Button": "https://images.accepteasy.com/button.png?id=00000000-0000-0000-0000-000000000000&Culture=nl-NL"
        }
      },
      "Bounce": {
        "DateReceived": "2021-05-17T12:09:46Z",
        "Message": "smtp;550 5.4.1 Recipient address rejected: Access denied. AS(201806281) [AM5EUR03FT035.eop-EUR03.prod.protection.outlook.com]",
        "StatusCode": "5.1.1",
        "CommunicationID": "50510b17-f81e-441c-82ec-d60a2f16863e"
      }
    }
  ],
  "Mandates": [],
  "SearchMetadata": {
    "CompletedIn": 0.01,
    "Count": 50,
    "Page": 1,
    "TotalNumberOfResults": 2,
    "NextResults": "?bounceDateFrom=2020-07-01&type=Bills&page=2&count=1"
  }
}
```

As you can see, the response is comprised of the search results in the Bills array, and some SearchMetaData. If the number of results exceeds the "count", and several pages of results exist, a query for the next page will be included in the SearchMetadata.

<aside class="notice">
Be aware on the timing of the filters. They are based on when a bounce is received on our systems, which could be up to 72 hours after when the email has been sent.
</aside>
