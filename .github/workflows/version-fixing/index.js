import * as core from '@actions/core';

async function run() {
    const version = core.getInput('version');
    const conversionType = core.getInput('type');
    if (conversionType == "semantic_version" ) {
        core.setOutput("modified_version", convertToSemVar(version));
    } else {
        core.setOutput("modified_version", convertToAssemblyVersions(version));
    }
}

function convertToSemVar(version) {
    let semvar = version.replace("v.","")
    semvar = semvar.replace("rc.","rc")
    return semvar
}

function convertToAssemblyVersions(version) {
    let assemblyVersion = "v." + version
    assemblyVersion = assemblyVersion.replace("rc","rc.")
    return assemblyVersion
}