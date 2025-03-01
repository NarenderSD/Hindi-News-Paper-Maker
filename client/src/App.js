import React, { useState, useEffect } from 'react';
import NewsForm from './components/NewsForm';
import Preview from './components/Preview';
import Download from './components/Download';
import './styles.css';

function App() {
  const [newsData, setNewsData] = useState(() => ({
    title: '',
    article: '',
    images: [], // Changed to array for multiple images
    caption: '',
    template: 'default',
    date: new Date().toLocaleDateString('hi-IN'),
    edition: 'संपादन १',
    columns: 2,
    font: 'Noto Sans Devanagari',
    headlineStyle: 'bold',
    background: 'plain'
  }));
  const [history, setHistory] = useState([]);
  const [historyIndex, setHistoryIndex] = useState(-1);
  const [zoom, setZoom] = useState(1);

  useEffect(() => {
    if (historyIndex < history.length - 1) {
      setHistory(history.slice(0, historyIndex + 1));
    }
    setHistory([...history, newsData]);
    setHistoryIndex(history.length);
  }, [newsData]); // Fixed syntax here

  const undo = () => {
    if (historyIndex > 0) {
      setHistoryIndex(historyIndex - 1);
      setNewsData(history[historyIndex - 1]);
    }
  };

  const redo = () => {
    if (historyIndex < history.length - 1) {
      setHistoryIndex(historyIndex + 1);
      setNewsData(history[historyIndex + 1]);
    }
  };

  const saveDraft = () => {
    localStorage.setItem('newsDraft', JSON.stringify(newsData));
    alert('Draft saved!');
  };

  const loadDraft = () => {
    const draft = localStorage.getItem('newsDraft');
    if (draft) {
      setNewsData(JSON.parse(draft));
      alert('Draft loaded!');
    } else {
      alert('No saved draft found!');
    }
  };

  return (
    <div className="app">
      <h1 className="app-title">Khabar Maker</h1>
      <NewsForm setNewsData={setNewsData} newsData={newsData} />
      <div className="controls">
        <button onClick={undo} disabled={historyIndex <= 0}>Undo</button>
        <button onClick={redo} disabled={historyIndex >= history.length - 1}>Redo</button>
        <button onClick={saveDraft}>Save Draft</button>
        <button onClick={loadDraft}>Load Draft</button>
        <input type="range" min="0.5" max="2" step="0.1" value={zoom} onChange={(e) => setZoom(e.target.value)} />
        <label>Zoom: {zoom}x</label>
      </div>
      <Preview newsData={newsData} zoom={zoom} />
      <Download newsData={newsData} />
      <footer className="footer">Created by Narender Singh</footer>
    </div>
  );
}

export default App;