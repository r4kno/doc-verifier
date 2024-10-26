const axios = require('axios');
const FormData = require('form-data');
const fs = require('fs');
const crypto = require('crypto');
require('dotenv').config();

const algorithm = 'aes-256-ctr';
const secretKey = process.env.SECRET_KEY;
const iv = crypto.randomBytes(16); 

// Function to encrypt
const encryptFile = (inputPath, outputPath) => {
  const cipher = crypto.createCipheriv(algorithm, Buffer.from(secretKey), iv);
  const input = fs.createReadStream(inputPath);
  const output = fs.createWriteStream(outputPath);

  input.pipe(cipher).pipe(output);
  return new Promise((resolve, reject) => {
    output.on('finish', resolve);
    output.on('error', reject);
  });
};

const pinFileToIPFS = async () => {
  try {
    // Encrypt
    await encryptFile('./public/assets/linkedin.png', './public/assets/encrypted_file.enc');

    let data = new FormData();
    data.append('file', fs.createReadStream('./public/assets/encrypted_file.enc')); // Encrypted file
    data.append('pinataOptions', '{"cidVersion": 0}');
    data.append('pinataMetadata', '{"name": "encrypted_pinnie"}');

    const res = await axios.post('https://api.pinata.cloud/pinning/pinFileToIPFS', data, {
      headers: {
        'Authorization': `Bearer ${process.env.PINATA_JWT}`,
      },
    });

    console.log(res.data);
    console.log(`View the encrypted file here: https://gateway.pinata.cloud/ipfs/${res.data.IpfsHash}`);
    console.log(`Encryption IV (Store it securely!): ${iv.toString('hex')}`);
  } catch (error) {
    console.log(error);
  }
};

pinFileToIPFS();