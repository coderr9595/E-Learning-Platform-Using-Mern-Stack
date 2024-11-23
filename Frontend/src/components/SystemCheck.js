import React, { useState, useEffect } from 'react';

const SystemCheck = () => {
  const [cameraPermission, setCameraPermission] = useState(false);
  const [audioPermission, setAudioPermission] = useState(false);
  const [extensionInstalled, setExtensionInstalled] = useState(false);
  const [isChrome, setIsChrome] = useState(false);
  const [chromeVersionOK, setChromeVersionOK] = useState(false);
  const [loading, setLoading] = useState(true);

  
  const LATEST_CHROME_VERSION = 117;

  useEffect(() => {
    const checkPermissions = async () => {
      try {
       
        const stream = await navigator.mediaDevices.getUserMedia({ video: true, audio: true });
        setCameraPermission(true);
        setAudioPermission(true);
        stream.getTracks().forEach(track => track.stop()); 
      } catch (err) {
        console.error('Permission denied', err);
        setCameraPermission(false);
        setAudioPermission(false);
      }

      window.postMessage('check_extension_installed', '*');
  
      window.addEventListener('message', (event) => {
        if (event.data.extensionInstalled) {
          setExtensionInstalled(true);
        }
      });
  
      const isChromeBrowser = /Chrome/.test(navigator.userAgent) && /Google Inc/.test(navigator.vendor);
      const isEdgeBrowser = /Edg/.test(navigator.userAgent);
      
      setIsChrome(isChromeBrowser && !isEdgeBrowser);  
  
      if (isChromeBrowser && !isEdgeBrowser) {
        const chromeVersion = parseInt(navigator.userAgent.match(/Chrome\/(\d+)/)?.[1], 10);
        setChromeVersionOK(chromeVersion >= LATEST_CHROME_VERSION);
      }
  
      setLoading(false);
  
      return () => {
        window.removeEventListener('message', () => {});
      };
    };
  
    checkPermissions();
  }, []);
  
  const startTest = () => {
    
    alert('Starting the test...');
  };

  if (loading) {
    return <div>Checking your system...</div>;
  }

  const CheckIcon = ({ passed }) => (
    <span className={`ml-2 ${passed ? 'text-green-600' : 'text-red-600'}`}>
      {passed ? '✔️' : '❌'}
    </span>
  );

  return (
    <div className="max-w-screen-xl mx-auto p-6">
      <h2 className="text-4xl font-bold text-center mb-8 text-gray-800">System Check</h2>

      <div className="bg-white shadow-lg rounded-lg p-6 mb-8">
        <ul className="space-y-4">
          <li className="flex items-center">
            <p className="font-medium">Camera Permission</p>
            <CheckIcon passed={cameraPermission} />
          </li>

          <li className="flex items-center">
            <p className="font-medium">Audio Permission</p>
            <CheckIcon passed={audioPermission} />
          </li>

          <li className="flex items-center">
            <p className="font-medium">Required Extension Installed</p>
            <CheckIcon passed={extensionInstalled} />
          </li>

          <li className="flex items-center">
            <p className="font-medium">Browser is Chrome</p>
            <CheckIcon passed={isChrome} />
          </li>

          {isChrome && (
            <li className="flex items-center">
              <p className="font-medium">Chrome Version is Latest</p>
              <CheckIcon passed={chromeVersionOK} />
            </li>
          )}
        </ul>

        {cameraPermission && audioPermission && extensionInstalled && isChrome && chromeVersionOK ? (
          <div className="mt-8">
            <p className="text-green-600 font-semibold">Your system is OK! You can proceed with the test.</p>
            <button
              className="bg-blue-500 text-white font-semibold py-2 px-4 rounded-md hover:bg-blue-600 transition duration-300 mt-4"
              onClick={startTest}
            >
              Start Test
            </button>
          </div>
        ) : (
          <div className="mt-8">
            {!cameraPermission && <p className="text-red-600">Camera permission is not granted.</p>}
            {!audioPermission && <p className="text-red-600">Audio permission is not granted.</p>}
            {!extensionInstalled && (
              <p className="text-red-600">
                The required extension is not installed. Please download it to proceed.
              </p>
            )}
            {!isChrome && <p className="text-red-600">You must use Google Chrome to proceed.</p>}
            {isChrome && !chromeVersionOK && (
              <p className="text-red-600">Please update your Chrome browser to the latest version.</p>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default SystemCheck;
