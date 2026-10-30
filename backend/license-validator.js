// license-validator.js

// Common permissive licenses safe for closed-source commercial use
const SAFE_LICENSES = ['MIT', 'Apache-2.0', 'ISC', 'BSD-2-Clause', 'BSD-3-Clause'];

function isLicenseSafeForCommercial(licenseData) {
    if (!licenseData) return false; 

    // Handle both string and object formats from npm API responses
    const licenseName = typeof licenseData === 'string' ? licenseData : licenseData.type;

    return SAFE_LICENSES.includes(licenseName);
}

module.exports = { isLicenseSafeForCommercial };