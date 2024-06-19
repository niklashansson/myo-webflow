"use strict";
(() => {
  // bin/live-reload.js
  new EventSource(`${"http://localhost:3000"}/esbuild`).addEventListener("change", () => location.reload());

  // src/features/dialog/index.ts
  window.Webflow ||= [];
  window.Webflow.push(() => {
    setupDialog();
  });
  function setupDialog() {
    const dialog = document.querySelector("dialog.dialog");
    if (!dialog)
      return;
    const closeBtns = Array.from(dialog.querySelectorAll('[dialog-element="close"]'));
    const instanceElements = Array.from(
      dialog.querySelectorAll("[dialog-instance]")
    );
    if (!instanceElements.length)
      return;
    const instances = instanceElements.map((instanceEl) => setupInstance(instanceEl, dialog));
    window.customDialog = {
      element: dialog,
      instances
    };
    closeBtns.forEach((btn) => {
      btn.setAttribute("role", "button");
      btn.setAttribute("tabindex", "0");
      btn.addEventListener("click", () => closeDialog(dialog));
    });
    dialog.addEventListener("click", (e) => {
      const rect = dialog.getBoundingClientRect();
      const isInDialog = rect.top <= e.clientY && e.clientY <= rect.top + rect.height && rect.left <= e.clientX && e.clientX <= rect.left + rect.width;
      if (!isInDialog)
        closeDialog(dialog);
    });
    dialog.addEventListener("close", () => {
      closeDialog(dialog);
    });
  }
  function setupInstance(instanceEl, dialog) {
    const id = instanceEl.getAttribute("id");
    if (!id)
      return;
    const triggers = Array.from(document.querySelectorAll(`a[href="#${id}"]`));
    if (!triggers.length)
      return;
    const index = Number(instanceEl.getAttribute("dialog-instance"));
    if (!index)
      return;
    const ariaLabel = instanceEl.getAttribute("dialog-aria");
    triggers.forEach((trigger) => setupTrigger(trigger, index, dialog));
    const instance = {
      id,
      dialog,
      triggers,
      index,
      ariaLabel,
      element: instanceEl
    };
    return instance;
  }
  function setupTrigger(element, instanceIndex, dialog) {
    element.href = "";
    element.addEventListener("keydown", (e) => {
      e.preventDefault();
      if (e.key === "Enter" || e.key === " ")
        openDialog(instanceIndex, dialog);
    });
    element.addEventListener("click", (e) => {
      e.preventDefault();
      openDialog(instanceIndex, dialog);
    });
  }
  function openDialog(instanceIndex, dialog) {
    dialog.setAttribute("dialog-active", `${instanceIndex}`);
    dialog.showModal();
  }
  function closeDialog(dialog) {
    dialog.setAttribute("dialog-active", "");
    dialog.close();
  }

  // src/features/instructions/index.ts
  window.fsAttributes = window.fsAttributes || [];
  window.fsAttributes.push([
    "cmsload",
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    (listInstances) => {
      const [listInstance] = listInstances;
      listInstance.on("renderitems", () => {
        setupDialog();
      });
    }
  ]);
})();
//# sourceMappingURL=index.js.map
