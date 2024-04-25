import { uploadFileApi } from '@/apis/file';
import React, { useState } from 'react';

const FileUpload = () => {
  const [selectedFile, setSelectedFile] = useState(null);

  const handleFileChange = (event) => {
    setSelectedFile(event.target.files[0]);
  };

  const handleUpload = () => {
    if (!selectedFile) {
      alert('请选择要上传的文件');
      return;
    }

    const files = new FormData();
    files.append('files', selectedFile);

    fetch('http://120.78.142.84:8080/oss/upload', {
      method: 'POST',
      body: files
    })
    // uploadFileApi(formData)
    .then(response => {
      if (!response.ok) {
        throw new Error('上传文件失败');
      }
      return response.json();
    })
    .then(data => {
      alert('文件上传成功');
      console.log('服务器返回的数据:', data);
    })
    .catch(error => {
      console.error('上传文件出错:', error);
    });
  };

  return (
    <div>
      <input type="file" onChange={handleFileChange} />
      <button onClick={handleUpload}>上传</button>
    </div>
  );
};

export default FileUpload;