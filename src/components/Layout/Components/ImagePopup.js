import React, { useState, useCallback } from 'react';
import { useDropzone } from 'react-dropzone';

const ImageUploadPopup = ({ isOpen, onClose, onImageUpload }) => {
    const onDrop = useCallback((acceptedFiles) => {
        // Xử lý tệp tin đã được chấp nhận ở đây
        onImageUpload(acceptedFiles[0]);
        onClose();
    }, [onImageUpload, onClose]);

    const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop });

    return (
        <div style={{ display: isOpen ? 'block' : 'none', position: 'fixed', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', padding: '20px', backgroundColor: 'white', zIndex: 999 }}>
            <div {...getRootProps()} style={dropzoneStyles}>
                <input {...getInputProps()} />
                {isDragActive ? (
                    <p>Thả tệp tin vào đây...</p>
                ) : (
                    <p>Nhấn vào đây hoặc kéo tệp tin vào đây</p>
                )}
            </div>
            <button onClick={onClose}>Đóng</button>
        </div>
    );
};

const dropzoneStyles = {
    border: '2px dashed #0087F7',
    borderRadius: '4px',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    padding: '20px',
    textAlign: 'center',
    cursor: 'pointer',
};

export default ImageUploadPopup;
