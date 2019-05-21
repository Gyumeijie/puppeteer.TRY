# settings

### ZJU mail

```json
"server": {
   "user": "xxxxx",
   "password": "xxxxx",
   "host":"smtp.zju.edu.cn",
   "port":"994"
},
```
- IMAP:
> host: imap.zju.edu.cn, port:143(SSL:993)
- POP:
> host: pop3.zju.edu.cn, port: 110(SSL:995)
- SMTP: 
> host: smtp.zju.edu.cn, 25，(SSL:994)

## QQ mail

```json
"server": {
   "user": "your-account@qq.com",
   "password": "xxxxxxxxxx",
   "host": "smtp.qq.com"
},

```
> The `password` is not login password, but a **authorization code**