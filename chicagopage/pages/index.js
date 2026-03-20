import { useState } from 'react';
import Head from 'next/head';
import styles from './index.module.css';

const LEGEND = [
  { prefix: '—',  color: '#ffffff', label: 'fala normal' },
  { prefix: '*',  color: '#c084fc', label: '/me e /do' },
  { prefix: '((',  color: '#94a3b8', label: 'OOC' },
  { prefix: '#',  color: '#7dd3fc', label: 'ligação' },
  { prefix: '!',  color: '#f87171', label: 'sistema' },
];

const FIELDS = [
  { id: 'nome',        label: 'Nome Real',               placeholder: 'Seu nome real',                                                    type: 'text',     required: true },
  { id: 'discord',     label: 'Discord',                  placeholder: 'usuario ou @usuario',                                              type: 'text',     required: true },
  { id: 'idade',       label: 'Idade',                    placeholder: 'Sua idade',                                                        type: 'number',   required: true, min: 16 },
  { id: 'personagem',  label: 'Nome do Personagem',       placeholder: 'Como seu personagem será chamado',                                 type: 'text',     required: true },
  { id: 'historia',    label: 'História do Personagem',   placeholder: 'Conte a origem e motivação do seu personagem (mín. 100 chars)...', type: 'textarea', required: true, minLength: 100 },
  { id: 'experiencia', label: 'Experiência com Roleplay', placeholder: 'Já participou de outros servidores? Qual seu nível?',              type: 'textarea', required: true },
  { id: 'motivacao',   label: 'Por que você deve entrar?', placeholder: 'Nos convença por que você merece uma vaga...',                    type: 'textarea', required: true },
  { id: 'chatlog',     label: 'Chatlog da Cena — Interpretação', placeholder: 'Interprete a cena usando:\n— fala normal\n* ação /me\n(( OOC ))\n# ligação\n! sistema', type: 'chatlog', required: true, minLength: 80 },
];

export default function Home() {
  const [form, setForm] = useState({});
  const [status, setStatus] = useState('idle');
  const [errorMsg, setErr] = useState('');

  const onChange = (e) => setForm((p) => ({ ...p, [e.target.id]: e.target.value }));

  const onSubmit = async (e) => {
    e.preventDefault();
    setStatus('loading');
    setErr('');
    try {
      const res = await fetch('/api/apply', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.message || 'Erro ao enviar.');
      setStatus('success');
    } catch (err) {
      setStatus('error');
      setErr(err.message);
    }
  };

  return (
    <>
      <Head>
        <title>Chicago Roleplay — Allow-List</title>
        <meta name="description" content="Solicite sua vaga no servidor Chicago RP." />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>
      <div className={styles.page}>

        <header className={styles.topbar}>
          <div className={styles.topbarLogo}>
            <span className={styles.logoBox}>CT</span>
            <div>
              <div className={styles.logoTitle}>CHICAGO <span className={styles.logoSub}>Tools RP</span></div>
              <div className={styles.logoTagline}>ALLOW-LIST SYSTEM</div>
            </div>
          </div>
          <div className={styles.topbarLine} />
        </header>

        <section className={styles.hero}>
          <div className={styles.heroGrid} />
          <div className={styles.heroBg} />
          <div className={styles.heroContent}>
            <h1 className={styles.title}>
              <span className={styles.t1}>CHICAGO</span>
              <span className={styles.t2}>ROLEPLAY</span>
            </h1>
            <p className={styles.subtitle}>A cidade nunca dorme — e nem suas ambições.<br />Solicite sua vaga e faça parte da história.</p>
            <div className={styles.stats}>
              <div className={styles.stat}><span>800+</span><small>Membros</small></div>
              <div className={styles.statDiv} />
              <div className={styles.stat}><span>24/7</span><small>Online</small></div>
              <div className={styles.statDiv} />
              <div className={styles.stat}><span>RP</span><small>Sério</small></div>
            </div>
          </div>
          <div className={styles.scrollHint}>▼</div>
        </section>

        <div className={styles.infoStrip}>
          {[['⚠️','Idade mínima:','16 anos'],['⏱️','Análise em até:','48 horas'],['📋','Leia as','regras do servidor']].map(([icon,pre,strong]) => (
            <div className={styles.infoItem} key={pre}><span>{icon}</span><span>{pre} <strong>{strong}</strong></span></div>
          ))}
        </div>

        <main className={styles.main}>
          <div className={styles.formWrap}>
            <div className={styles.formHeader}>
              <div className={styles.fhLine} /><h2>FORMULÁRIO DE ALLOW-LIST</h2><div className={styles.fhLine} />
            </div>

            {status === 'success' ? (
              <div className={styles.successBox}>
                <div className={styles.successIcon}>✓</div>
                <h3>Candidatura Enviada!</h3>
                <p>Nossa equipe irá analisar e você receberá retorno via Discord em até <strong>48 horas</strong>.</p>
                <button className={styles.resetBtn} onClick={() => { setStatus('idle'); setForm({}); }}>Enviar outra candidatura</button>
              </div>
            ) : (
              <form className={styles.form} onSubmit={onSubmit} autoComplete="off">
                {FIELDS.map((field) => (
                  <div className={styles.fieldGroup} key={field.id}>
                    <label htmlFor={field.id} className={styles.label}>
                      {field.label}{field.required && <span className={styles.req}>*</span>}
                    </label>
                    {field.type === 'chatlog' ? (
                      <div className={styles.chatlogBlock}>
                        <div className={styles.sceneWrap}>
                          <img src="/scene.png" alt="Cena para interpretar" className={styles.sceneImg} />
                          <div className={styles.sceneOverlay}><span>📷 Interprete esta cena em chatlog</span></div>
                        </div>
                        <div className={styles.legend}>
                          {LEGEND.map(({ prefix, color, label }) => (
                            <div className={styles.legendItem} key={prefix}>
                              <span className={styles.legendBadge} style={{ color, borderColor: color+'50', background: color+'18' }}>{prefix}</span>
                              <span className={styles.legendLabel}>{label}</span>
                            </div>
                          ))}
                        </div>
                        <textarea id={field.id} className={styles.chatlogTextarea} placeholder={field.placeholder} required={field.required} minLength={field.minLength} rows={10} value={form[field.id]||''} onChange={onChange} />
                      </div>
                    ) : field.type === 'textarea' ? (
                      <textarea id={field.id} className={styles.textarea} placeholder={field.placeholder} required={field.required} minLength={field.minLength} rows={5} value={form[field.id]||''} onChange={onChange} />
                    ) : (
                      <input id={field.id} type={field.type} className={styles.input} placeholder={field.placeholder} required={field.required} min={field.min} value={form[field.id]||''} onChange={onChange} />
                    )}
                  </div>
                ))}
                {status === 'error' && <div className={styles.errorBox}>⚠ {errorMsg}</div>}
                <button type="submit" className={styles.submitBtn} disabled={status === 'loading'}>
                  {status === 'loading' ? <span className={styles.loader} /> : 'ENVIAR CANDIDATURA'}
                </button>
              </form>
            )}
          </div>
        </main>

        <footer className={styles.footer}>
          <p>© {new Date().getFullYear()} Chicago Roleplay · Todos os direitos reservados</p>
          <p className={styles.footerMono}>FiveM · Roleplay Sério · Brasil</p>
        </footer>
      </div>
    </>
  );
}
