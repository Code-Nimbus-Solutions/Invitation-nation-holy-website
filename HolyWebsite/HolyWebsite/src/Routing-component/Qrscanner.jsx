import React, { useState, useEffect } from 'react';
import { Html5QrcodeScanner } from 'html5-qrcode';

function QRScanner() {
    const [scannedData, setScannedData] = useState(''); // State to store scanned data

    useEffect(() => {
        const scanner = new Html5QrcodeScanner('reader', {
            qrbox: {
                width: 250,
                height: 250,
            },
            fps: 20,
        });

        scanner.render(success, error);

        return () => {
            scanner.clear();
        };
    }, []);

    function success(result) {
        console.log('Scanned result:', result);
        setScannedData(result); // Update scanned data state
    }

    function error(err) {
        console.error('Scan error:', err);
    }

    return (
        <main>
            <div id="reader"></div>
            <div id="result">
                {scannedData ? (
                    <div>
                        <h2>Scanned Data:</h2>
                        <p>{scannedData}</p>
                    </div>
                ) : (
                    <p>Scanning...</p>
                )}
            </div>
        </main>
    );
}

export default QRScanner;
