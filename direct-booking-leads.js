(() => {
  const ENDPOINT = 'https://script.google.com/macros/s/AKfycbw3HssY-YtA4mg8D8lksZwf8_IWIcJBDNAU1pbE7IXdImbzhyZo6sFxVmRiMxvWiKk1/exec';

  document.querySelectorAll('.guest-stay-again-form').forEach(form => {
    const button = form.querySelector('button');
    if (!button) return;

    button.type = 'submit';
    const firstNameInput = form.elements.first_name;
    const emailInput = form.elements.email;
    if (firstNameInput) firstNameInput.required = true;
    if (emailInput) emailInput.required = true;

    let status = form.querySelector('.stay-again-status');
    if (!status) {
      status = document.createElement('p');
      status.className = 'stay-again-status';
      status.setAttribute('aria-live', 'polite');
      status.style.gridColumn = '1 / -1';
      status.style.margin = '0';
      status.style.fontSize = '12.5px';
      status.style.lineHeight = '1.55';
      button.insertAdjacentElement('afterend', status);
    }

    const property = document.body.classList.contains('darlinghurst-guest-page')
      ? '#17 on Victoria – Darlinghurst'
      : document.body.classList.contains('surry-hills-guest-page')
        ? 'Excelsior on Elizabeth – Surry Hills'
        : document.title;

    form.addEventListener('submit', async event => {
      event.preventDefault();
      if (!form.reportValidity()) return;

      const firstName = firstNameInput.value.trim();
      const email = emailInput.value.trim();
      const originalText = 'Get direct booking access';

      button.disabled = true;
      button.textContent = 'Saving…';
      status.textContent = '';

      const body = new URLSearchParams({
        first_name: firstName,
        email,
        property,
        page_url: window.location.href,
        source: 'Guest guide – Stay again',
        website: ''
      });

      try {
        await fetch(ENDPOINT, {
          method: 'POST',
          mode: 'no-cors',
          headers: {'Content-Type': 'application/x-www-form-urlencoded'},
          body: body.toString()
        });

        form.reset();
        button.textContent = 'You’re on the list ✓';
        status.textContent = 'Done — we’ve saved your details for direct booking access next time.';
      } catch (error) {
        button.disabled = false;
        button.textContent = originalText;
        status.textContent = 'That didn’t go through. Please try again.';
      }
    });
  });
})();
