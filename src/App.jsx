import  { useState, useEffect } from 'react';
import Webcam from 'react-webcam';

const App = () => {
  const [cameras, setCameras] = useState([]);
  const [selectedCamera, setSelectedCamera] = useState(null);

  useEffect(() => {
    const fetchCameras = async () => {
      try {
        const devices = await navigator.mediaDevices.enumerateDevices();
        const cameras = devices.filter(device => device.kind === 'videoinput');
        setCameras(cameras);
        setSelectedCamera(cameras[0]?.deviceId || null);
      } catch (error) {
        console.error('Error fetching cameras:', error);
      }
    };

    fetchCameras();
  }, []);

  const handleCameraChange = (event) => {
    setSelectedCamera(event.target.value);
  };

  return (
    <div style={{
      width: '100vw',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center'
    }}>
      
      <Webcam
        audio={false}
        videoConstraints={{ deviceId: selectedCamera }}
      />
      <select style={{
        marginTop: '30px'
      }} onChange={handleCameraChange} value={selectedCamera}>
        {cameras.map(camera => (
          <option key={camera.deviceId} value={camera.deviceId}>
            {camera.label}
          </option>
        ))}
      </select>
    </div>
  );
};

export default App;
