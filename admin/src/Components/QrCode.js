import React, { useState } from 'react';
import QRCode from 'react-qr-code';

const QrCode = () => {
    const [text, setText] = useState('');

    function handlechange(e) {
        const newText = e.target.value;
        setText(newText);
    }

    return (
        <div className="flex items-center justify-center h-screen">
            <div className="bg-gray-200 p-6 rounded-lg text-center">
                <h1 className="text-3xl mb-4">Generador de código QR</h1>
                <div className="flex justify-center">
                    <div style={{ alignSelf: 'center' }}>
                        <QRCode
                            value={text}
                            bgColor="#ffffff"
                            fgColor="#000000"
                            level="L"
                            size={256}
                        />
                    </div>
                </div>
                <div className="input-here mt-4">
                    <h4 className="text-sm text-gray-600">
                        Ingresa la URL para crear el código QR
                    </h4>
                    <input type="text" value={text} onChange={(e) => handlechange(e)} />
                </div>
            </div>
        </div>
    );
};

export default QrCode;
