window.Webflow ||= [];
window.Webflow.push(() => {
  // @ts-expect-error "memberstack"
  const memberstack = window.$memberstackDom;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  memberstack.getCurrentMember().then((member: any) => {
    if (member.data) {
      const activePlanId = member.data.planConnections[0].payment.priceId;
      if (!activePlanId) return;

      const planBtns = document.querySelectorAll('.membership_item a');
      planBtns.forEach((btn) => {
        const id = btn.getAttribute('data-ms-price:update');

        if (id === activePlanId) {
          btn.classList.add('is-active-plan');
          btn.textContent = 'Din nuvarande plan';
          btn.removeAttribute('data-ms-price:update');

          const container = btn.closest('.membership_item');

          if (!container) return;
          container.classList.add('is-current-plan');
        }
      });
    }
  });
});
