/* ═══════════════════════════════════════
   GHL CHECKLIST DATA
═══════════════════════════════════════ */
window.GHL_CHECKLIST = [
  { id:'ghl-1',  num:1,  label:'GHL Overview',              sub:'Getting started right',
    video:'https://www.youtube.com/embed/ziyXGvSyDlQ',
    link:null, linkLabel:'Open GHL Dashboard',
    desc:'Watch this overview to understand the platform before diving in. This sets the foundation for everything else.' },
  { id:'ghl-2',  num:2,  label:'Add Team Members',          sub:'Quickly add your staff',
    video:'https://www.youtube.com/embed/6pqWVjMWJk8',
    link:'settings/team', linkLabel:'Go to Team Settings',
    desc:'Add your VA, assistant, or other team members so they have the right access from day one.' },
  { id:'ghl-3',  num:3,  label:'Setup Business Profile',    sub:'Update your business details',
    video:'https://www.youtube.com/embed/KknohLKikrc',
    link:'settings/business-profile', linkLabel:'Go to Business Profile',
    desc:'Fill in your business name, address, phone, and logo. This info populates throughout your funnels and emails.' },
  { id:'ghl-4',  num:4,  label:'Setup Personal Profile',    sub:'Update your personal details',
    video:'https://www.youtube.com/embed/zQ-rgh-pogg',
    link:'settings/profile', linkLabel:'Go to Personal Profile',
    desc:'Set your name, profile photo, and notification preferences.' },
  { id:'ghl-5',  num:5,  label:'Setup Calendar',            sub:'Connect your calendar',
    video:'https://www.youtube.com/embed/eOyEIqvOdeE',
    link:'settings/calendars', linkLabel:'Go to Calendar Settings',
    desc:'Connect Google or Outlook and configure your availability so booking links work correctly.' },
  { id:'ghl-6',  num:6,  label:'Setup Email',               sub:'Configure your sending address',
    video:'https://www.youtube.com/embed/NV5JzrQAWSE',
    link:'settings/email', linkLabel:'Go to Email Settings',
    desc:'Connect your sending domain and verify your email address so campaigns land in the inbox.' },
  { id:'ghl-7',  num:7,  label:'Setup Phone Number',        sub:'Get your GHL number',
    video:'https://www.youtube.com/embed/9QQ1cVQoBaU',
    link:'settings/phone-numbers', linkLabel:'Go to Phone Settings',
    desc:'Purchase and configure a phone number for SMS and call automations.' },
  { id:'ghl-8',  num:8,  label:'Setup Payment Integration', sub:'Connect Stripe or another processor',
    video:'https://www.youtube.com/embed/b_7Co26_29g',
    link:'settings/integrations', linkLabel:'Go to Integrations',
    desc:'Connect Stripe so you can collect payments through order forms, courses, and memberships.' },
  { id:'ghl-9',  num:9,  label:'Website Domain',            sub:'Connect your custom domain',
    video:'https://www.youtube.com/embed/sJEsVkyoS3A',
    link:'settings/domains', linkLabel:'Go to Domain Settings',
    desc:'Connect your custom domain so funnels and websites display your brand URL.' },
  { id:'ghl-10', num:10, label:'Upload Contacts',           sub:'Import your existing list',
    video:'https://www.youtube.com/embed/K6IJw0vEETM',
    link:'contacts/import', linkLabel:'Go to Contact Import',
    desc:'Upload your existing email list or CRM contacts so they are ready to use in automations.' },
  { id:'ghl-11', num:11, label:'Install Mobile App',        sub:'GHL on your phone',
    video:'https://www.youtube.com/embed/nsv6PlYxXDg',
    link:null, linkLabel:'Download the App',
    desc:'Download the LeadConnector app for iOS or Android to manage conversations on the go.' },
  { id:'ghl-12', num:12, label:'Missed Call Settings',      sub:'Set up missed call text-back',
    video:'https://www.youtube.com/embed/yEKgSrwiWqM',
    link:'settings/missed-call', linkLabel:'Go to Missed Call Settings',
    desc:'Configure automatic text-back when you miss a call — one of GHL\'s most powerful built-in automations.' },
  { id:'ghl-13', num:13, label:'View Conversations',        sub:'Your unified inbox',
    video:'https://www.youtube.com/embed/qujDN-oL5Gg',
    link:'conversations', linkLabel:'Go to Conversations',
    desc:'Understand the conversations view where all SMS, email, and DM activity lives in one place.' },
  { id:'ghl-14', num:14, label:'Custom Fields',             sub:'Set up your custom values',
    video:'https://www.youtube.com/embed/3lXjU-dO_Dc',
    link:'settings/custom-fields', linkLabel:'Go to Custom Fields',
    desc:'Learn how custom fields and custom values work — this is what GHL Jetpack writes to.' },
  { id:'ghl-15', num:15, label:'Setup Billing',             sub:'Add your card on file',
    video: null,
    link:'settings/billing', linkLabel:'Go to Billing',
    desc:'Add your card on file to ensure SMS and emails send as expected. Without this, your messages may be paused.' },
  { id:'ghl-16', num:16, label:'Next Steps',                sub:'What comes after setup',
    video:'https://www.youtube.com/embed/VSLdc5-ZYKc',
    link:null, linkLabel:'Go to Dashboard',
    desc:'You\'ve completed the foundation. Watch this to understand your next steps in building your Authority OS.' },
];

let _ghlChecked = {};
let _activeChecklistItem = null;

function loadChecklistState() { _ghlChecked = S.get('aob_ghl_checklist', {}); }
function toggleChecklist(id) {
  _ghlChecked[id] = !_ghlChecked[id];
  S.set('aob_ghl_checklist', _ghlChecked);
  renderCoreSetup();
}
function openChecklistItem(id) {
  _activeChecklistItem = (_activeChecklistItem === id) ? null : id;
  renderCoreSetup();
}
