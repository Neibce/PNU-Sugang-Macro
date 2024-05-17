# PNU-Sugang-Macro

- Node.js + [Request](https://github.com/request/request/)(Deprecated) + jsnb(for RSA Encryption)
- 2024년 2분기
- CSRF, RSA Encryption

## flow
1. Read variables ```SUBJECTS[], COOKIE, CSRFTOKEN, USERINFO[], RSAKEY, PARAMS[] and TARGTIME``` from a file or const variables.
2. Get the currentServerTime(POST /g***) - ```header: CSRFTOKEN,COOKIE / body: {}```
3. Wait until ```currentServerTime >= TARGTIME``` using ```setTimeout(tictoc, 1000)```
4. Make N Requests to Apply(POST /l***) - ```header: CSRFTOKEN,COOKIE / body: RSAEncryption.encrypt(getParams(SUBJECT[i],USERINFO)) / timeout: 60000```
5. Show and update results

<img width="682" alt="image" src="https://github.com/Neibce/PNU-Sugang-Macro/assets/18096595/dd2856a8-0f90-4019-9eac-b9c4ce3355d1">
