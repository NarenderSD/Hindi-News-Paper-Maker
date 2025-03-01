import React from 'react';

function Preview({ newsData, zoom }) {
  const getTemplateStyle = () => {
    switch (newsData.template) {
      case 'dainik':
        return { border: '3px double black', backgroundColor: '#fff3e6', boxShadow: '5px 5px 15px rgba(0,0,0,0.2)' };
      case 'hindustan':
        return { border: '2px solid #333', backgroundColor: '#f0f0f0', borderRadius: '5px' };
      default:
        return { border: '2px solid black', backgroundColor: '#f5f5f5' };
    }
  };

  const getBackgroundStyle = () => {
    switch (newsData.background) {
      case 'newsprint1':
        return { backgroundImage: 'url(/newsprint1.jpg)', backgroundSize: 'cover' };
      case 'newsprint2':
        return { backgroundImage: 'url(/newsprint2.jpg)', backgroundSize: 'cover' };
      case 'newsprint3':
        return { backgroundImage: 'url(/newsprint3.jpg)', backgroundSize: 'cover' };
      default:
        return {};
    }
  };

  const getHeadlineStyle = () => {
    switch (newsData.headlineStyle) {
      case 'italic':
        return { fontStyle: 'italic' };
      case 'underline':
        return { textDecoration: 'underline' };
      default:
        return { fontWeight: 'bold' };
    }
  };

  // Article ke pehle 2-3 words bold karna
  const getBoldArticle = () => {
    const articleText = newsData.article || 'लेख यहाँ';
    const words = articleText.split(' ');
    const boldWords = words.slice(0, 3).join(' '); // Pehle 3 words
    const restWords = words.slice(3).join(' ');
    return (
      <>
        <strong>{boldWords}</strong> {restWords}
      </>
    );
  };

  return (
    <div className="preview">
      <h2>पूर्वावलोकन (Preview)</h2>
      <div className="newspaper" style={{ ...getTemplateStyle(), ...getBackgroundStyle(), transform: `scale(${zoom})` }}>
        <div className="header">
          <span>{newsData.date}</span>
          <span>{newsData.edition}</span>
        </div>
        <h1 style={getHeadlineStyle()}>{newsData.title || 'शीर्षक यहाँ'}</h1>
        {newsData.images.length > 0 && (
          <div className="image-gallery">
            {newsData.images.map((img, index) => (
              <div key={index}>
                <img src={URL.createObjectURL(img)} alt={`News ${index + 1}`} />
                {index === 0 && <p className="caption">{newsData.caption || 'छवि विवरण यहाँ'}</p>}
              </div>
            ))}
          </div>
        )}
        <p className="article" style={{ columnCount: newsData.columns, fontFamily: newsData.font }}>
          {getBoldArticle()}
        </p>
      </div>
    </div>
  );
}

export default Preview;