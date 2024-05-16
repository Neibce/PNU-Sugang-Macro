# PNU-Sugang-Macro

- Node.js + [Request](https://github.com/request/request/)(Deprecated) + jsnb(for RSA Encryption)
- 2024년 2분기
- CSRF, RSA Encryption

## flow
1. Read ```SUBJECTS[](to apply), COOKIE, CSRFTOKEN, USERINFO[], RSAKEY, PARAMS[], TARGTIME``` from File or Const variables.
2. Get CurrentServerTime(POST /g***) - ```header: CSRFTOKEN,COOKIE / body: {}```
3. Wait... (Until ```currentServerTime >= TARGTIME```) - ```setTimeout(tictoc, 1000)```
4. Request Apply(POST /l***) - ```header: CSRFTOKEN,COOKIE / body: RSAEncryption.encrypt(getParams(SUBJECT[i],USERINFO)) / timeout: 60000```
5. Show, Update results

<img width="682" alt="image" src="https://github.com/Neibce/PNU-Sugang-Macro/assets/18096595/dd2856a8-0f90-4019-9eac-b9c4ce3355d1">
