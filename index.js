.page { min-height: 100vh; display: flex; flex-direction: column; }

/* TOPBAR */
.topbar {
  width: 100%; background: var(--navy);
  border-bottom: 2px solid var(--yellow);
  padding: 0 32px; height: 58px;
  display: flex; align-items: center; gap: 16px;
  position: sticky; top: 0; z-index: 100;
}
.topbarLogo { display: flex; align-items: center; gap: 12px; }
.logoBox {
  background: var(--yellow); border-radius: 7px;
  width: 38px; height: 38px; flex-shrink: 0;
  display: flex; align-items: center; justify-content: center;
  font-weight: 900; font-size: 13px; color: var(--navy);
  font-family: 'Arial Black', sans-serif;
  box-shadow: 0 0 14px rgba(245,197,0,0.35);
}
.logoTitle {
  font-family: 'Arial Black', sans-serif;
  font-size: 15px; font-weight: 900;
  letter-spacing: 3px; color: var(--yellow); line-height: 1.1;
}
.logoSub { color: rgba(255,255,255,0.3); font-weight: 400; font-size: 10px; letter-spacing: 2px; font-family: sans-serif; }
.logoTagline { font-size: 7px; letter-spacing: 4px; color: var(--muted); }
.topbarLine { flex: 1; height: 1px; background: linear-gradient(90deg, rgba(245,197,0,0.3), transparent); }

/* HERO */
.hero {
  position: relative; min-height: 88vh;
  display: flex; flex-direction: column;
  align-items: center; justify-content: center;
  overflow: hidden; padding: 2rem; text-align: center;
}
.heroGrid {
  position: absolute; inset: 0;
  background-image:
    linear-gradient(rgba(245,197,0,0.06) 1px, transparent 1px),
    linear-gradient(90deg, rgba(245,197,0,0.06) 1px, transparent 1px);
  background-size: 55px 55px;
  animation: gridPan 18s linear infinite;
  mask-image: radial-gradient(ellipse 80% 80% at 50% 50%, black 30%, transparent 100%);
}
@keyframes gridPan { to { transform: translateY(55px); } }
.heroBg {
  position: absolute; inset: 0;
  background: radial-gradient(ellipse 55% 40% at 50% 60%, rgba(245,197,0,0.1) 0%, transparent 70%);
  pointer-events: none;
}
.heroContent { position: relative; z-index: 2; animation: fadeUp 0.9s ease both; }
@keyframes fadeUp { from { opacity:0; transform:translateY(28px); } to { opacity:1; transform:translateY(0); } }

.title { display: flex; flex-direction: column; line-height: 0.88; margin-bottom: 1.4rem; }
.t1 {
  font-family: 'Bebas Neue', sans-serif;
  font-size: clamp(5rem, 18vw, 12rem);
  letter-spacing: 0.05em; color: #fff;
  animation: fadeUp 0.9s 0.15s ease both;
}
.t2 {
  font-family: 'Bebas Neue', sans-serif;
  font-size: clamp(5rem, 18vw, 12rem);
  letter-spacing: 0.05em; color: var(--yellow);
  text-shadow: 0 0 60px rgba(245,197,0,0.35);
  animation: fadeUp 0.9s 0.25s ease both;
}
.subtitle {
  font-size: clamp(0.9rem, 2vw, 1.1rem);
  color: var(--muted2); line-height: 1.75;
  max-width: 480px; margin: 0 auto 2.5rem;
  animation: fadeUp 0.9s 0.35s ease both;
}
.stats { display: flex; align-items: center; justify-content: center; gap: 1.5rem; animation: fadeUp 0.9s 0.45s ease both; }
.stat { display: flex; flex-direction: column; align-items: center; gap: 0.15rem; }
.stat span { font-family: 'Bebas Neue', sans-serif; font-size: 2rem; color: var(--yellow); letter-spacing: 0.05em; }
.stat small { font-size: 0.65rem; letter-spacing: 0.18em; text-transform: uppercase; color: var(--muted); }
.statDiv { width: 1px; height: 38px; background: var(--border); }
.scrollHint {
  position: absolute; bottom: 1.8rem; left: 50%; transform: translateX(-50%);
  color: var(--muted); font-size: 0.9rem; z-index: 2;
  animation: bounce 2s ease infinite;
}
@keyframes bounce {
  0%,100% { transform: translateX(-50%) translateY(0); }
  50%      { transform: translateX(-50%) translateY(7px); }
}

