import React from 'react';
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';

function Download({ newsData }) {
  const downloadImage = () => {
    html2canvas(document.querySelector('.newspaper'), { scale: 4 }).then(canvas => {
      const imgData = canvas.toDataURL('image/png');
      const link = document.createElement('a');
      link.href = imgData;
      link.download = 'news.png';
      link.click();
    });
  };

  const downloadPDF = () => {
    html2canvas(document.querySelector('.newspaper'), { scale: 4 }).then(canvas => {
      const imgData = canvas.toDataURL('image/png');
      const pdf = new jsPDF('p', 'mm', 'a4');
      const width = pdf.internal.pageSize.getWidth();
      const height = (canvas.height * width) / canvas.width;
      pdf.addImage(imgData, 'PNG', 0, 0, width, height);
      pdf.save('news.pdf');
    });
  };

  const printReady = () => {
    html2canvas(document.querySelector('.newspaper'), { scale: 4 }).then(canvas => {
      const imgData = canvas.toDataURL('image/png');
      const win = window.open('');
      win.document.write(`<img src="${imgData}" onload="window.print();window.close()" />`);
    });
  };

  return (
    <div className="download">
      <button onClick={downloadImage}>Download Image</button>
      <button onClick={downloadPDF}>Download PDF</button>
      <button onClick={printReady}>Print Ready</button>
    </div>
  );
}

export default Download;