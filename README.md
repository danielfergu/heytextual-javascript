# HeyTextual JS SDK

## Instalación

```bash
npm install heytextual-javascript
```

```javascript
const redacted = require('heytextual-javascript');
const client = redacted('your_api_key');

(async () => {
  const data = await client.extract('path/to/file', 'TEMPLATEID');
  console.log(data);

  const documents = await client.documents({ startDate: '2023-01-01', endDate: '2023-01-31', last: 10 });
  console.log(documents);

  const document = await client.document('DOCUMENTID');
  console.log(document);

  const templates = await client.templates({ startDate: '2023-01-01', endDate: '2023-01-31', last: 10 });
  console.log(templates);
})();
```