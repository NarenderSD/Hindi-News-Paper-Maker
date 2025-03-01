import React from 'react';

function NewsForm({ setNewsData, newsData }) {
  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (name === 'images') {
      setNewsData(prev => ({ ...prev, images: Array.from(files) }));
    } else {
      setNewsData(prev => ({ ...prev, [name]: value }));
    }
  };

  return (
    <div className="form">
      <input type="text" name="title" placeholder="शीर्षक (Title)" value={newsData.title} onChange={handleChange} />
      <textarea name="article" placeholder="लेख (Article)" value={newsData.article} onChange={handleChange}></textarea>
      <input type="file" name="images" accept="image/*" multiple onChange={handleChange} />
      <input type="text" name="caption" placeholder="छवि विवरण (Image Caption)" value={newsData.caption} onChange={handleChange} />
      <select name="template" value={newsData.template} onChange={handleChange}>
        <option value="default">डिफ़ॉल्ट टेम्पलेट</option>
        <option value="dainik">दैनिक जागरण स्टाइल</option>
        <option value="hindustan">हिंदुस्तान स्टाइल</option>
      </select>
      <select name="font" value={newsData.font} onChange={handleChange}>
        <option value="Noto Sans Devanagari">Noto Sans Devanagari</option>
        <option value="Kruti Dev">Kruti Dev</option>
        <option value="Mangal">Mangal</option>
      </select>
      <select name="columns" value={newsData.columns} onChange={handleChange}>
        <option value="1">1 कॉलम</option>
        <option value="2">2 कॉलम</option>
        <option value="3">3 कॉलम</option>
      </select>
      <select name="headlineStyle" value={newsData.headlineStyle} onChange={handleChange}>
        <option value="bold">बोल्ड</option>
        <option value="italic">इटैलिक</option>
        <option value="underline">अंडरलाइन</option>
      </select>
      <select name="background" value={newsData.background} onChange={handleChange}>
        <option value="plain">सादा</option>
        <option value="newsprint1">न्यूज़प्रिंट 1</option>
        <option value="newsprint2">न्यूज़प्रिंट 2</option>
        <option value="newsprint3">न्यूज़प्रिंट 3</option>
      </select>
      <input type="text" name="edition" placeholder="संपादन (Edition)" value={newsData.edition} onChange={handleChange} />
    </div>
  );
}

export default NewsForm;