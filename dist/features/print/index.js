"use strict";
(() => {
  // bin/live-reload.js
  new EventSource(`${"http://localhost:3000"}/esbuild`).addEventListener("change", () => location.reload());

  // src/features/print/index.ts
  window.Webflow ||= [];
  window.Webflow.push(() => {
    const printContents = document.querySelector('[print-element="content"]');
    if (!printContents)
      return;
    console.log(printContents);
    const printTriggers = document.querySelectorAll('[print-element="trigger"]');
    if (!printTriggers.length)
      return;
    const triggerPrint = () => print(printContents);
    printTriggers.forEach((trigger) => trigger.addEventListener("click", () => window.print()));
    window.print();
  });
  function print(content) {
    const originalContents = document.body.innerHTML;
    const printContents = content.innerHTML;
    document.body.innerHTML = printContents;
    window.print();
    document.body.innerHTML = originalContents;
  }
})();
//# sourceMappingURL=index.js.map
