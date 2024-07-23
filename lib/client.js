const axios = require('axios');
const fs = require('fs');
const FormData = require('form-data');
const path = require('path');
const mime = require('mime-types');

class Client {
  constructor(apiKey) {
    this.apiKey = apiKey;
    this.baseUrl = 'https://api.heytextual.com';
  }

  async extract(filePath, templateId) {
    try {
      // Verify the file exists
      if (!fs.existsSync(filePath)) {
        throw new Error(`File not found: ${filePath}`);
      }

      const form = new FormData();
      const fileStream = fs.createReadStream(filePath);
      const fileName = path.basename(filePath);
      const mimeType = mime.lookup(filePath) || 'application/octet-stream';

      // Append file to form data
      form.append('file', fileStream, {
        filename: fileName,
        contentType: mimeType,
      });

      // Append template ID to form data
      form.append('template', templateId);

      // Calculate Content-Length
      const contentLength = await new Promise((resolve, reject) => {
        form.getLength((err, length) => {
          if (err) reject(err);
          resolve(length);
        });
      });

      // Axios POST request
      const response = await axios.post(`${this.baseUrl}/extract`, form, {
        headers: {
          'Authorization': `Bearer ${this.apiKey}`,
          ...form.getHeaders(),
          'Content-Length': contentLength,
        },
        maxContentLength: Infinity,
        maxBodyLength: Infinity,
      });

      return response.data;
    } catch (error) {
      if (error.response) {
        console.error('Error Response:', error.response.data);
      } else {
        console.error('Error:', error.message);
      }
      throw error;
    }
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