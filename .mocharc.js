module.exports = {
    timeout: 90000,
    reporter: 'mocha-multi-reporters',
    reporterOptions: {
        configFile: 'report-config.json',
    }
};
