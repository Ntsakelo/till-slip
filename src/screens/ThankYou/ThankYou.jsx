import StepperComponent from '../../components/StepperComponent';
import { TypeAnimation } from 'react-type-animation';
import './styles.css'


const ThankYou = () => {
    const message = sessionStorage.getItem('message')
    return (
        <div>
            <StepperComponent step={2}/>
            <div className="message-container">
               {/* <p>{message}</p> */}
               <TypeAnimation sequence={[message,1000]} 
                 wrapper="span"
                 speed={50}
                 style={{ fontSize: '2em', display: 'inline-block',color:'#9694FF' }}
                 repeat={Infinity}
               />
            </div>
        </div>
    )
}

export default ThankYou;