### Desc:
Notify API service, supports below:
- send email notify(type=email)

### Usage:
docker run -p 3000:3000 -d -e configfile=/path/to/configfile vioao/notify

### Config
```
{
  "email": {
    "sender": {
      "pool": true,
      "host": "your email smtp host",
      "port": 25, // smtp port
      "auth": {
        "user": "your sender email",
        "pass": "your sender password"
      }
    },
    "receiver": "the email to receive notify"
  },
  "security": {
    "whitelist": "127.0.0.1,localhost"
  }
}
```

### API

POST 
> /notify?type=${type}  
```json
{
  "to": "receiver@gmail.com",
  "title": "email subject title",
  "html": "email html content"
}
```
