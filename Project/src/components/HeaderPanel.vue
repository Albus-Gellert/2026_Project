<script setup lang="ts">
defineProps<{
  selectedCountry: string
  selectedYear: number
}>()
</script>

<template>
  <header class="app-header">
    <div class="header-inner">
      <RouterLink class="identity" to="/" aria-label="Back to explorer introduction">
        <div class="brand-mark" aria-hidden="true">
          <span></span><span></span><span></span>
        </div>
        <div>
          <div class="eyebrow">FAO AQUASTAT · VISUAL ANALYTICS STUDY</div>
          <h1>Global Water Stress Explorer</h1>
        </div>
      </RouterLink>

      <div class="header-context">
        <div class="context-copy">
          <span>Active lens</span>
          <strong>{{ selectedCountry }} · {{ selectedYear }}</strong>
        </div>
      </div>
    </div>
  </header>
</template>

<style scoped>
.app-header {
  color: #f7fbfa;
  background: var(--navy);
  border-bottom: 1px solid rgba(255, 255, 255, 0.1);
  box-shadow: 0 8px 24px rgba(23, 57, 66, .1);
}

.header-inner {
  width: min(1480px, calc(100% - 48px));
  min-height: 96px;
  margin: 0 auto;
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 32px;
}

.identity,
.header-context {
  display: flex;
  align-items: center;
}

.identity { gap: 18px; color: inherit; text-decoration: none; }
.header-context { gap: 28px; }

.brand-mark {
  width: 46px;
  height: 46px;
  border: 1px solid rgba(154, 199, 188, .46);
  border-radius: 50%;
  display: flex;
  align-items: flex-end;
  justify-content: center;
  gap: 3px;
  padding: 10px 9px;
  box-sizing: border-box;
}

.brand-mark span {
  width: 5px;
  border-radius: 4px 4px 1px 1px;
  background: #9ac7bc;
}

.brand-mark span:nth-child(1) { height: 11px; opacity: .62; }
.brand-mark span:nth-child(2) { height: 20px; }
.brand-mark span:nth-child(3) { height: 15px; opacity: .8; }

.eyebrow {
  margin-bottom: 5px;
  color: #9ac7bc;
  font-size: 11px;
  font-weight: 700;
  letter-spacing: .14em;
}

h1 {
  margin: 0;
  font-family: 'Iowan Old Style', 'Palatino Linotype', 'Noto Serif', Georgia, serif;
  font-size: clamp(24px, 2vw, 31px);
  font-weight: 500;
  line-height: 1.18;
  letter-spacing: -.02em;
}

.context-copy {
  padding-right: 28px;
  border-right: 1px solid rgba(255, 255, 255, 0.16);
  display: grid;
  gap: 3px;
  text-align: right;
}

.context-copy span {
  color: #b3c1c3;
  font-size: 11px;
  text-transform: uppercase;
  letter-spacing: .12em;
}

.context-copy strong {
  font-size: 14px;
  font-weight: 650;
}

@media (max-width: 760px) {
  .header-inner {
    width: min(100% - 30px, 1480px);
    min-height: 108px;
    padding: 12px 0;
  }
  .header-context { display: none; }
  .brand-mark { display: none; }
  h1 { font-size: 22px; }
  .eyebrow { font-size: 9px; }
}
</style>
