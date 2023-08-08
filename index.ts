async function fetchLatestVersion(versionEndpoint: string): Promise<string | null> {
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
  
  function appendResourceToHead(type: 'link' | 'script', url: string) {
    const element = document.createElement(type);
    element[type === 'link' ? 'rel' : 'type'] = type === 'link' ? 'stylesheet' : 'module';
    element[type === 'link' ? 'href' : 'src'] = url;
    document.head.appendChild(element);
  }
  
  function loadResourceWithCacheBusting(resourceUrl: string, version: string) {
    return `${resourceUrl}?v=${version}`;
  }
  
  function updateResources(version: string, cssResourceUrl: string, jsResourceUrl: string) {
    const newScriptSrc = loadResourceWithCacheBusting(jsResourceUrl, version);
    const newCssHref = loadResourceWithCacheBusting(cssResourceUrl, version);
  
    appendResourceToHead('link', newCssHref);
    appendResourceToHead('script', newScriptSrc);
  }
  
  async function updateResourcesIfNeeded(
    versionEndpoint: string,
    cssResourceUrl: string,
    jsResourceUrl: string,
    localVersion: string,
    updateLocalVersion: (version: string) => void
  ) {
    const latestVersion = await fetchLatestVersion(versionEndpoint);
  
    if (latestVersion && latestVersion !== localVersion) {
      updateLocalVersion(latestVersion);
      updateResources(latestVersion, cssResourceUrl, jsResourceUrl);
    }
  }
  
  interface ResourceVersionLoaderOptions {
    versionEndpoint: string;
    cssResourceUrl: string;
    jsResourceUrl: string;
    localVersion: string;
    updateLocalVersion: (version: string) => void;
  }
  
  function resourceVersionLoader(options: ResourceVersionLoaderOptions) {
    const {
      versionEndpoint,
      cssResourceUrl,
      jsResourceUrl,
      localVersion,
      updateLocalVersion,
    } = options;
  
    // Update resources when the page is loaded or refreshed
    window.onload = () => {
      updateResourcesIfNeeded(versionEndpoint, cssResourceUrl, jsResourceUrl, localVersion, updateLocalVersion);
    };
  }
  
  export default resourceVersionLoader;
  