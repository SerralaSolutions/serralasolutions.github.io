# Authentication

## Obtaining your password

Our REST API uses Basic Authentication. In order to start developing with our REST API, you will need a name and a key.

Log into the application and go to **Account** > **Settings** > **REST API Keys Settings** (your account needs Admin or Settings-rights to access this).

At the REST API Keys Settings, enter a key name, let the app generate the keys and **press save**.

<img style='width:50%;display:block;border:1px solid #eeebee;margin-left:auto;margin-right:auto;' src='documents/images/authentication.png'/>

## Constructing the header

Using your api key name and primary or secondary api key, construct the basic authorization header. 

The construction is as follows:  
`Authorization: Basic <base64 encoded name:key>`

This should create the following header:  
`Authorization: Basic YW5HjA.........`


## Rotating the API Keys

Both keys will work for authentication, and you can renew them one by one. This enables you to rotate the keys without downtime if you want to change them. You can use the secondary key as you renew the primary.
