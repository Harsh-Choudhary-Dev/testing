const { fromPath } = require('pdf2pic');
const express = require('express')
const app = express()
const fs = require('fs');
const multer = require('multer');
const upload = multer({ dest: 'uploads/' });
app.get('/', function (req, res) {
  res.send('Hello World')
})

app.post('/upload', upload.single('pdfFile'), (req, res) => {
    const uploadedFile = req.file;
  
    if (!uploadedFile) {
      return res.status(400).send('No PDF file uploaded.');
    }
  
    // Handle the uploaded PDF file here
    console.log('PDF uploaded:', uploadedFile.originalname, uploadedFile.path);
    // Perform operations like reading, processing, or saving the PDF
  
    res.send('PDF uploaded successfully!');
  });
app.listen(3000)

async function convertPdfToImages(pdfPath, outputPath, options = {}) {
  try {
    const pdfBuffer = await fs.promises.readFile(pdfPath);
    const convertedImages = fromPath(pdfBuffer, options);
    console.log(convertedImages)
    // convertedImages.forEach((image, pageNumber) => {
    //   const imageName = `page-${pageNumber + 1}.${options.format || 'jpg'}`;
    //   const imagePath = path.join(outputPath, imageName);
    //   fs.promises.writeFile(imagePath, image);
    // });

    console.log('PDF converted to images successfully!');
  } catch (error) {
    console.error('Error converting PDF:', error);
  }
}

// Example usage
const pdfPath = 'Node.pdf';
const outputPath = './images';
const options = {
  density: 300, // adjust image quality (DPI)
  width: 1024, // adjust output image width
  height: 768, // adjust output image height
  format: 'png', // output image format (default: jpeg)
};

convertPdfToImages(pdfPath, outputPath, options);