/* INFO STRIP */
.infoStrip {
  display: flex; align-items: center; justify-content: center; flex-wrap: wrap;
  border-top: 1px solid var(--border); border-bottom: 1px solid var(--border);
  background: var(--navy);
}
.infoItem {
  display: flex; align-items: center; gap: 0.55rem;
  padding: 0.9rem 2.5rem; font-size: 0.85rem;
  color: var(--muted2); border-right: 1px solid var(--border);
}
.infoItem:last-child { border-right: none; }
.infoItem strong { color: var(--text); font-weight: 600; }

/* MAIN */
.main {
  flex: 1; display: flex; align-items: flex-start; justify-content: center;
  padding: 5rem 1.5rem; background: var(--bg);
}
.formWrap { width: 100%; max-width: 700px; }
.formHeader { display: flex; align-items: center; gap: 1rem; margin-bottom: 3rem; }
.formHeader h2 {
  font-family: 'Bebas Neue', sans-serif;
  font-size: 1.5rem; letter-spacing: 0.12em;
  color: var(--yellow); white-space: nowrap;
}
.fhLine { flex: 1; height: 1px; background: linear-gradient(90deg, rgba(245,197,0,0.3), transparent); }

/* FIELDS */
.form { display: flex; flex-direction: column; gap: 2rem; }
.fieldGroup { display: flex; flex-direction: column; gap: 0.5rem; }
.label { font-size: 0.72rem; letter-spacing: 0.16em; text-transform: uppercase; color: var(--yellow); font-weight: 600; }
.req { color: var(--red); margin-left: 3px; }

.input, .textarea {
  width: 100%; background: var(--navy);
  border: 1px solid var(--border); border-radius: 6px;
  color: var(--text); font-family: 'Barlow', sans-serif;
  font-size: 0.95rem; font-weight: 300;
  padding: 0.85rem 1rem; outline: none;
  transition: border-color 0.2s, box-shadow 0.2s; resize: none;
}
.input::placeholder, .textarea::placeholder { color: var(--muted); }
.input:focus, .textarea:focus {
  border-color: rgba(245,197,0,0.5);
  box-shadow: 0 0 0 3px rgba(245,197,0,0.07);
}
.textarea { min-height: 120px; }

/* CHATLOG */
.chatlogBlock {
  display: flex; flex-direction: column;
  border: 1px solid var(--border); border-radius: 8px;
  overflow: hidden; background: var(--navy);
}
.sceneWrap { position: relative; width: 100%; max-height: 280px; overflow: hidden; }
.sceneImg { width: 100%; display: block; object-fit: cover; max-height: 280px; }
.sceneOverlay {
  position: absolute; bottom: 0; left: 0; right: 0;
  background: linear-gradient(transparent, rgba(12,17,26,0.92));
  padding: 1.5rem 1rem 0.7rem;
}
.sceneOverlay span { font-size: 0.72rem; letter-spacing: 0.14em; color: var(--yellow); text-transform: uppercase; }
.legend {
  display: flex; flex-wrap: wrap; gap: 0.5rem;
  padding: 0.6rem 1rem; border-bottom: 1px solid var(--border);
}
.legendItem { display: flex; align-items: center; gap: 0.4rem; }
.legendBadge {
  font-family: 'Share Tech Mono', monospace;
  font-size: 10px; font-weight: 700;
  border: 1px solid; border-radius: 4px;
  padding: 1px 6px; min-width: 20px; text-align: center;
}
.legendLabel { font-size: 0.7rem; color: var(--muted2); }
.chatlogTextarea {
  width: 100%; background: transparent; border: none;
  color: #c8d0dc; font-family: 'Courier New', monospace;
  font-size: 12.5px; line-height: 1.75;
  padding: 0.85rem 1rem; outline: none; resize: vertical; min-height: 200px;
}
.chatlogTextarea::placeholder { color: var(--muted); white-space: pre-line; }

