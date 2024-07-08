// MAKE FREE TRIAL OR TIME LIMITED PLAN EXPIRE AFTER SET TIME
/* eslint-disable @typescript-eslint/no-explicit-any */
window.Webflow ||= [];
window.Webflow.push(async () => {
  // @ts-expect-error "memberstack"
  const memberstack = window.$memberstackDom;

  const updateDate = async function () {
    const member = await memberstack.getMemberJSON();

    if (!member.data) {
      member.data = {};
    }

    if (!member.data['free-trial-date']) {
      const currentTime = new Date();
      const expirationTime = new Date(currentTime.getTime() + 168 * 60 * 60 * 1000); // Set the expiration time to 10 days (adjust as needed 168 * 60 * 60 * 1000)
      member.data['free-trial-date'] = expirationTime.toISOString();

      // Update member JSON
      await memberstack.updateMemberJSON({
        json: member.data,
      });
    }
  };

  updateDate();
});
