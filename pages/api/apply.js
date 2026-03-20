export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Método não permitido.' });
  }

  const { nome, discord, idade, personagem, historia, experiencia, regras } = req.body;

  // Basic validation
  if (!nome || !discord || !idade || !personagem || !historia || !experiencia || !regras) {
    return res.status(400).json({ message: 'Preencha todos os campos obrigatórios.' });
  }

  if (Number(idade) < 16) {
    return res.status(400).json({ message: 'Você precisa ter pelo menos 16 anos.' });
  }

  if (historia.length < 100) {
    return res.status(400).json({ message: 'A história do personagem precisa ter pelo menos 100 caracteres.' });
  }

  const webhookUrl = process.env.DISCORD_WEBHOOK_URL;

  if (!webhookUrl) {
    // In development / if webhook not configured, just log and return success
    console.log('[Allow-List] Nova candidatura (webhook não configurado):', req.body);
    return res.status(200).json({ message: 'Candidatura recebida.' });
  }

  // Build Discord embed
  const embed = {
    title: '🏙️ Nova Candidatura — Allow-List',
    color: 0xc8973a,
    fields: [
      { name: '👤 Nome Real', value: nome, inline: true },
      { name: '💬 Discord', value: discord, inline: true },
      { name: '🎂 Idade', value: String(idade), inline: true },
      { name: '🎭 Personagem', value: personagem, inline: false },
      { name: '📖 História do Personagem', value: historia.slice(0, 1024), inline: false },
      { name: '🎮 Experiência com RP', value: experiencia.slice(0, 1024), inline: false },
      { name: '✍️ Por que merece entrar', value: regras.slice(0, 1024), inline: false },
    ],
    footer: { text: 'Chicago Roleplay — Allow-List System' },
    timestamp: new Date().toISOString(),
  };

  try {
    const discordRes = await fetch(webhookUrl, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        username: 'Chicago RP | Allow-List',
        avatar_url: 'https://i.imgur.com/4M34hi2.png',
        embeds: [embed],
      }),
    });

    if (!discordRes.ok) {
      console.error('Discord webhook error:', await discordRes.text());
      return res.status(500).json({ message: 'Erro ao enviar para o Discord. Tente novamente.' });
    }

    return res.status(200).json({ message: 'Candidatura enviada com sucesso!' });
  } catch (err) {
    console.error('Webhook fetch error:', err);
    return res.status(500).json({ message: 'Erro interno. Tente novamente mais tarde.' });
  }
}
