
async function globalSetup() {
  console.log('GLOBAL SETUP');
  process.env.IS_SALESFORCE = (process.env.SKUID_HOST!.indexOf('salesforce.com') > -1).toString();
}

export default globalSetup;