const axios = require('axios');
const fs = require('fs');
const FormData = require('form-data');

class Client {
  constructor(apiKey) {
    this.apiKey = apiKey;
    this.baseUrl = 'https://api.heytextual.com';
  }

  async extract(filePath, templateId) {
    const form = new FormData();
    form.append('file', fs.createReadStream(filePath));
    form.append('template', templateId);

    const response = await axios.post(`${this.baseUrl}/extract`, form, {
      headers: {
        'Authorization': `Bearer ${this.apiKey}`,
        ...form.getHeaders(),
      },
    });

    return response.data;
  }

  async documents(params) {
    const response = await axios.post(`${this.baseUrl}/documents`, null, {
      headers: {
        'Authorization': `Bearer ${this.apiKey}`,
      },
      params,
    });

    return response.data;
  }

  async document(documentId) {
    const response = await axios.post(`${this.baseUrl}/document`, null, {
      headers: {
        'Authorization': `Bearer ${this.apiKey}`,
      },
      data: { documentId },
    });

    return response.data;
  }

  async templates(params) {
    const response = await axios.post(`${this.baseUrl}/templates`, null, {
      headers: {
        'Authorization': `Bearer ${this.apiKey}`,
      },
      params,
    });

    return response.data;
  }
}

module.exports = Client;
