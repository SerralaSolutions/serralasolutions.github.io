# Domain Alignment

When you use our software to schedule emails on behalf of your company, we will use an email-address with your domain. 
In order to allow us to send with your domain, we need to be able to prove that we are allowed to do so.
To allow our software to send emails on behalf of your domain, we need to add 2 DNS records to the DNS registry of this domain.
If you have more than one domain, we will need to add these records to each domain you want to send from.

We will supply you with 2 DNS records (1 TXT and 1 CNAME). 
Your IT department can apply these records to your DNS registry.
After this we will need to verify them and do some initial setup.

If you want to send from invoicing@yourcompany.com the DNS records will look something like this:

```TXT
scph****._domainkey.yourcompany.com TXT v=DKIM1; k=rsa; h=sha256; p=MIGfMA0...
```

```TXT
ae.yourcompany.com CNAME eu.sparkpostmail.com
```

Additionally, your DMARC record cannot have strict policies for SPF and DKIM.
If you have a DMARC record with a strict policy for SPF and DKIM, you will need to adjust this to allow our software to send emails on your behalf.
You can verify this by checking if `aspf=` and `adkim=` are not set or set to `aspf=r` and `adkim=r` in your DMARC record.

By adding these records it will make sure the emails we send will pass SPF, DMARC and DKIM requirements.