/* ERROR */
.errorBox {
  background: rgba(248,113,113,0.1); border: 1px solid rgba(248,113,113,0.25);
  border-radius: 6px; color: var(--red); font-size: 0.86rem; padding: 0.7rem 1rem;
}

/* SUBMIT */
.submitBtn {
  background: var(--yellow); color: var(--navy);
  border: none; border-radius: 6px;
  font-family: 'Arial Black', sans-serif;
  font-size: 1rem; letter-spacing: 0.12em; font-weight: 900;
  padding: 0.95rem 2rem; cursor: pointer; height: 52px;
  display: flex; align-items: center; justify-content: center;
  transition: background 0.2s, transform 0.15s, box-shadow 0.2s;
  box-shadow: 0 3px 20px rgba(245,197,0,0.3);
}
.submitBtn:hover:not(:disabled) { background: #ffd83d; transform: translateY(-1px); box-shadow: 0 5px 25px rgba(245,197,0,0.4); }
.submitBtn:disabled { opacity: 0.55; cursor: not-allowed; box-shadow: none; }
.loader {
  display: inline-block; width: 20px; height: 20px;
  border: 2px solid rgba(0,0,0,0.2); border-top-color: #000;
  border-radius: 50%; animation: spin 0.7s linear infinite;
}
@keyframes spin { to { transform: rotate(360deg); } }

/* SUCCESS */
.successBox {
  display: flex; flex-direction: column; align-items: center;
  text-align: center; gap: 1rem; padding: 4rem 2rem;
  border: 1px solid rgba(245,197,0,0.2); border-radius: 8px;
  background: rgba(245,197,0,0.04); animation: fadeUp 0.6s ease;
}
.successIcon {
  width: 64px; height: 64px; border: 2px solid var(--yellow);
  border-radius: 50%; display: flex; align-items: center; justify-content: center;
  font-size: 1.8rem; color: var(--yellow);
}
.successBox h3 { font-family: 'Bebas Neue', sans-serif; font-size: 2rem; letter-spacing: 0.1em; color: var(--yellow); }
.successBox p { color: var(--muted2); max-width: 400px; line-height: 1.7; }
.successBox p strong { color: var(--text); }
.resetBtn {
  margin-top: 1rem; background: transparent;
  border: 1px solid var(--border); color: var(--muted2);
  font-family: 'Barlow', sans-serif; font-size: 0.8rem;
  letter-spacing: 0.1em; text-transform: uppercase;
  padding: 0.55rem 1.4rem; cursor: pointer; border-radius: 5px;
  transition: border-color 0.2s, color 0.2s;
}
.resetBtn:hover { border-color: var(--yellow); color: var(--yellow); }

/* FOOTER */
.footer {
  border-top: 1px solid var(--border); background: var(--navy);
  padding: 1.5rem; text-align: center;
  display: flex; flex-direction: column; gap: 0.25rem;
}
.footer p { font-size: 0.78rem; color: var(--muted); }
.footerMono { font-family: 'Share Tech Mono', monospace; font-size: 0.68rem !important; letter-spacing: 0.2em; }

/* RESPONSIVE */
@media (max-width: 600px) {
  .infoStrip { flex-direction: column; }
  .infoItem { border-right: none; border-bottom: 1px solid var(--border); width: 100%; justify-content: center; }
  .infoItem:last-child { border-bottom: none; }
  .formHeader { flex-direction: column; text-align: center; }
  .fhLine { width: 80px; }
}
