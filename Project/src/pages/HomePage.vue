<template>
  <div class="landing-page">
    <header class="landing-header">
      <RouterLink class="landing-brand" to="/" aria-label="Global Water Stress Explorer home">
        <span class="landing-mark" aria-hidden="true"><i></i><i></i><i></i></span>
        <span>
          <small>FAO AQUASTAT · VISUAL ANALYTICS</small>
          <strong>Water Stress Explorer</strong>
        </span>
      </RouterLink>
      <span class="landing-scope">Global water indicators · 2022</span>
    </header>

    <main class="landing-main">
      <section class="hero-copy">
        <div class="hero-kicker"><span>01</span> EXPLORE THE GLOBAL PICTURE</div>
        <h1>Global Water<br>Stress Explorer</h1>
        <p>
          Compare water pressure, freshwater availability, and sector withdrawals across countries through one coordinated analytical view.
        </p>
        <RouterLink class="enter-button" to="/explorer">
          Enter the explorer
          <span aria-hidden="true">→</span>
        </RouterLink>

        <div class="hero-topics" aria-label="Available analysis views">
          <span>Spatial patterns</span>
          <span>Country profiles</span>
          <span>Indicator relationships</span>
        </div>
      </section>

      <aside class="landing-visual" aria-label="Explorer overview">
        <header>
          <div>
            <span>Coordinated analysis</span>
            <strong>From global patterns to country detail</strong>
          </div>
          <small>Interactive</small>
        </header>

        <div class="globe-stage" aria-hidden="true">
          <div class="globe-ring ring-one"></div>
          <div class="globe-ring ring-two"></div>
          <div class="globe-ring ring-three"></div>
          <div class="globe-core">
            <span></span><span></span><span></span>
          </div>
          <i class="data-point point-one"></i>
          <i class="data-point point-two"></i>
          <i class="data-point point-three"></i>
        </div>

        <div class="preview-grid">
          <article>
            <span>Geographic view</span>
            <strong>195 countries</strong>
          </article>
          <article>
            <span>Focused profile</span>
            <strong>Linked indicators</strong>
          </article>
          <article>
            <span>Comparative analysis</span>
            <strong>Rankings & relationships</strong>
          </article>
        </div>
      </aside>
    </main>

    <footer class="landing-footer">
      <span>Global Water Stress Explorer</span>
      <p>Designed for clear, coordinated exploration of water-resource indicators.</p>
    </footer>
  </div>
</template>

<style scoped>
.landing-page {
  min-height: 100vh;
  padding: 0 clamp(24px, 5vw, 76px);
  display: grid;
  grid-template-rows: auto 1fr auto;
  color: var(--ink);
  background:
    radial-gradient(circle at 78% 40%, rgba(78, 139, 128, .13), transparent 24rem),
    radial-gradient(circle at 8% 90%, rgba(195, 161, 91, .1), transparent 22rem),
    var(--canvas);
  overflow: hidden;
}

.landing-header {
  min-height: 112px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 30px;
  border-bottom: 1px solid var(--line);
}

.landing-brand {
  display: flex;
  align-items: center;
  gap: 14px;
  color: inherit;
  text-decoration: none;
}

.landing-brand > span:last-child { display: grid; gap: 2px; }
.landing-brand small { color: var(--teal-dark); font-size: 9px; font-weight: 800; letter-spacing: .13em; }
.landing-brand strong { font-size: 15px; font-weight: 700; }

.landing-mark {
  width: 42px;
  height: 42px;
  display: flex;
  align-items: flex-end;
  justify-content: center;
  gap: 3px;
  padding: 10px;
  border: 1px solid rgba(60, 125, 117, .36);
  border-radius: 50%;
}

.landing-mark i { width: 5px; border-radius: 4px 4px 1px 1px; background: var(--teal); }
.landing-mark i:nth-child(1) { height: 10px; opacity: .6; }
.landing-mark i:nth-child(2) { height: 20px; }
.landing-mark i:nth-child(3) { height: 14px; opacity: .78; }

.landing-scope { color: var(--muted); font-size: 11px; font-weight: 700; letter-spacing: .08em; text-transform: uppercase; }

.landing-main {
  width: min(1380px, 100%);
  margin: 0 auto;
  padding: clamp(52px, 8vh, 92px) 0;
  display: grid;
  grid-template-columns: minmax(420px, .88fr) minmax(500px, 1.12fr);
  align-items: center;
  gap: clamp(54px, 8vw, 120px);
}

.hero-copy { max-width: 620px; }
.hero-kicker { display: flex; align-items: center; gap: 9px; color: var(--teal-dark); font-size: 10px; font-weight: 800; letter-spacing: .12em; }
.hero-kicker span { width: 25px; height: 25px; display: grid; place-items: center; border-radius: 50%; background: var(--teal-soft); font-size: 9px; letter-spacing: 0; }

.hero-copy h1 {
  margin: 22px 0 24px;
  color: var(--navy);
  font-family: 'Iowan Old Style', 'Palatino Linotype', 'Noto Serif', Georgia, serif;
  font-size: clamp(52px, 5.5vw, 78px);
  font-weight: 500;
  line-height: .98;
  letter-spacing: -.045em;
}

.hero-copy > p { max-width: 560px; margin: 0; color: var(--muted); font-size: 17px; line-height: 1.75; }

.enter-button {
  width: fit-content;
  min-height: 50px;
  margin-top: 34px;
  padding: 0 18px 0 22px;
  display: inline-flex;
  align-items: center;
  gap: 20px;
  border-radius: 8px;
  color: #fffdf9;
  background: var(--teal-dark);
  box-shadow: 0 12px 28px rgba(40, 94, 89, .18);
  font-size: 13px;
  font-weight: 750;
  text-decoration: none;
  transition: transform .18s ease, background .18s ease;
}

