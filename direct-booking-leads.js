(() => {
  const ENDPOINT = 'https://script.google.com/macros/s/AKfycbw3HssY-YtA4mg8D8lksZwf8_IWIcJBDNAU1pbE7IXdImbzhyZo6sFxVmRiMxvWiKk1/exec';

  document.querySelectorAll('.guest-stay-again-form').forEach(form => {
    const button = form.querySelector('button[type="submit"]');
    const status = form.querySelector('.stay-again-status');

    form.addEventListener('submit', async event => {
      event.preventDefault();
      if (!form.reportValidity()) return;

      const firstName = form.elements.first_name.value.trim();
      const email = form.elements.email.value.trim();
      const property = form.dataset.property || document.title;

      button.disabled = true;
      button.textContent = 'Saving…';
      if (status) status.textContent = '';

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
        if (status) status.textContent = 'Done — we’ve saved your details for direct booking access next time.';
      } catch (error) {
        button.disabled = false;
        button.textContent = 'Get direct booking access';
        if (status) status.textContent = 'That didn’t go through. Please try again.';
      }
    });
  });
})();
