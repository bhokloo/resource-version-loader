**Dynamic Resource Loader** 🔄

The **Dynamic Resource Loader** is an NPM package that simplifies the management and updating of CSS and JavaScript resources on your website, all driven by version changes. This powerful package offers a versatile solution for loading resources with cache busting, ensuring that your website always delivers the most up-to-date versions from the server.

**Features** 🌟

- Seamless integration into your projects.
- Customizable configuration for version endpoint, CSS URL, and JavaScript URL.
- Efficient cache busting mechanism guarantees the use of updated resources.
- Automatic resource updates triggered by version changes.

**Installation** 💻

To get started with the Dynamic Resource Loader package, simply use the following command:

```
npm install resource-version-loader
```

**Usage** 🚀

1. **Import the package**:

   ```typescript
   import dynamicResourceLoader from "resource-version-loader";
   ```

2. **Configure the package options**:

   ```typescript
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
   - The `versionEndpoint` URL should furnish a JSON response containing the most recent version:

   ```typescript
   {
   "version": "1.0.0"
   }

   // Library Usage
   const response = await fetch(versionEndpoint);
   const data = await response.json();
   const version = data.version;
   ```

   - Replace `YOUR_CSS_URL_HERE`, `YOUR_JS_URL_HERE`, and `YOUR_LOCAL_VERSION` with their respective values.
   - The `localVersion` ensures the integrity of the local cache, preventing unnecessary cache clearing unless a new version is obtainable.
   - Utilize the `updateLocalVersion` function to keep your local version up to date, ensuring synchronization between your resources and the endpoint.

3. **Invoke the dynamicResourceLoader function** with the specified options:

   ```typescript
   dynamicResourceLoader(resourceLoaderOptions);
   ```