.enter-button span { width: 28px; height: 28px; display: grid; place-items: center; border-radius: 50%; background: rgba(255, 255, 255, .12); font-size: 18px; }
.enter-button:hover { background: var(--teal); transform: translateY(-2px); }

.hero-topics { margin-top: 46px; display: flex; flex-wrap: wrap; gap: 10px 18px; color: #617375; font-size: 11px; }
.hero-topics span { display: inline-flex; align-items: center; gap: 7px; }
.hero-topics span::before { content: ''; width: 5px; height: 5px; border-radius: 50%; background: var(--sand); }

.landing-visual {
  min-height: 570px;
  padding: 26px;
  display: grid;
  grid-template-rows: auto 1fr auto;
  border: 1px solid rgba(40, 94, 89, .18);
  border-radius: 18px;
  background: rgba(255, 253, 249, .86);
  box-shadow: 0 30px 80px rgba(38, 67, 67, .1);
  backdrop-filter: blur(12px);
}

.landing-visual > header { display: flex; align-items: flex-start; justify-content: space-between; gap: 24px; }
.landing-visual > header div { display: grid; gap: 5px; }
.landing-visual > header span { color: var(--teal-dark); font-size: 10px; font-weight: 800; letter-spacing: .1em; text-transform: uppercase; }
.landing-visual > header strong { font-size: 15px; }
.landing-visual > header small { padding: 6px 9px; border-radius: 999px; color: var(--teal-dark); background: var(--teal-soft); font-size: 10px; font-weight: 700; }

.globe-stage { position: relative; min-height: 320px; display: grid; place-items: center; }
.globe-ring { position: absolute; border: 1px solid rgba(60, 125, 117, .2); border-radius: 50%; }
.ring-one { width: 270px; height: 270px; background: radial-gradient(circle, rgba(78, 139, 128, .1), rgba(78, 139, 128, .025) 62%, transparent 63%); }
.ring-two { width: 205px; height: 205px; border-style: dashed; transform: rotate(28deg); }
.ring-three { width: 128px; height: 128px; border-color: rgba(195, 161, 91, .38); }
.globe-stage::before, .globe-stage::after { content: ''; position: absolute; width: 270px; height: 1px; background: rgba(60, 125, 117, .16); }
.globe-stage::after { transform: rotate(90deg); }

.globe-core { width: 78px; height: 78px; z-index: 1; display: flex; align-items: flex-end; justify-content: center; gap: 5px; padding: 19px; border-radius: 50%; color: white; background: var(--navy); box-shadow: 0 16px 34px rgba(23, 57, 66, .2); }
.globe-core span { width: 8px; border-radius: 6px 6px 2px 2px; background: #9ac7bc; }
.globe-core span:nth-child(1) { height: 18px; opacity: .64; }
.globe-core span:nth-child(2) { height: 38px; }
.globe-core span:nth-child(3) { height: 27px; opacity: .82; }

.data-point { position: absolute; z-index: 2; width: 10px; height: 10px; border: 2px solid #fffdf9; border-radius: 50%; background: var(--coral); box-shadow: 0 0 0 5px rgba(199, 115, 94, .12); }
.point-one { transform: translate(104px, -70px); }
.point-two { transform: translate(-116px, 56px); background: var(--sand); box-shadow: 0 0 0 5px rgba(195, 161, 91, .13); }
.point-three { transform: translate(84px, 106px); background: var(--teal); box-shadow: 0 0 0 5px rgba(60, 125, 117, .13); }

.preview-grid { display: grid; grid-template-columns: repeat(3, 1fr); border: 1px solid var(--line); border-radius: 10px; overflow: hidden; }
.preview-grid article { min-height: 76px; padding: 14px; display: grid; align-content: center; gap: 5px; }
.preview-grid article + article { border-left: 1px solid var(--line); }
.preview-grid span { color: var(--muted); font-size: 9px; font-weight: 800; letter-spacing: .07em; text-transform: uppercase; }
.preview-grid strong { color: var(--ink); font-size: 12px; line-height: 1.35; }

.landing-footer { min-height: 72px; display: flex; align-items: center; justify-content: space-between; gap: 30px; border-top: 1px solid var(--line); color: var(--muted); font-size: 10px; }
.landing-footer span { color: var(--ink); font-weight: 700; }
.landing-footer p { margin: 0; }

@media (max-width: 980px) {
  .landing-page { overflow: auto; }
  .landing-main { grid-template-columns: 1fr; }
  .hero-copy { max-width: 680px; }
  .landing-visual { min-height: 520px; }
}

@media (max-width: 620px) {
  .landing-page { padding: 0 20px; }
  .landing-header { min-height: 92px; }
  .landing-scope { display: none; }
  .landing-main { padding: 42px 0 50px; gap: 44px; }
  .hero-copy h1 { margin: 18px 0 20px; font-size: clamp(46px, 14vw, 60px); }
  .hero-copy > p { font-size: 15px; }
  .hero-topics { margin-top: 34px; }
  .landing-visual { min-height: 470px; padding: 20px 16px; }
  .globe-stage { min-height: 270px; transform: scale(.88); }
  .preview-grid { grid-template-columns: 1fr; }
  .preview-grid article { min-height: 62px; }
  .preview-grid article + article { border-top: 1px solid var(--line); border-left: 0; }
  .landing-footer { padding: 16px 0; display: grid; }
}
</style>
