// Fetch the latest version from the provided versionEndpoint
async function FetchLatestVersion(versionEndpoint) {
  try {
    const response = await fetch(versionEndpoint, {
      cache: 'no-store',
    });
    const data = await response.json();
    return data.version; // Return the fetched version
  } catch (error) {
    console.error("Error fetching latest version:", error);
    return null; // Return null if there's an error
  }
}

// Append a resource (link or script) to the <head> of the document
function AppendResourceToHead(type, url) {
  const element = document.createElement(type);
  element[type === 'link' ? 'rel' : 'type'] = type === 'link' ? 'stylesheet' : 'module';
  element[type === 'link' ? 'href' : 'src'] = url;
  document.head.appendChild(element);
}

// Modify the resource URL to include the provided version
function LoadResourceWithCacheBusting(resourceUrl, version) {
  const urlWithVersion = resourceUrl.replace(/_v\d+\.\d+\.\d+/, `_v${version}`);
  return urlWithVersion; // Return the modified URL
}

// Update the resources (CSS and JS) with the provided version
function UpdateResources(version, cssResourceUrl, jsResourceUrl) {
  const newScriptSrc = LoadResourceWithCacheBusting(jsResourceUrl, version);
  const newCssHref = LoadResourceWithCacheBusting(cssResourceUrl, version);

  // Append the updated CSS and JS resources to the <head>
  AppendResourceToHead('link', newCssHref);
  AppendResourceToHead('script', newScriptSrc);
}

// Check if resources need to be updated based on the latest version
async function UpdateResourcesIfNeeded(versionEndpoint, cssResourceUrl, jsResourceUrl, localVersion, updateLocalVersion) {
  const latestVersion = await FetchLatestVersion(versionEndpoint);

  if (latestVersion && latestVersion !== localVersion) {
    // If the version is different, update resources and local version
    updateLocalVersion(latestVersion);
    UpdateResources(latestVersion, cssResourceUrl, jsResourceUrl);
  } else {
    // If the version is the same, use the original resources
    AppendResourceToHead('link', cssResourceUrl);
    AppendResourceToHead('script', jsResourceUrl);
  }
}

// Main function to load resources with versioning
function ResourceVersionLoader(options) {
  const {
    versionEndpoint,
    cssResourceUrl,
    jsResourceUrl,
    localVersion,
    updateLocalVersion,
  } = options;

  // Update resources when the page is loaded or refreshed
  window.onload = function() {
    UpdateResourcesIfNeeded(versionEndpoint, cssResourceUrl, jsResourceUrl, localVersion, updateLocalVersion);
  };
}

export default ResourceVersionLoader;
