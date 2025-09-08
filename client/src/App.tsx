import React from 'react';
import logo from './logo.svg';
import './App.css';
import UploadFileForm from './components/upload-file-form';
import FileSection from './components/file-component';

function App() {
  return (
  <div dir='rtl'>
    <UploadFileForm />
    <FileSection />
  </div>
  );
}

export default App;
