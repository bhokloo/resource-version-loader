async function FetchLatestVersion(versionEndpoint) {
  try {
    const response = await fetch(versionEndpoint, {
      cache: 'no-store',
    });
    const data = await response.json();
    return data.version;
  } catch (error) {
    console.error("Error fetching latest version:", error);
    return null;
  }
}

function AppendResourceToHead(type, url) {
  const element = document.createElement(type);
  element[type === 'link' ? 'rel' : 'type'] = type === 'link' ? 'stylesheet' : 'module';
  element[type === 'link' ? 'href' : 'src'] = url;
  document.head.appendChild(element);
}

function LoadResourceWithCacheBusting(resourceUrl, version) {
  return `${resourceUrl}?v=${version}`;
}

function UpdateResources(version, cssResourceUrl, jsResourceUrl) {
  const newScriptSrc = LoadResourceWithCacheBusting(jsResourceUrl, version);
  const newCssHref = LoadResourceWithCacheBusting(cssResourceUrl, version);

  AppendResourceToHead('link', newCssHref);
  AppendResourceToHead('script', newScriptSrc);
}

async function UpdateResourcesIfNeeded(versionEndpoint, cssResourceUrl, jsResourceUrl, localVersion, updateLocalVersion) {
  const latestVersion = await FetchLatestVersion(versionEndpoint);

  if (latestVersion && latestVersion !== localVersion) {
    updateLocalVersion(latestVersion);
    UpdateResources(latestVersion, cssResourceUrl, jsResourceUrl);
  }
}

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
