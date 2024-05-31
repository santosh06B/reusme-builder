const express = require('express');
const path = require('path');
const jsPDF = require('jspdf');
const { Document, Packer, Paragraph, TextRun } = require('docx');

const app = express();
app.use(express.static(path.join(__dirname, 'public')));
app.set('view engine', 'ejs');

app.get('/', (req, res) => {
  res.render('index');
});

app.post('/download/pdf', (req, res) => {
  const doc = new jsPDF();
  doc.text('This is a sample PDF.', 10, 10);
  res.setHeader('Content-Disposition', 'attachment; filename=resume.pdf');
  res.setHeader('Content-Type', 'application/pdf');
  res.send(doc.output());
});

app.post('/download/word', (req, res) => {
  const doc = new Document({
    sections: [{
      children: [
        new Paragraph({
          children: [
            new TextRun("This is a sample Word document."),
          ]
        })
      ]
    }]
  });

  Packer.toBuffer(doc).then(buffer => {
    res.setHeader('Content-Disposition', 'attachment; filename=resume.docx');
    res.setHeader('Content-Type', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document');
    res.send(buffer);
  });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
