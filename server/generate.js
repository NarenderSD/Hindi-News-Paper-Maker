const { exec } = require('child_process');
const path = require('path');

function generateImage(title, article, caption, images, template, date, edition, columns, font, headlineStyle, background) {
  return new Promise((resolve, reject) => {
    const pythonScript = path.join(__dirname, 'generate.py');
    const imagePaths = images.map(img => path.join(__dirname, img)).join(',');
    exec(`python "${pythonScript}" "${title}" "${article}" "${caption}" "${imagePaths}" "${template}" "${date}" "${edition}" "${columns}" "${font}" "${headlineStyle}" "${background}"`, (err, stdout) => {
      if (err) return reject(err);
      resolve(stdout.trim());
    });
  });
}

module.exports = { generateImage };