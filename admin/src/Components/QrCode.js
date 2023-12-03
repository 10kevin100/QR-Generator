import React, { useState, useRef } from 'react';
import QRCode from 'react-qr-code';
import { toPng } from 'html-to-image';

const QrCode = () => {
    const [text, setText] = useState('');
    const qrCodeRef = useRef();

    const handleChange = (e) => {
        const newText = e.target.value;
        setText(newText);
    };


    const downloadQRCode = async () => {
        const qrCodeDiv = qrCodeRef.current;
    
        if (!qrCodeDiv) {
            console.error('QR Code container not found');
            return;
        }
    
        try {
            const dataUrl = await toPng(qrCodeDiv, { scale: 2, quality: 1, format: 'png' });


    
            // Crear un elemento de imagen y establecer estilos
            const img = new Image();
            img.src = dataUrl;
    
            img.onload = () => {
                // Crear un lienzo (canvas) para redimensionar la imagen
                const canvas = document.createElement('canvas');
                const context = canvas.getContext('2d');
    
                // Ajustar el tamaño del lienzo
                canvas.width = img.width * 1; // Doble del ancho original
                canvas.height = img.height * 1; // Doble del alto original
    
                // Dibujar la imagen redimensionada en el lienzo
                context.drawImage(img, 0, 0, canvas.width, canvas.height);
    
                // Obtener la URL de datos del lienzo
                const resizedDataUrl = canvas.toDataURL('image/png');
    
                // Crear enlace de descarga
                const downloadLink = document.createElement('a');
                downloadLink.href = resizedDataUrl;
                downloadLink.download = 'codigoQR.png';
    
                document.body.appendChild(downloadLink);
                downloadLink.click();
                document.body.removeChild(downloadLink);
            };
        } catch (error) {
            console.error('Error downloading QR code:', error);
        }
    };
    
    



    return (
        <div className="flex items-center justify-center h-screen">
            <div className="p-6 rounded-lg text-center" style={{ backgroundColor: '#5b88a5' }}>
                <h1 className="text-3xl mb-4">Generador de código QR</h1>
                <div className="flex justify-center" ref={qrCodeRef}>
                    <div className="p-4 rounded-t-md rounded-b-md" style={{ backgroundColor: '#f4f4f2' }}>
                        <QRCode
                            value={text}
                            bgColor="#f4f4f2"
                            fgColor="#191013"
                            level="L"
                            size={256}
                        />
                    </div>
                </div>
                <div className="input-here mt-4">
                    <h4 className="text-m text-black font-bold py-1">
                        Ingresa la URL para crear el código QR:
                    </h4>
                    <input
                        type="text"
                        value={text}
                        onChange={handleChange}
                        className="px-2 py-2 rounded-md w-2/3 mt-2 focus:outline-none focus:shadow-outline-blue"
                        placeholder='https://twitter.com/10kevin100'
                        
                    />
                </div>
                <button
                    className="btn btn-primary mt-4 py-2 px-2 rounded-md  bg-white font-bold hover:bg-black hover:text-white"
                    onClick={downloadQRCode}
                >
                    Descargar QR
                </button>
            </div>
        </div>
    );
};

export default QrCode;
