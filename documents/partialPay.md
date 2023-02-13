# Partial Payments

## How it works
We offer the option to create Partial Payments. This means a record created with a certain amount will be split into separate installments. Each installment will be mailed to the customer through a communication plan. Once a payment is made (and it wasnt the final installment) the record for the next installment will be created with a few minutes). If a user doesn't pay an installment (and lets it expire) no follow-up installments will be created.

## Setting it up
Each partial payment is based on a selected Partial Payment Plan. These can be created under Templates > Partial Payment Plans:
<img style='width:50%;display:block;border:1px solid #eeebee;margin-left:auto;margin-right:auto;' src='documents/images/partialPay.png'/>

**Installment Number**
This sets how many installments the initial record will be split in. Each installment will be for the amount of the total amount divided by the number of installments with the last installment getting the remainder. So for an amount of &euro;100,- with 3 installments, the first and second record will be &euro;33,33 and the third will be &euro;33,34.

**Expiration Days For Followup Record**
The first record will have the expiration date as defined in the Direct Contact or in the REST API record. All following records will expire this set amount of days after the expiration of the first record.

**Communication Plan**
Here you set the communication plan for all records (including the first). It is advised to always use a communication plan that uses the 'before expiration' option for all mailings as it will always behave the same for all records and not email for a newly created record immediately after paying the previous record.

**Full Payment Option**
This option allows for the user to pay the full remaining amount on each installment or just the first one (thereby finishing the partial payment process) or never allowing that option.

## Direct Contact
Once one or more plans are defined, you can use the partial pay option in Direct Contact by selecting 'Partial Plan' in the top right of the page.
Be aware here that the Expiration date is for the first installment. For the Amount, it needs to be the total amount.

## REST API
A new record for Partial Payment can be created through REST API as following:
Request
```json
{
  "PaymentReference": "LI-748925",
  "Description": "Partial Payment for insurance deductible",
  "Amount": 11295,
  "ExpiryDate": "2023-04-02T09:00:00Z",
  "Address": {
    "Email": "enterEmail@Here.com"
  },
  "PartialPaymentPlanID": "partialpay_3_30"
}
```

Be aware that all communication for this record is handled through the Communication Plan as defined in the Partial Payment Plan. This means no Communication or Communication plan should be used in the call.
