1. remove the following code from \_document.tsx:

```
if (process.env.NODE_ENV !== 'production') {
      i18n?.reloadResources(locale);
    }
```

on favour of: reloadOnPrerender = true

2. move RTL_LANGUAGES to the constants file
3. replace AppProviders with QueryProvider at \_app.tsx
4. use alias `@/*` for all our local imports to avoid `node_modules` conflicts
5. use `import type` for all our type imports.

//FIXME:

1. Logout redirection from authorized routes
2. Address Form Type Selection Issue
3. Remove Selected Address if new User is Logged In (from LocalStorage)
4. Remove Address Delete from Checkout Page and move it to Profile Page
5. Accounts pages design should improve at least a container with
6. We need to make a Paper component for the Checkout and Profile Page
