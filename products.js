/* Catalogue shown on the website. Prices are PROPOSED starting prices in South African rand.
   The files themselves are NOT stored here: they live in private storage and are released by the server
   only after verified payment. Keep ids identical to the product ids used in your database/storage. */
window.NV_CATEGORIES = ['Construction Templates','Building Documents','Health and Safety','Project Management','Business Documents','Property Development','Renewable Energy','Ebooks and Guides','Nexusville Literature'];
window.NV_PRODUCTS = [
 {id:'basic-checklist',name:'Basic Construction Checklist',cat:'Building Documents',format:'PDF',price:29,
  desc:'A simple checklist to help you keep a small building project organised from start to finish.',
  includes:['Printable construction project checklist']},
 {id:'quotation-template',name:'Construction Quotation Template',cat:'Construction Templates',format:'Editable document',price:49,
  desc:'An editable quotation template for contractors and builders to price and present work to clients.',
  includes:['Editable construction quotation template']},
 {id:'material-estimation',name:'Material Estimation Spreadsheet',cat:'Construction Templates',format:'Spreadsheet',price:79,
  desc:'A spreadsheet to help estimate quantities and costs of building materials for a project.',
  includes:['Material estimation spreadsheet']},
 {id:'project-starter-pack',name:'Construction Project Starter Pack',cat:'Project Management',format:'Document pack',price:149,
  desc:'Core documents for planning, budgeting and reporting on a construction project.',
  includes:['Construction project checklist','Material estimation spreadsheet','Project budget template','Project progress report','Site meeting minutes template']},
 {id:'business-starter-pack',name:'Construction Business Starter Pack',cat:'Business Documents',format:'Document pack',price:199,
  desc:'Business documents for people starting or formalising a small construction business.',
  includes:['Business plan template','Company profile template','Invoice templates','Professional letter templates']},
 {id:'property-proposal-pack',name:'Property Development Proposal Pack',cat:'Property Development',format:'Document pack',price:249,
  desc:'Templates to structure a property development proposal and assess whether a project is viable.',
  includes:['Property development proposal template','Feasibility study template','Development budget template']},
 {id:'pm-ebook',name:'Construction Project Management Ebook',cat:'Ebooks and Guides',format:'Ebook',price:99,
  desc:'An introductory guide to managing a construction project, written for emerging contractors and entrepreneurs.',
  includes:['Ebook (digital download)']},
 {id:'complete-bundle',name:'Complete Construction Document Bundle',cat:'Construction Templates',format:'Bundle',price:399,
  desc:'Every document pack and the ebook above in one discounted bundle.',
  includes:['Basic Construction Checklist','Construction Quotation Template','Material Estimation Spreadsheet','Construction Project Starter Pack','Construction Business Starter Pack','Property Development Proposal Pack','Construction Project Management Ebook']}
];
  
