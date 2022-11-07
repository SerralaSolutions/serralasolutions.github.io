# Glossary & Statuses

## Glossary

### Record
A single record (e.g. created through REST API) that is a single Bill or Mandate that can be paid/fulfilled by a customer.

### Bill
A record that is an invoice to be paid by a customer. This can be a deductible for your insurance or an invoice for a delivered good or service.

### Mandate
A mandate is a special type of bill in which the recipient pays a small fee or first installment for a service he or she will receive. In doing so, he/she gives the sender a mandate to direct debit a payment from that account for a set or variable amount during a set period.

### AE Template
A template that defines various properties for a record (e.g. the payment methods, transaction page customization, default language, etc.). AETemplates are created and edited within the application (Templates > AE Templates). A record is always linked to a single AE Template.

## Statuses

Records and mailings can have various statuses. Below an overview of the different statuses

## Bill Status

| Status        | Explanation          |
|:-------------|:------------------|
| **Open**           | Bill not yet paid by customer. Also not yet expired.  |
| **CountDown** | Bill in final days before expiry (to be set on the record). Can still be paid. Payment button and banners will turn orange to notify customer |
| **Paid**       | Bill paid by customer     |
| **Expired**           | Bill is past expirydate. Not paid by customer |
| **Canceled**           | Bill canceled. Can't be paid any more |
| **Pending**           | Customer scheduled payment, but confirmation of payment has not arrived yet. (Only applicable for certain payment methods in which a payment can be scheduled for a certain date.) |
| **Done**           |  Customer made payment, but confirmation of payment has not arrived yet. (Only applicable for certain payment methods)|
| **All**           | Technical status, should never happen |

## Mandate Status

| Status        | Explanation          |
|:-------------|:------------------|
| **ToMandate**           | Mandate not yet paid by customer. |
| **Mandated** |  Mandate paid by customer. |
| **Expired**           |  Mandate past expiration date. No longer valid. |
| **Revoked**           |  Customer has revoked mandate after payment. No longer valid.|
| **Withdrawn**           |  Mandate withdrawn. Customer can't pay the mandate any more. |

## Communication Status

| Status        | Explanation          |
|:-------------|:------------------|
| **Pending**           | Mailing scheduled, but not yet sent |
| **InProgress** |  Mailing in progress|
| **Failed**       |   Something went wrong during mailing |
| **Sent**           | Mailing succesfully sent |
| **Cancelled**           |  Mailing cancelled |

## Bill Communication PaymentStatus

| Status        | Explanation          |
|:-------------|:------------------|
| **All**           | Filter option for all statuses |
| **Paid** |  Only send to bills that are paid |
| **Open**       |   Only send to bills that are to be paid   |
| **Countdown**           | Only send to bills that are in Countdown status |
| **Pending**           | Only send to bills in Pending status  |

## Mandate Communication PaymentStatus

| Status        | Explanation          |
|:-------------|:------------------|
| **All**           |  Filter option for all statuses|
| **Mandated** |  Only send to paid mandates |
| **ToMandate**       |   Only send to mandates that still need to be paid  |

## Bill & Mandate Communication Message Status

| Status        | Explanation          |
|:-------------|:------------------|
| **All**           |  Filter option for all mailings |
| **Opened** |  Send message to customers who have previously opened an email for this record |
| **NotOpened**       |  Send message to customers who have **not** previously opened an email for this record     |
| **Clicked**           | Send message to customers who have previously clicked the link for this record |
| **NotClicked**           | Send message to customers who have **not** previously clicked the link for this record |
| **BouncedEmail**           | Send message to customers for which the email bounced  |
| **BouncedSMS**           | Send message to customers for which the SMS bounced  |
| **Snoozed**           | Send message to customers who clicked the Snooze button in a previous email for this record  |
| **NotSnoozed**          | Send message to customers who **did not** click the Snooze button in a previous email for this record  |
