const report = require('multiple-cucumber-html-reporter');
const packageJson = require('../../../package.json');

report.generate({
	jsonDir: 'e2e/cypress/reports/cucumber/',
  reportPath: 'e2e/cypress/reports/',
  openReportInBrowser: false,
  pageTitle: 'Login-Karumi-Code-Test',
	metadata:{
        browser: {
            name: 'chrome',
            version: '83'
        },
        device: 'Local test machine',
        platform: {
            name: 'macOS',
            version: '10.15.5'
        }
    },
    customData: {
        title: 'Execution info',
        data: [
            {label: 'Project', value: 'Login-Karumi-Code-Test'},
            {label: 'Version', value: packageJson.version},
            {label: 'Execution Date', value: new Date().toDateString()},
        ]
    }
});
