// AI Quant Project - Strategy Gallery
// Renders strategy cards from strategies.json

const ICONS = {
  tree: '\u{1F333}',
  chart: '\u{1F4CA}',
  turtle: '\u{1F422}',
  compare: '\u2696\uFE0F',
  default: '\u{1F4C8}'
};

const CATEGORIES = new Set();

async function loadStrategies() {
  try {
    const response = await fetch('strategies.json');
    if (!response.ok) throw new Error('Failed to load strategies');
    const strategies = await response.json();
    renderFilters(strategies);
    renderStrategies(strategies);
    updateStats(strategies);
  } catch (err) {
    console.error('Error loading strategies:', err);
    document.getElementById('strategy-grid').innerHTML = 
      '<div class="loading">Failed to load strategies. Please check strategies.json</div>';
  }
}

function updateStats(strategies) {
  document.getElementById('stat-count').textContent = strategies.length;
  const categories = new Set(strategies.map(s => s.category));
  document.getElementById('stat-categories').textContent = categories.size;
  const tags = new Set();
  strategies.forEach(s => s.tags.forEach(t => tags.add(t)));
  document.getElementById('stat-tags').textContent = tags.size;
}

function renderFilters(strategies) {
  const categories = ['全部', ...new Set(strategies.map(s => s.category))];
  const filterContainer = document.getElementById('filters');
  filterContainer.innerHTML = categories.map((cat, i) => 
    `<button class="filter-btn ${i === 0 ? 'active' : ''}" data-category="${cat}">${cat}</button>`
  ).join('');
  
  filterContainer.querySelectorAll('.filter-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      filterContainer.querySelectorAll('.filter-btn').forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      const cat = btn.dataset.category;
      const filtered = cat === '全部' ? strategies : strategies.filter(s => s.category === cat);
      renderStrategies(filtered);
    });
  });
}

function renderStrategies(strategies) {
  const grid = document.getElementById('strategy-grid');
  
  if (strategies.length === 0) {
    grid.innerHTML = '<div class="loading">No strategies found.</div>';
    return;
  }

  grid.innerHTML = strategies.map(s => {
    const icon = ICONS[s.icon] || ICONS.default;
    const metricsHtml = Object.entries(s.metrics || {}).map(([key, val]) => {
      const cls = val.toString().startsWith('+') || val.toString().startsWith('-') ? 
        (val.toString().startsWith('+') ? 'positive' : 'negative') : '';
      return `
        <div class="metric-item">
          <div class="metric-label">${key}</div>
          <div class="metric-value ${cls}">${val}</div>
        </div>
      `;
    }).join('');

    const tagsHtml = (s.tags || []).slice(0, 4).map(t => 
      `<span class="card-tag">${t}</span>`
    ).join('');

    return `
      <a class="strategy-card fade-in" href="${s.path}" target="_blank">
        <div class="card-header">
          <span class="card-category" style="background: ${s.color}20; color: ${s.color}; border: 1px solid ${s.color}40;">
            ${s.category}
          </span>
          <div class="card-icon-wrap" style="background: ${s.color}15; border: 1px solid ${s.color}30;">
            ${icon}
          </div>
          <h3 class="card-title">${s.name}</h3>
          <p class="card-subtitle">${s.subtitle}</p>
        </div>
        <div class="card-body">
          <p class="card-description">${s.description}</p>
          <div class="card-tags">${tagsHtml}</div>
          ${metricsHtml ? `<div class="card-metrics">${metricsHtml}</div>` : ''}
        </div>
        <div class="card-footer">
          <span class="card-date">${s.date || ''}</span>
          <span class="card-link">
            View Dashboard
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
              <path d="M5 12h14M12 5l7 7-7 7"/>
            </svg>
          </span>
        </div>
      </a>
    `;
  }).join('');

  // Trigger fade-in animation
  setTimeout(() => {
    document.querySelectorAll('.fade-in').forEach((el, i) => {
      setTimeout(() => el.classList.add('visible'), i * 100);
    });
  }, 50);
}

// Init
document.addEventListener('DOMContentLoaded', loadStrategies);
