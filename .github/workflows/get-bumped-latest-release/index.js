const core = require('@actions/core');
const github = require('@actions/github');


async function run() {
    const version = await getLatestPreRelease()
    core.setOutput("tag_name", incrementSemanticVersion(version));
}

async function getLatestPreRelease() {
    try {
        const token = core.getInput('token');
        const octokit = github.getOctokit(token)
        var releases  = await octokit.rest.repos.listReleases({
            repo: github.context.repo.repo,
            owner: github.context.repo.owner,
            per_page: 100,
            page:1,
            });
        releases = releases.data;
        releases = releases.filter(x => x.prerelease == true);
        if (releases.length) {
            return releases[0].tag_name
        } else {
            core.setFailed("No valid releases");
            return ""
        }
    }
    catch (error) {
        core.setFailed(error.message);
    }
}

function incrementSemanticVersion(version) {
   const [major, minor, patch,rc] = version.split('.');
   return major +"."+ minor +"."+ patch +"."+ (Number(rc)+1)
}

if (!module.parent) {
  try {
    run()
  } catch (error) {
    core.setFailed(error.message)
    throw error
  }
}
