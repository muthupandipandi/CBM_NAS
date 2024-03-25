import React from 'react';
import { BrowserRouter as Router , Route } from 'react-router-dom'
import LoginContainer from './Components/Login/loginContainer';
import Dashboard from './Components/Dashboard/dashboard';
import campaignContainer from './Components/Campaign/campaignContainer';
import realtimeDashboardContainer from'./Components/RealTimeDashboard/realtimeDashboradContainer'
import addContactsContainer from './Components/AddContacts/addContactsContainer';
import reportContainer from './Components/Reports/reportContainer';
import pbxCallContainer from './Components/PbxCall/pbxCallContainer';

import Graph from './Components/Reports/graph';
// import RealtimeDashboard from './Components/RealTimeDashboard/realtimeDashborad';
import UserContainer from './Components/UserManagement/userContainer';
import dispostionsContainer from './Components/DispositionManagement/dispostionsContainer';
import usergroupContainer from './Components/UserGroup/usergroupContainer';
import skillsetContainer from './Components/SkillSet/skillsetContainer';
import dncManagementContainer from './Components/DNCManagement/dncManagementContainer';

function App() {
  return (
    <div className="App">
        <Router basename={process.env.PUBLIC_URL}>      
          <Route exact path ="/" component={LoginContainer} /> 
          <Route path ="/dashboard" component={Dashboard} />
          <Route path ="/dashboard/campaign" component={campaignContainer} />
          <Route path ="/dashboard/contacts" component={addContactsContainer} /> 
          <Route path ="/dashboard/reports" component={reportContainer} />
    
          <Route path ="/dashboard/customercall" component={pbxCallContainer} />
          <Route path ="/dashboard/reportgraph" component={Graph} />
          <Route path ="/dashboard/realtimedashboard" component={realtimeDashboardContainer} />
          <Route path ="/dashboard/users" component={UserContainer} />
          <Route path ="/dashboard/dispostions" component={dispostionsContainer} />
          <Route path ="/dashboard/usergroup" component={usergroupContainer} />
          <Route path ="/dashboard/skillset" component={skillsetContainer} />
          <Route path ="/dashboard/dnc" component={dncManagementContainer} />

        </Router> 
    </div>
  );
}

export default App;
