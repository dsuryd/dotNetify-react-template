module.exports = function (callback, path, initialStates) {

   require('jsdom').env({
      file: "./wwwroot/Index.html",
      scripts: ['./bundle.js'],
      done: function (err, window) {
         if (err) {
            console.error(err);
            return;
         }
         // For debugging.
         window.console = global.console;

         // Get rid of the script inserted by jsdom after it's executed.
         var jsdomElem = window.document.getElementsByClassName("jsdom")[0];
         jsdomElem.parentElement.removeChild(jsdomElem);

         // Add the bundled library modules, window, and document to NodeJS global scope.
         Object.assign(global, window.bundle, { window: window, document: window.document });

         // Configure dotnetify's router for server-side rendering.
         dotnetify.react.router.ssr(
            path,
            initialStates,
            // On routing to a React component, use 'require' to load it into window scope.
            function (url) {
               if (url) {
                   if (url.endsWith('.js') || url.endsWith(".html")) {
                      url = "../wwwroot" + url;
                      if (url.endsWith('.js'))
                        Object.assign(window, require(url));
                   }
               }
               return url;
            },
            // After the path is routed, return the document's HTML to the caller.
            function () {
               callback(err, document.documentElement.innerHTML);
            },
            // Timeout.
            3000);

         ReactDOM.render(
            React.createElement(Index),
            window.document.getElementById('Content'));
      }
   });
};

// For debugging.
var test = module.exports;
test(function (err, output) {
   console.log(output);
},
   '/index/Page1/Page1A',
   '{"Index":{"RoutingState":{"Origin":"","Templates":[{"Id":"Home","Root":null,"UrlPattern":"","ViewUrl":null,"JSModuleUrl":null,"Target":null},{"Id":"Page1","Root":null,"UrlPattern":"Page1","ViewUrl":null,"JSModuleUrl":"/page1.js","Target":null},{"Id":"Page2","Root":null,"UrlPattern":"Page2","ViewUrl":null,"JSModuleUrl":"/page2.js","Target":null},{"Id":"Page3","Root":null,"UrlPattern":"Page3","ViewUrl":"/page3.html","JSModuleUrl":null,"Target":null}],"Root":"index","Active":null},"Links":[{"Title":"Page 1","Route":{"TemplateId":"Page1","Path":"Page1","RedirectRoot":null}},{"Title":"Page 2","Route":{"TemplateId":"Page2","Path":"Page2","RedirectRoot":null}},{"Title":"Page 3","Route":{"TemplateId":"Page3","Path":"Page3","RedirectRoot":null}}]},"Page1":{"RoutingState":{"Origin":"Page1","Templates":[{"Id":"Page1Home","Root":null,"UrlPattern":"","ViewUrl":"Page1A","JSModuleUrl":null,"Target":null},{"Id":"Page1A","Root":null,"UrlPattern":"Page1A","ViewUrl":null,"JSModuleUrl":null,"Target":null},{"Id":"Page1B","Root":null,"UrlPattern":"Page1B","ViewUrl":null,"JSModuleUrl":null,"Target":null}],"Root":"Page1","Active":null},"Title":"Page 1","LinkPage1A":{"TemplateId":"Page1A","Path":"Page1A","RedirectRoot":null},"LinkPage1B":{"TemplateId":"Page1B","Path":"Page1B","RedirectRoot":null}}}'
);
