<h1>Resource Version Loader 🔄</h1>

<h3>NPM Link: https://www.npmjs.com/package/resource-version-loader 🔗</h3>

The **Resource Version Loader** is an NPM package that simplifies the management and updating of CSS and JavaScript resources on your website, all driven by version changes. This powerful package offers a versatile solution for loading resources with cache busting, ensuring that your website always delivers the most up-to-date versions from the server.

<h3>Features 🌟</h3>

- Seamless integration into your projects.
- Customizable configuration for version endpoint, CSS URL, and JavaScript URL.
- Efficient cache busting mechanism guarantees the use of updated resources.
- Automatic resource updates triggered by version changes.

<h3>Installation 💻</h3>

To get started with the Resource Version Loader package, simply use the following command:

```
npm install resource-version-loader
```

<h3>Usage 🚀</h3>

1. **Import the package**:

   ```js
   import ResourceVersionLoader from "resource-version-loader";
   ```

2. **Configure the package options**:

   ```js
   const resourceLoaderOptions = {
     versionEndpoint: "https://example.com/versioning.json", // Endpoint to fetch the latest version
     cssResourceUrl: "YOUR_CSS_URL_HERE", // CSS URL with the current version
     jsResourceUrl: "YOUR_JS_URL_HERE", // JS URL with the current version
     localVersion: "YOUR_LOCAL_VERSION", // Local version maintained by parent
     updateLocalVersion: (version: string) => {
       // Your code to update local version
     },
   };
   ```

   **Note** 🌟

   - Use the actual API endpoint in place of `versionEndpoint`.
   - The `versionEndpoint` URL should furnish a JSON response containing the most recent version.

   ```js
   {
   "version": "1.0.0"
   }

   // Library Usage
   const response = await fetch(versionEndpoint);
   const data = await response.json();
   const version = data.version;
   ```

   - The `localVersion` ensures the integrity of the local cache, preventing unnecessary cache clearing unless a new version is obtainable.
   - Utilize the `updateLocalVersion` function to keep your local version up to date, ensuring synchronization between your resources and the endpoint.

3. **Invoke the ResourceVersionLoader function** with the specified options:

   ```js
   ResourceVersionLoader(resourceLoaderOptions);
   ```
<h1>Sample 👍</h1>

<h3>Updating Resources in React ⚛️</h3>

```js
//local-verison.js
export const LocalVersion = {
  web_component_one: "0.0.1",
};
```

```ts
import ResourceVersionLoader from "resource-version-loader";
import { LocalVersion } from "./path-to-local-version";

const SampleComponent = () => {
  const LocalVersion = {
    web_component_one: "0.0.1", //sample
  };

  const resourceLoaderOptions = {
    versionEndpoint: "https://sample-website.com/versioning.json", // Endpoint to fetch the latest version
    cssResourceUrl: `https://sample-website.com/web-component/js/index_v${LocalVersion.web_component_one}.css`, // CSS URL with curr version
    jsResourceUrl: `https://sample-website.com/web-component/css/style_v${LocalVersion.web_component_one}.js`, // JS with curr version
    localVersion: LocalVersion.web_component_one,
    updateLocalVersion: (version: string) => {
      // callback function to update your LocalVersion.
    },
  };

  useEffect(() => ResourceVersionLoader(resourceLoaderOptions), []);

  return <web-component />;
};
export default SampleComponent;
```

<h3>Updating Resources in Websites 🌐</h3>

```html
<!DOCTYPE html>
<html lang="en">
  <script type="module">
    import ResourceVersionLoader from "https://cdn.jsdelivr.net/gh/bhokloo/resource-version-loader@v1.0.0/index.js";
    import { LocalVersion } from "./path-to-local-version";

    const resourceLoaderOptions = {
      versionEndpoint: "https://sample-website.com/versioning.json", // Endpoint to fetch the latest version
      cssResourceUrl: `https://sample-website.com/web-component/js/index_v${LocalVersion.web_component_one}.css`, // CSS URL with curr version
      jsResourceUrl: `https://sample-website.com/web-component/css/style_v${LocalVersion.web_component_one}.js`, // JS with curr version
      localVersion: LocalVersion.web_component_one,
      updateLocalVersion: (version) => {
        // callback function to update your LocalVersion.
      },
    };
    ResourceVersionLoader(resourceLoaderOptions);
  </script>
  <body>
    <web-component />
  </body>
</html>
```

_Thank you._ 😊
