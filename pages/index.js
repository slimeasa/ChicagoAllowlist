import { useState } from 'react';
import Head from 'next/head';
import styles from './index.module.css';

const FIELDS = [
  { id: 'nome', label: 'Nome Completo', placeholder: 'Seu nome real', type: 'text', required: true },
  { id: 'discord', label: 'Discord', placeholder: 'usuario#0000 ou @usuario', type: 'text', required: true },
  { id: 'idade', label: 'Idade', placeholder: 'Sua idade', type: 'number', required: true, min: 16 },
  { id: 'personagem', label: 'Nome do Personagem', placeholder: 'Como seu personagem será chamado', type: 'text', required: true },
  {
    id: 'historia',
    label: 'História do Personagem',
    placeholder: 'Conte a origem e motivação do seu personagem (mín. 100 caracteres)...',
    type: 'textarea',
    required: true,
    minLength: 100,
  },
  {
    id: 'experiencia',
    label: 'Experiência com Roleplay',
    placeholder: 'Você já participou de outros servidores? Qual seu nível de experiência?',
    type: 'textarea',
    required: true,
  },
  {
    id: 'regras',
    label: 'Por que você deve entrar no Chicago RP?',
    placeholder: 'Nos convença por que você merece uma vaga...',
    type: 'textarea',
    required: true,
  },
];

export default function Home() {
  const [form, setForm] = useState({});
  const [status, setStatus] = useState('idle'); // idle | loading | success | error
  const [errorMsg, setErrorMsg] = useState('');

  const handleChange = (e) => {
    setForm((prev) => ({ ...prev, [e.target.id]: e.target.value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus('loading');
    setErrorMsg('');

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
      setErrorMsg(err.message);
    }
  };

  return (
    <>
      <Head>
        <title>Chicago Roleplay — Allow-List</title>
        <meta name="description" content="Solicite sua vaga no servidor de roleplay mais imersivo do Brasil." />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>

      <div className={styles.page}>
        {/* ── HERO ── */}
        <header className={styles.hero}>
          <div className={styles.heroGrid} />
          <div className={styles.heroBg} />
          <div className={styles.heroContent}>
            <div className={styles.badge}>🏙️ FiveM Roleplay</div>
            <h1 className={styles.title}>
              <span className={styles.titleLine1}>CHICAGO</span>
              <span className={styles.titleLine2}>ROLEPLAY</span>
            </h1>
            <p className={styles.subtitle}>
              A cidade nunca dorme — e nem suas ambições.<br />
              Solicite sua vaga na allow-list e faça parte da história.
            </p>
            <div className={styles.stats}>
              <div className={styles.stat}><span>500+</span><small>Membros</small></div>
              <div className={styles.statDivider} />
              <div className={styles.stat}><span>24/7</span><small>Online</small></div>
              <div className={styles.statDivider} />
              <div className={styles.stat}><span>RP</span><small>Sério</small></div>
            </div>
          </div>
          <div className={styles.scrollHint}>▼</div>
        </header>

        {/* ── INFO STRIP ── */}
        <section className={styles.infoStrip}>
          <div className={styles.infoItem}>
            <span className={styles.infoIcon}>⚠️</span>
            <span>Idade mínima: <strong>16 anos</strong></span>
          </div>
          <div className={styles.infoItem}>
            <span className={styles.infoIcon}>⏱️</span>
            <span>Análise em até <strong>48 horas</strong></span>
          </div>
          <div className={styles.infoItem}>
            <span className={styles.infoIcon}>📋</span>
            <span>Leia as <strong>regras do servidor</strong> antes</span>
          </div>
        </section>

        {/* ── FORM ── */}
        <main className={styles.main}>
          <div className={styles.formContainer}>
            <div className={styles.formHeader}>
              <div className={styles.formHeaderLine} />
              <h2>FORMULÁRIO DE ALLOW-LIST</h2>
              <div className={styles.formHeaderLine} />
            </div>

            {status === 'success' ? (
              <div className={styles.successBox}>
                <div className={styles.successIcon}>✓</div>
                <h3>Candidatura Enviada!</h3>
                <p>
                  Sua solicitação foi recebida com sucesso. Nossa equipe irá analisá-la e
                  você receberá um retorno via Discord em até <strong>48 horas</strong>.
                </p>
                <button className={styles.resetBtn} onClick={() => { setStatus('idle'); setForm({}); }}>
                  Enviar outra candidatura
                </button>
              </div>
            ) : (
              <form className={styles.form} onSubmit={handleSubmit} autoComplete="off">
                {FIELDS.map((field) => (
                  <div className={styles.fieldGroup} key={field.id}>
                    <label htmlFor={field.id} className={styles.label}>
                      {field.label}
                      {field.required && <span className={styles.req}>*</span>}
                    </label>
                    {field.type === 'textarea' ? (
                      <textarea
                        id={field.id}
                        className={styles.textarea}
                        placeholder={field.placeholder}
                        required={field.required}
                        minLength={field.minLength}
                        rows={5}
                        value={form[field.id] || ''}
                        onChange={handleChange}
                      />
                    ) : (
                      <input
                        id={field.id}
                        type={field.type}
                        className={styles.input}
                        placeholder={field.placeholder}
                        required={field.required}
                        min={field.min}
                        value={form[field.id] || ''}
                        onChange={handleChange}
                      />
                    )}
                  </div>
                ))}

                {status === 'error' && (
                  <div className={styles.errorBox}>⚠ {errorMsg}</div>
                )}

                <button
                  type="submit"
                  className={styles.submitBtn}
                  disabled={status === 'loading'}
                >
                  {status === 'loading' ? (
                    <span className={styles.loader} />
                  ) : (
                    'ENVIAR CANDIDATURA'
                  )}
                </button>
              </form>
            )}
          </div>
        </main>

        {/* ── FOOTER ── */}
        <footer className={styles.footer}>
          <p>© {new Date().getFullYear()} Chicago Roleplay · Todos os direitos reservados</p>
          <p className={styles.footerMuted}>FiveM · Roleplay Sério · Brasil</p>
        </footer>
      </div>
    </>
  );
}
