# Redirecting after payment
Once a user has made a payment at their paymentprovider, they'll be redirected back to the Serrala transaction (or 'landing') page. In some cases you might want to redirect the user to another page or app.

Go to the AE Template and make sure to add the amount of seconds before the result banner auto redirect should take place (enter 0 for immediate redirect).

## Set redirect per record (only for bills)
If you want each record to have unique redirect URL's, you can add this through the API by adding the Extras-object with the urls.
This is only applicable to bills, not to mandates.

<details>
<summary>Example request body</summary>

```json
{
  "PaymentReference": "123456",
  "Description": "Payment from Chat",
  "Amount": 1299,
  "ExpiryDate": "2020-04-01T09:00:00Z",
    
  "Extras":{
  	"ReturnBannerOpenURL":"https://www.example.com",
  	"ReturnBannerPaidURL":"https://www.example.com"
  }
}
```
</details>

## Custom redirect through url parameters
For some use cases, a record will have different ways of being accessed (through email, portal and app) and each will have a different return-url. For this scenario, you can use pass the return-url's in query-parameters in the url. The parameters are the same as for the scenario above. The url's will have to be encoded. 

```
https://transaction.accepteasy.com/7f5f945f-1965-4acc-b4cf-8a36510c0ec6?ReturnBannerOpenURL=https%3A%2F%2Fwww.example.com&ReturnBannerPaidURL=https%3A%2F%2Fwww.example.com
```

As a security measure, the url will be checked against a regular expression which will have to be set in the application under **Settings** > **Dynamic Redirect** > **URL Validation Expression**. If no regular expression is set or the url doesn't match the regular expression, the user won't be redirected to the dynamic url. (if a url is set in the record or template, that redirect will apply)

Let's say your redirect will go to either https://www.example.com/id/1234567890 or /appurl/example/com/id?1234567890 the regex will look like this:
```
^(https:\/\/www.example.com\/id\/[0-9]{10})|(\/appurl\/example\/com\/id\?[0-9]{10})$
```

## App urls
You can also add app-urls in both the Result banner and the record-specific URL's to be able to redirect a user to your mobile app. This goes for all redirect-scenarios described above.
