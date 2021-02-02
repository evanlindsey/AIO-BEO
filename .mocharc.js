module.exports = {
    timeout: 60000,
    reporter: 'mocha-multi-reporters',
    reporterOptions: {
        configFile: 'report-config.json',
    }
};
