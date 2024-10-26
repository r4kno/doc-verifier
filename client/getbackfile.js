/* const decryptFile = (inputPath, outputPath, ivHex) => {
    const decipher = crypto.createDecipheriv(algorithm, Buffer.from(secretKey), Buffer.from(ivHex, 'hex'));
    const input = fs.createReadStream(inputPath);
    const output = fs.createWriteStream(outputPath);
  
    input.pipe(decipher).pipe(output);
    return new Promise((resolve, reject) => {
      output.on('finish', resolve);
      output.on('error', reject);
    });
  };
  
  // Example usage after downloading the file
  decryptFile('./public/assets/downloaded_encrypted_file.enc', './public/assets/decrypted_file.png', 'your-stored-iv-hex');
  */