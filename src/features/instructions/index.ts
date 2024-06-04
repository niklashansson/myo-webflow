import { setupDialog } from '../dialog';

// @ts-expect-error expected
window.fsAttributes = window.fsAttributes || [];
// @ts-expect-error expected
window.fsAttributes.push([
  'cmsload',
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  (listInstances: any) => {
    // The callback passes a `listInstances` array with all the `CMSList` instances on the page.
    const [listInstance] = listInstances;

    // The `renderitems` event runs whenever the list renders items after switching pages.
    listInstance.on('renderitems', () => {
      setupDialog();
    });
  },
]);
