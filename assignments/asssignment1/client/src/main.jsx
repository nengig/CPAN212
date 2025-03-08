import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import Education from './pages/resume/education.jsx'
import WorkExperience from './pages/resume/experience/workExp.jsx'
import VolunteerExperience from './pages/resume/experience/volunteer/communityVol.jsx'
import Extracurricular from './pages/resume/experience/volunteer/extracurricular.jsx'
import Skills from './pages/resume/skills.jsx'
import VolunteerWork from './pages/resume/experience/volunteer/volunteerExp.jsx'
import Overview from './overview.jsx';
import Designs from './pages/projects/design.jsx'
import Photographs from './pages/projects/photography.jsx'
import Programming from './pages/projects/programming.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Overview/>
    <Skills/>
    <Designs/>
    <Photographs/>
    <Programming/>
    <WorkExperience/>
    <VolunteerWork/>
    <VolunteerExperience/>
    <Extracurricular/>
    <Education/>
  </StrictMode>,
)
