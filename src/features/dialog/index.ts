window.Webflow ||= [];
window.Webflow.push(() => {
  setupDialog();
});

export function setupDialog() {
  const dialog = document.querySelector('dialog.dialog') as HTMLDialogElement;
  if (!dialog) return;

  const closeBtns = Array.from(dialog.querySelectorAll('[dialog-element="close"]'));

  const instanceElements = Array.from(
    dialog.querySelectorAll('[dialog-instance]')
  ) as HTMLElement[];
  if (!instanceElements.length) return;

  const instances = instanceElements.map((instanceEl) => setupInstance(instanceEl, dialog));

  // @ts-expect-error unnamed
  window.customDialog = {
    element: dialog,
    instances,
  };

  closeBtns.forEach((btn) => {
    btn.setAttribute('role', 'button');
    btn.setAttribute('tabindex', '0');
    btn.addEventListener('click', () => closeDialog(dialog));
  });

  dialog.addEventListener('click', (e) => {
    const rect = dialog.getBoundingClientRect();
    const isInDialog =
      rect.top <= e.clientY &&
      e.clientY <= rect.top + rect.height &&
      rect.left <= e.clientX &&
      e.clientX <= rect.left + rect.width;

    if (!isInDialog) closeDialog(dialog);
  });

  dialog.addEventListener('close', () => {
    closeDialog(dialog);
  });
}

function setupInstance(instanceEl: HTMLElement, dialog: HTMLDialogElement) {
  const id = instanceEl.getAttribute('id');
  if (!id) return;

  const triggers: HTMLLinkElement[] = Array.from(document.querySelectorAll(`a[href="#${id}"]`));
  if (!triggers.length) return;

  const index = Number(instanceEl.getAttribute('dialog-instance'));
  if (!index) return;

  const ariaLabel = instanceEl.getAttribute('dialog-aria');

  triggers.forEach((trigger) => setupTrigger(trigger, index, dialog));

  const instance = {
    id,
    dialog,
    triggers,
    index,
    ariaLabel,
    element: instanceEl,
  };

  return instance;
}

function setupTrigger(element: HTMLLinkElement, instanceIndex: number, dialog: HTMLDialogElement) {
  element.href = '';

  element.addEventListener('keydown', (e) => {
    e.preventDefault();
    if (e.key === 'Enter' || e.key === ' ') openDialog(instanceIndex, dialog);
  });
  element.addEventListener('click', (e) => {
    e.preventDefault();
    openDialog(instanceIndex, dialog);
  });
}

function openDialog(instanceIndex: number, dialog: HTMLDialogElement) {
  dialog.setAttribute('dialog-active', `${instanceIndex}`);
  dialog.showModal();
}

function closeDialog(dialog: HTMLDialogElement) {
  dialog.setAttribute('dialog-active', '');
  dialog.close();
}
