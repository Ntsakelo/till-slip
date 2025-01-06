import Grid from '@mui/material/Grid2';
import './styles.css'
import Webcam from 'react-webcam';
import { useState, useRef, useCallback, useEffect } from 'react';
import photography from '../../images/picture.svg';
import { TypeAnimation } from 'react-type-animation';
import FormData from 'form-data';
import usePost from '../../utils/useFetch';
import StepperComponent from '../../components/StepperComponent';
import { styled } from '@mui/material/styles';
import Button from '@mui/material/Button';
import {useNavigate} from 'react-router-dom';
import CameraAltIcon from '@mui/icons-material/CameraAlt';
import ThreeSixtyIcon from '@mui/icons-material/ThreeSixty';

const VisuallyHiddenInput = styled('input')({
  clip: 'rect(0 0 0 0)',
  clipPath: 'inset(50%)',
  height: 1,
  overflow: 'hidden',
  position: 'absolute',
  bottom: 0,
  left: 0,
  whiteSpace: 'nowrap',
  width: 1,
});


const Home = () => {
  const [cameraOn, setCameraOn] = useState(false)
  const [imgUrl, setImgUrl] = useState('')
  const webCamRef = useRef()
  const [fileBlob, setFileBlob] = useState({})
  const { post, result, error } = usePost()
  const [uploadedFile,setUploadedFile] = useState(null)
  const navigate = useNavigate()
  const [facingMode,setFacingMode] = useState('user')

  useEffect(() => {
     console.log(fileBlob)
  },[fileBlob])


  const handleCameraMode = () => {
    facingMode === 'user' ? setFacingMode('environment') : setFacingMode('user')
  }
  
  useEffect(() => {
    if (result && result.status === 200) {
      sessionStorage.setItem('message', result.data.message)
      navigate('/thankyou')
    } else {
      console.log(error)
    }
    
  }, [result, error])
  
  const base64ToBlob = (base64, mime) => {
    const byteCharacters = atob(base64.split(',')[1]); // Get base64 string excluding the metadata
    const byteArrays = [];

    for (let offset = 0; offset < byteCharacters.length; offset += 1024) {
      const slice = byteCharacters.slice(offset, offset + 1024);
      const byteNumbers = new Array(slice.length);

      for (let i = 0; i < slice.length; i++) {
        byteNumbers[i] = slice.charCodeAt(i);
      }
      
      byteArrays.push(new Uint8Array(byteNumbers));
    }
    
    return new Blob(byteArrays, { type: mime });
  }
  useEffect(() => {
    if(uploadedFile){
      const canvas = document.createElement('canvas')
      const ctx = canvas.getContext('2d')
      const img = new Image()
      const fileReader = new FileReader();
      let base64 = '';
      fileReader.onloadend = () => {
        base64 = fileReader.result;
        img.src = base64
        img.onload = () => {
          const width = img.width;
          const height = img.height;
          const scale = Math.min(500/width,500/height);
          const newWidth = width * scale;
          const newHeight = height * scale;
          canvas.width = newWidth;
          canvas.height = newHeight;
          ctx.drawImage(img,0,0,newWidth,newHeight);
          const resizedBase64 = canvas.toDataURL('image/jpeg', 0.5)
          console.log(resizedBase64)
          setImgUrl(resizedBase64)
          const blob = base64ToBlob(resizedBase64,uploadedFile.type)
          setFileBlob(blob)
        }
      }
      fileReader.readAsDataURL(uploadedFile)
    }
  },[uploadedFile])

  const capture = useCallback(() => {
    const base64 = webCamRef.current?.getScreenshot()
    const mime = base64.split(':')[1].split(";")[0]
    const blob = base64ToBlob(base64, mime)
    setFileBlob(blob)
    setImgUrl(base64)
    setCameraOn(false)
  }, [webCamRef])
  const handleWebCam = () => {
    cameraOn ? setCameraOn(false) : setCameraOn(true)
  }
  
  const handleSaveData = async () => {
    try {
      if (fileBlob) {
        const formData = new FormData()
        formData.append('file', fileBlob)
        await post(formData, 'v1/process_image')
      }
    } catch (err) {
      console.log(err)
    }
  }
  return (
    <div className="main-container">
      <StepperComponent step={1} />
      <nav className='nav'>
        {/* <h3 className="appName">Slip<span className="style-letters">flix</span></h3> */}
      </nav>
      <Grid container>
        <Grid size={{ xs: 12 }}>
          <div className="processing-container">
            {cameraOn && <Webcam
              // width={'500px'}
              // height={'500px'}
              screenshotFormat='image/jpeg'
              screenshotQuality={1.9}
              ref={webCamRef}
              target='user'
              style={{ margin: 'auto',maxWidth:'500px',width:'90%' }}
              videoConstraints={{
                facingMode:{exact:facingMode}
              }}
            />}
            {imgUrl && <img src={imgUrl} alt="my image" className="userImage"/>}
            {!cameraOn && !imgUrl && <img src={photography} alt="photography image" className="photography-img" />}
          </div>
          {cameraOn && <div className="capture" onClick={capture}><CameraAltIcon sx={{display:'block',margin:'auto',color:'#9694FF'}}/></div>}
          {cameraOn && <div className="capture" id="rotate-cam" onClick={handleCameraMode}><ThreeSixtyIcon sx={{display:'block',margin:'auto',color:'#9694FF'}}/></div>}
          {/* {fileBlob && cameraOn && <button type='button' onClick={handleSaveData} className='save-cta'>Save</button>} */}
          {!cameraOn &&<div style={{width:'fit-content',margin:'auto'}}>
           <Button
              component="label"
              role={undefined}
              variant="contained"
              tabIndex={-1}
              sx={{backgroundColor:'#f0f0f0',borderRadius:'20px',color:'#9694FF'}}
              onClick={handleWebCam}
              >
              Take picture
            </Button>
            
          </div>}
          {!cameraOn && <p style={{textAlign:'center'}}>OR</p>}
          {!cameraOn && <div style={{width:'fit-content',margin:'auto'}}>
            <Button
              component="label"
              role={undefined}
              variant="contained"
              tabIndex={-1}
              sx={{backgroundColor:'#f0f0f0',borderRadius:'20px',color:'#9694FF'}}
              >
              Upload Picture
              <VisuallyHiddenInput
                type="file"
                onChange={(event) => setUploadedFile(event.target.files[0])}
                multiple
                />
            </Button>

          </div>}

        <button type="button" className="camera-cta" id="proceed-cta" onClick={handleSaveData}>Save & Proceed</button>
      
        </Grid>
      </Grid>
    </div>
  )
}

export default Home;