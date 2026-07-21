export default async function handler(req, res) {
  const clientId = process.env.OAUTH_GITHUB_CLIENT_ID;
  const clientSecret = process.env.OAUTH_GITHUB_CLIENT_SECRET;
  const code = req.query?.code;

  if (!clientId || !clientSecret) {
    res.status(500).send('Faltan configurar OAUTH_GITHUB_CLIENT_ID / OAUTH_GITHUB_CLIENT_SECRET en Vercel.');
    return;
  }
  if (!code) {
    res.status(400).send('Falta el parámetro "code" en la respuesta de GitHub.');
    return;
  }

  try {
    const tokenRes = await fetch('https://github.com/login/oauth/access_token', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
      body: JSON.stringify({ client_id: clientId, client_secret: clientSecret, code }),
    });
    const tokenData = await tokenRes.json();

    if (tokenData.error) {
      res.status(400).send(`Error de GitHub: ${tokenData.error_description || tokenData.error}`);
      return;
    }

    const token = tokenData.access_token;
    const payload = JSON.stringify({ token, provider: 'github' });

    const html = `<!doctype html><html><body>
<script>
(function() {
  function receiveMessage(e) {
    window.opener.postMessage('authorization:github:success:' + ${JSON.stringify(payload)}, e.origin);
    window.removeEventListener('message', receiveMessage, false);
  }
  window.addEventListener('message', receiveMessage, false);
  window.opener.postMessage('authorizing:github', '*');
})();
</script>
</body></html>`;

    res.setHeader('Content-Type', 'text/html');
    res.status(200).send(html);
  } catch (err) {
    res.status(500).send('Error de autenticación: ' + err.message);
  }
}
