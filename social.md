# Đăng nhập thông qua mạng xã hội

## Google

1. Lấy Authentication Code

GET https://accounts.google.com/o/oauth2/v2/auth

Params:

- client_id: CLIENT ID cua ban
- redirect_uri: Link Callback
- response_type: code
- scope: email profile
- access_type: offline

2. Lấy Access Token

POST https://oauth2.googleapis.com/token

Body:

- code: Code lấy từ bước trên
- client_id: CLIENT ID cua ban
- client_secret: SECRET cua ban
- redirect_uri: Link Callback
- grant_type: authorization_code
