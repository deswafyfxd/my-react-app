import React, { useState, useEffect } from 'react';

const FileBrowser = ({ setMediaSrc }) => {
  const [files, setFiles] = useState([]);
  const rcloneServeUrl = process.env.REACT_APP_RCLONE_SERVE_URL;

  useEffect(() => {
    const fetchFiles = async (path = '') => {
      const response = await fetch(`${rcloneServeUrl}/${path}`);
      const data = await response.json();

      const files = await Promise.all(data.map(async file => {
        if (file.isDirectory) {
          return fetchFiles(`${path}/${file.name}`);
        } else {
          return `${path}/${file.name}`;
        }
      }));

      setFiles(prevFiles => [...prevFiles, ...files.flat()]);
    };

    fetchFiles();
  }, [rcloneServeUrl]);

  return (
    <div className="file-browser">
      <h2>Media Files</h2>
      <ul>
        {files.map((file, index) => (
          <li key={index} onClick={() => setMediaSrc(`${rcloneServeUrl}/${file}`)}>
            {file}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default FileBrowser;
