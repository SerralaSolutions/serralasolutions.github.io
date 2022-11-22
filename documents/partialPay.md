# Partial Payments

## How it works
We offer the option to create Partial Payments. This means a record created with a certain amount will be split into separate installments. Each installment will be mailed to the customer through a communication plan. If a user doesn't pay a record (and lets it expire). No follow-up records will be created.

## Setting it up
Each partial payment is based on a selected Partial Payment Plan. These can be created under Templates > Partial Payment Plans:
<img style='width:50%;display:block;border:1px solid #eeebee;margin-left:auto;margin-right:auto;' src='documents/images/partialPay.png'/>

**Installment Number**
This sets how many installments the record will be split in. Each installment will be for the rounded amount of the total amount divided by the number of installments. So for an amount of &euro;100,- with 3 installments, the first and second record will be &euro;33,33 and the third will be &euro33,34.

**Expiration Days For Followup Record**
The first record will have the expiration date as defined in the Direct Contact or in the REST API record. All following records will expire this set amount of days after the expiration of the first record.

**Communication Plan**
Here you set the communication plan for all records (including the first). It is advised to always use a communication plan that uses the 'before expiration' option for all mailings as it will always behave the same for all records and not email for a newly created record immediately after paying the previous record.

**Full Payment Option**
This option allows for the user to pay the full remaining amount on each installment or just the first one (thereby finishing the partial payment process) or never allowing that option.
