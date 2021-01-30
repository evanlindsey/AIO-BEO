module.exports = {
    timeout: 60000,
    parallel: true,
    reporter: 'mocha-multi-reporters',
    reporterOptions: {
        configFile: 'report-config.json',
    }
};
