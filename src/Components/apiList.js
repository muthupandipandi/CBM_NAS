//let context_url= 'http://43.241.62.118:8080/reminder';
// let context_url= 'http://localhost:9091/cbm';
let context_url= 'http://192.168.45.59:8080/cbm'
let context_user= 'http://150.242.13.125:8080/userRule';
// let context_url= 'http://150.242.13.125:8080/reminder';
// let context_user= 'http://localhost:9091/userRule';
// const context_port = 'http://44.193.143.42:8078/usermodule'
// let context_url= '/reminder';
export const URL_API_LOGIN = context_url + '/api/login';
export const URL_API_CHANGE_PASSWORD = context_url + '/api/changepassword';
export const URL_API_LOGOUT= context_url + '/api/logout';
export const URL_API_VALIDATE_OTP= context_user + '/api/login/validateOTP';

//user Management
export const USER_INFO_LOAD = context_url + '/usermanagement/getUserDetail';
export const USER_FEATURE = context_url + '/usermanagement/features';
export const USER_INFO_LOAD_ALL = context_url + '/usermanagement/getUserDetailAll';
export const USER_INFO_ADD = context_url + '/usermanagement/createUser';
export const USER_INFO_EDIT = context_url + '/usermanagement/updateUser'; 
export const USER_INFO_ROLES = context_url + '/usermanagement/getRoleDetail';
export const Agent_LIST = context_url + '/usermanagement/getAvailAgents'; 
export const DISABLE_USER = context_url + '/user/userStatus';
export const USER_GROUP = context_url + '/usergroup/getGrouplist';
export const VALIDATE_USER = context_url + '/usermanagement/validateUserId';
export const VALIDATE_USEREXTN = context_url + '/usermanagement/validateUserExtn';
export const VALIDATE_USEREMAIL = context_url + '/usermanagement/validateUserEmail';
export const VALIDATE_USEREPHON = context_url + '/usermanagement/validateUserPhone';

export const ENTITY_EXISTS_FIND_USER = context_url + '/user/isEntityNameExists';

export const APPROVE_USER = context_url + '/user/approveUser';
export const REJECT_USER = context_url + '/user/rejectUser';

//Campaign Management CAMPAIGN
export const CAMPAIGN_INFO_LOAD = context_url +'/campaign/getCampaignDetail' ;
export const CAMPAIGN_INFO_LOAD_ALL = context_url +'/campaign/getCampaignDetailAll'
export const CAMPAIGN_INFO_ADD =  context_url +'/campaign/createCampaign' ;
export const CAMPAIGN_INFO_EDIT =  context_url +'/campaign/updateCampaign' ;
export const CAMPAIGN_INFO_CHECK = context_url +'/campaign/validateCampaignName' ;
export const CAMPAIGN_START = context_url +'/campaign/startCampaign' ;
export const CAMPAIGN_STOP = context_url +'/campaign/stopCampaign' ;
export const CAMPAIGN_PAUSE = context_url +'/campaign/pauseCampaign' ;
export const CAMPAIGN_RESUME = context_url +'/campaign/resumeCampaign' ;
export const DISABLE_CAMPAIGN = "";
export const UPLOAD_CONTACTS_CAMPAIGN = context_url +'/campaign/uploadContactDetail';

//Group
export const CREATE_GROUP = context_url + '/usergroup/createUsergroup';
export const EDIT_GROUP = context_url + '/usergroup/updateUsergroup';
// export const DELETE_GROUP = context_port + '';
export const GROUP_LIST = context_url + '/usergroup/getusergroupDetail'; 

//SKILLSET
export const CREATE_SKILLSET = context_url + '/skillset/createSkillset';
export const EDIT_SKILLSET = context_url + '/skillset/updateSkillset';
// export const DELETE_GROUP = context_port + '';
export const SKILLSET_LIST = context_url + '/skillset/getSkillsetDetail'; 

//Dispostions
export const CREATE_DISPOSTION = context_url + '/disposition/createDisposition';
export const EDIT_DISPOSTION = context_url + '/disposition/updateDisposition';
// export const DELETE_GROUP = context_port + '';
export const DISPOSTION_LIST = context_url + '/disposition/getDispositionDetail'; 

//DNC
export const CREATE_DNC = context_url + '/campaign/createDnc';
export const EDIT_DNC = context_url + '/campaign/updateDNS';
export const LIST_DNC = context_url + '/campaign/getdnsValue';

export const UPLOAD_DNC = context_url + '/campaign/uploadDncDetail'; 
export const DNC_CONTACT_UPDATE = context_url + '/campaign/updateContact'; 
export const DNC_CONTACT_DELETE = context_url + '/campaign/DeleteContact'; 

//Report


export const GET_CAMPAIGN_NAME_LIST = context_url +'/campaign/getCampaignDetail' ;
export const GENERATE_REPORT = context_url +'/campaign/summaryReport';
export const GENERATE_DETAIL_REPORT = context_url +'/campaign/detailReport';
export const DOWNLOAD_CAMPAIGN_REPORT = context_url +'/campaign/downloadSummaryReport';
export const DOWNLOAD_CAMPAIGN_DETAIL_REPORT = context_url +'/campaign/downloadDetailReport';

//Upload History
export const GENERATE_HISTORY = context_url +'/campaign/getUploadhistory';
export const DELETE_HISTORY = context_url +'/campaign/deleteContactByHistory';
export const DOWNLOAD_GENERATE_HISTORY = context_url +'';

//Realtime Dashboard
export const RealTime_Dashboard = context_url +'/campaign/getRealTimeDashboard';
export const RealTime_Dashboard_ALL = context_url +'/campaign/getRealTimeDashboardAll';
//Realtime Dashboard
export const Agent_Dashboard = context_url +'/usermanagement/getAgentRealTimeDashboard';
// export const RealTime_Dashboard_ALL = context_url +'/campaign/getRealTimeDashboardAll';
// export const DELETE_HISTORY = context_url +'/campaign/deleteContactByHistory';
// export const DOWNLOAD_GENERATE_HISTORY = context_url +'';

//Pbx Call
export const PBX_CALL_LIST = context_url +'/campaign/getContactDetail';
export const PBX_CONNECT_CALL = context_url +'/campaign/callToCustomer';

/**Report Graph */
export const GET_RETRY_REPORT = context_url +'/campaign/getRetryReport';
export const GET_LEAD_SUMMARY_REPORT = context_url +'/campaign/getLeadWiseSummary';
export const GET_CALL_VOLUME = context_url +'/campaign/getCallVolumeReport';



