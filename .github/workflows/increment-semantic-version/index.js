const core = require('@actions/core');


async function run() {
    const version = core.getInput('version');
    core.setOutput("incremented_version", incrementSemanticVersion(version));
}

function incrementSemanticVersion(version) {
   const [major, minor, patch,rc] = version.split('.');
   return major +"."+ minor +"."+ patch +"."+ (number(rc)+1)
}

// @ts-ignore
if (!module.parent) {
  try {
    run()
  } catch (error) {
    core.setFailed(error.message)
    throw error
  }
}
