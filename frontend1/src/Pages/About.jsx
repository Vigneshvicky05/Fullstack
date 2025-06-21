import { useState } from 'react';
import State from '../hooks/State';
import { Link } from 'react-router-dom';
const About = () => {
    return(
        <div>
              <Link to="/state">Usestate Example</Link><br />
               <Link to="/form">Controlled Form</Link>
        </div>
    )
}
export default About