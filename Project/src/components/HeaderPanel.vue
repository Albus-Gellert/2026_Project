<script setup lang="ts">
defineProps<{
  selectedCountry: string
  selectedYear: number
}>()
</script>

<template>
  <header class="app-header">
    <div class="header-inner">
      <div class="identity">
        <div class="brand-mark" aria-hidden="true">
          <span></span><span></span><span></span>
        </div>
        <div>
          <div class="eyebrow">FAO AQUASTAT · VISUAL ANALYTICS STUDY</div>
          <h1>Global Water Stress Explorer</h1>
        </div>
      </div>

      <div class="header-context">
        <div class="context-copy">
          <span>Active lens</span>
          <strong>{{ selectedCountry }} · {{ selectedYear }}</strong>
        </div>
        <div class="prototype-badge">
          <span class="status-dot"></span>
          Prototype / Mock Data
        </div>
      </div>
    </div>
  </header>
</template>

<style scoped>
.app-header {
  color: #f7fbfa;
  background: #102e39;
  border-bottom: 1px solid rgba(255, 255, 255, 0.1);
}

.header-inner {
  width: min(1660px, calc(100% - 48px));
  min-height: 86px;
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

.identity { gap: 16px; }
.header-context { gap: 28px; }

.brand-mark {
  width: 42px;
  height: 42px;
  border: 1px solid rgba(172, 224, 214, 0.45);
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
  background: #88cfc2;
}

.brand-mark span:nth-child(1) { height: 11px; opacity: .62; }
.brand-mark span:nth-child(2) { height: 20px; }
.brand-mark span:nth-child(3) { height: 15px; opacity: .8; }

.eyebrow {
  margin-bottom: 5px;
  color: #88cfc2;
  font-size: 10px;
  font-weight: 700;
  letter-spacing: .16em;
}

h1 {
  margin: 0;
  font-family: Georgia, 'Times New Roman', serif;
  font-size: clamp(24px, 2vw, 31px);
  font-weight: 500;
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
  color: #9fb1b7;
  font-size: 10px;
  text-transform: uppercase;
  letter-spacing: .12em;
}

.context-copy strong {
  font-size: 13px;
  font-weight: 600;
}

.prototype-badge {
  display: inline-flex;
  align-items: center;
  gap: 8px;
  padding: 9px 12px;
  border: 1px solid rgba(244, 196, 103, .42);
  border-radius: 5px;
  color: #f7d99f;
  background: rgba(244, 196, 103, .08);
  font-size: 11px;
  font-weight: 700;
  letter-spacing: .04em;
  white-space: nowrap;
}

.status-dot {
  width: 7px;
  height: 7px;
  border-radius: 50%;
  background: #efb953;
  box-shadow: 0 0 0 3px rgba(239, 185, 83, .12);
}

@media (max-width: 760px) {
  .header-inner { width: min(100% - 30px, 1660px); min-height: 104px; }
  .context-copy { display: none; }
  .brand-mark { display: none; }
  .prototype-badge { font-size: 9px; padding: 8px; }
  .header-context { gap: 8px; }
}
</style>
