// Ecobber Logic

// Data
const subProducts = [
    {
        id: 'tiles',
        name: 'Rubber Tiles & Mats',
        desc: 'Flooring, gyms, playgrounds',
        icon: '🔲',
        steps: [
            { name: 'Raw Material Prep', desc: 'Mix rubber sheets with additives' },
            { name: 'Sheet Formation', desc: 'Flatten compound into uniform sheets' },
            { name: 'Cutting / Shaping', desc: 'Cut sheets into tiles or custom sizes' },
            { name: 'Molding / Pressing', desc: 'Apply heat and pressure for patterns' },
            { name: 'Vulcanization', desc: 'Heat treatment with sulfur' },
            { name: 'Finishing', desc: 'Trim edges, add textures' },
            { name: 'Inspection & Packaging', desc: 'Quality check and package' }
        ]
    },
    {
        id: 'crumbs',
        name: 'Rubber Crumbs',
        desc: 'Roads, sports tracks',
        icon: '⚫',
        steps: [
            { name: 'Collection & Sorting', desc: 'Gather used sheets and scrap' },
            { name: 'Shredding', desc: 'Cut rubber into smaller chunks' },
            { name: 'Granulation / Grinding', desc: 'Grind into crumbs using granulator' },
            { name: 'Magnetic Separation', desc: 'Remove any remaining metal' },
            { name: 'Screening', desc: 'Sieve crumbs by size' },
            { name: 'Cleaning & Packaging', desc: 'Wash, dry, and bag for sale' }
        ]
    },
    {
        id: 'reclaimed',
        name: 'Reclaimed Rubber',
        desc: 'Low-cost sheets, molded products',
        icon: '♻️',
        steps: [
            { name: 'Collection & Sorting', desc: 'Collect waste sheets and scraps' },
            { name: 'Shredding', desc: 'Cut rubber into smaller pieces' },
            { name: 'Devulcanization', desc: 'Break sulfur cross-links' },
            { name: 'Compounding & Blending', desc: 'Mix with additives and virgin rubber' },
            { name: 'Sheet Formation', desc: 'Roll and calendar into sheets' },
            { name: 'Testing & Packaging', desc: 'Check elasticity and strength' }
        ]
    },
    {
        id: 'fuel',
        name: 'Eco Fuel',
        desc: 'Industrial heating, energy recovery',
        icon: '🔥',
        steps: [
            { name: 'Collection & Sorting', desc: 'Gather scrap rubber' },
            { name: 'Shredding', desc: 'Cut into smaller pieces' },
            { name: 'Pyrolysis', desc: 'Heat in oxygen-free reactor (400-500°C)' },
            { name: 'Condensation', desc: 'Cool vapors into liquid fuel' },
            { name: 'Refining', desc: 'Filter and refine oil' },
            { name: 'Packaging & Storage', desc: 'Store liquid fuel in drums/tanks' }
        ]
    }
];

// State
let currentState = 'main'; // 'main', 'process', 'subproduct'
let particles = [];
let animationFrameId;
let timelineAnimationFrameId;

// DOM Elements
const app = document.getElementById('app');
const navBtn = document.getElementById('nav-btn');
const resetBtn = document.getElementById('reset-btn');
const stageDesc = document.getElementById('stage-description');
const processingCenter = document.getElementById('processing-center');
const productsContainer = document.getElementById('products-container');
const svgLayer = document.getElementById('connections-layer');
const stageSteps = document.querySelectorAll('.stage-step');
const modal = document.getElementById('detailed-modal');
const modalBody = document.getElementById('modal-body');
const modalClose = document.getElementById('modal-close');

// Initialization
function init() {
    render();
    window.addEventListener('resize', updateConnections);
    navBtn.addEventListener('click', handleNextStage);
    resetBtn.addEventListener('click', handleReset);
    modalClose.addEventListener('click', closeModal);
    modal.addEventListener('click', (e) => {
        if (e.target === modal) closeModal();
    });

    // Start animation loop
    animateParticles();
}

// State Management
function handleNextStage() {
    if (currentState === 'main') {
        currentState = 'process';
    } else if (currentState === 'process') {
        currentState = 'subproduct';
    }
    render();
}

function handleReset() {
    currentState = 'main';
    render();
}

// Rendering
function render() {
    updateHeader();
    renderCenter();
    renderProducts();
    setTimeout(updateConnections, 50);
}

function updateHeader() {
    if (currentState === 'main') stageDesc.textContent = 'Main Products from Natural Rubber Sheets';
    else if (currentState === 'process') stageDesc.textContent = 'Processing Waste into Sub-Products';
    else if (currentState === 'subproduct') stageDesc.textContent = 'Final Sub-Products Created';

    stageSteps.forEach(step => {
        step.classList.remove('active');
        if (step.dataset.step === currentState) step.classList.add('active');
    });

    if (currentState === 'subproduct') {
        navBtn.classList.add('hidden');
        resetBtn.classList.remove('hidden');
    } else {
        navBtn.classList.remove('hidden');
        resetBtn.classList.add('hidden');
        navBtn.textContent = currentState === 'main' ? 'Show Processes' : 'Show Sub-Products';
    }
}

function renderCenter() {
    processingCenter.innerHTML = '';

    let icon, title, subtitle;

    if (currentState === 'main') {
        icon = '⚙️'; title = 'Main Production'; subtitle = 'Primary Products';
    } else if (currentState === 'process') {
        icon = '🔄'; title = 'Recycling'; subtitle = 'Waste Processing';
    } else {
        icon = '✨'; title = 'Creating Sub-Products'; subtitle = 'Final Output';
    }

    processingCenter.innerHTML = `
        <div class="icon">${icon}</div>
        <h3>${title}</h3>
        <div style="font-size: 0.8rem; color: var(--color-text-muted); margin-top: 0.25rem;">${subtitle}</div>
    `;
}

function renderProducts() {
    productsContainer.innerHTML = '';

    if (currentState === 'main') {
        const mainProducts = [
            { name: 'Industrial Sheets', desc: 'High-quality sheets', icon: '📋' },
            { name: 'Automotive Parts', desc: 'Vehicle components', icon: '🚗' },
            { name: 'Consumer Goods', desc: 'Everyday items', icon: '👟' }
        ];

        mainProducts.forEach(p => {
            const el = document.createElement('div');
            el.className = 'product-item product-target';
            el.innerHTML = `
                <div class="product-header">
                    <div class="product-icon">${p.icon}</div>
                    <div>
                        <div style="font-weight: 700; color: var(--color-text);">${p.name}</div>
                        <div style="font-size: 0.85rem; color: var(--color-text-muted);">${p.desc}</div>
                    </div>
                </div>
            `;
            productsContainer.appendChild(el);
        });
    } else if (currentState === 'process') {
        const el = document.createElement('div');
        el.className = 'info-box';
        el.innerHTML = `
            <div class="info-title">Waste Processing Overview</div>
            <ul class="info-list">
                <li><span>📦</span> Collection & Sorting</li>
                <li><span>✂️</span> Shredding & Size Reduction</li>
                <li><span>⚗️</span> Specialized Processing</li>
                <li><span>✅</span> Finishing & Quality Control</li>
            </ul>
        `;
        productsContainer.appendChild(el);
    } else {
        subProducts.forEach(p => {
            const el = document.createElement('div');
            el.className = 'product-item product-target';
            el.innerHTML = `
                <div class="product-header">
                    <div class="product-icon">${p.icon}</div>
                    <div>
                        <div style="font-weight: 700; color: var(--color-text);">${p.name}</div>
                        <div style="font-size: 0.85rem; color: var(--color-text-muted);">${p.desc}</div>
                    </div>
                </div>
                <button class="btn btn-primary btn-sm" style="width: 100%; justify-content: center; margin-top: 0.5rem;">
                    View Detailed Process (${p.steps.length} Steps) →
                </button>
            `;
            el.querySelector('button').addEventListener('click', () => showDetailedModal(p));
            productsContainer.appendChild(el);
        });
    }
}

// Modal Logic
function showDetailedModal(product) {
    // Build Vertical Timeline HTML
    let timelineHTML = `
        <div style="text-align: center; margin-bottom: 2rem;">
            <h2 style="font-size: 2rem; color: var(--color-text); margin-bottom: 0.5rem;">${product.name}</h2>
            <p style="color: var(--color-text-muted);">Detailed Production Process</p>
        </div>
        <div class="timeline">
            <div class="timeline-flow" id="modal-flow-line"></div>
    `;

    product.steps.forEach((step, index) => {
        timelineHTML += `
            <div class="timeline-item" data-step="${index + 1}">
                <div class="timeline-dot"></div>
                <div class="timeline-content">
                    <div class="timeline-card">
                        <h4>${index + 1}. ${step.name}</h4>
                        <p>${step.desc}</p>
                    </div>
                </div>
            </div>
        `;
    });

    timelineHTML += `</div>`;

    modalBody.innerHTML = timelineHTML;
    modal.classList.add('open');

    // Start Timeline Animation
    startTimelineAnimation();
}

function closeModal() {
    modal.classList.remove('open');
    if (timelineAnimationFrameId) cancelAnimationFrame(timelineAnimationFrameId);
}

function startTimelineAnimation() {
    const flowLine = document.getElementById('modal-flow-line');
    const items = document.querySelectorAll('.timeline-item');
    const duration = 6000;
    let start = null;

    function animate(timestamp) {
        if (!modal.classList.contains('open')) return;
        if (!start) start = timestamp;
        const elapsed = timestamp - start;
        const progress = (elapsed % duration) / duration;

        if (flowLine) flowLine.style.height = `${progress * 100}%`;

        items.forEach((item, index) => {
            const threshold = (index + 0.2) / items.length;
            if (progress >= threshold) item.classList.add('active');
            else item.classList.remove('active');
        });

        if (progress < 0.05) items.forEach(i => i.classList.remove('active'));

        timelineAnimationFrameId = requestAnimationFrame(animate);
    }

    timelineAnimationFrameId = requestAnimationFrame(animate);
}

// SVG Connections
function updateConnections() {
    const sourceEl = document.getElementById('material-source');
    const centerEl = document.getElementById('processing-center');
    const productTargets = document.querySelectorAll('.product-target');

    if (!sourceEl || !centerEl) return;

    const containerRect = app.getBoundingClientRect();
    const sourceRect = sourceEl.getBoundingClientRect();
    const centerRect = centerEl.getBoundingClientRect();

    svgLayer.innerHTML = '';
    particles = [];

    // Source -> Center
    const p1 = {
        x: sourceRect.right - containerRect.left,
        y: sourceRect.top + sourceRect.height / 2 - containerRect.top
    };
    const p2 = {
        x: centerRect.left - containerRect.left,
        y: centerRect.top + centerRect.height / 2 - containerRect.top
    };

    drawConnection(p1, p2);

    // Center -> Products
    if (currentState === 'process') {
        const infoBox = productsContainer.querySelector('.info-box');
        if (infoBox) {
            const infoRect = infoBox.getBoundingClientRect();
            const p3 = {
                x: centerRect.right - containerRect.left,
                y: centerRect.top + centerRect.height / 2 - containerRect.top
            };
            const p4 = {
                x: infoRect.left - containerRect.left,
                y: infoRect.top + infoRect.height / 2 - containerRect.top
            };
            drawConnection(p3, p4);
        }
    } else {
        // Re-query targets to ensure we have the latest DOM
        const currentTargets = productsContainer.querySelectorAll('.product-target');
        currentTargets.forEach(target => {
            const targetRect = target.getBoundingClientRect();

            // Skip if target is not visible or has invalid coordinates
            if (targetRect.height === 0 || targetRect.width === 0) return;

            const p3 = {
                x: centerRect.right - containerRect.left,
                y: centerRect.top + centerRect.height / 2 - containerRect.top
            };
            const p4 = {
                x: targetRect.left - containerRect.left,
                y: targetRect.top + targetRect.height / 2 - containerRect.top
            };
            drawConnection(p3, p4);
        });
    }
}

function drawConnection(from, to) {
    // Safety check for coordinates
    if (isNaN(from.x) || isNaN(from.y) || isNaN(to.x) || isNaN(to.y)) return;

    const path = document.createElementNS('http://www.w3.org/2000/svg', 'path');
    const d = `M ${from.x} ${from.y} C ${from.x + 100} ${from.y}, ${to.x - 100} ${to.y}, ${to.x} ${to.y}`;

    if (currentState === 'main') {
        const mainProducts = [
            { name: 'Industrial Sheets', desc: 'High-quality sheets', icon: '📋' },
            { name: 'Automotive Parts', desc: 'Vehicle components', icon: '🚗' },
            { name: 'Consumer Goods', desc: 'Everyday items', icon: '👟' }
        ];

        mainProducts.forEach(p => {
            const el = document.createElement('div');
            el.className = 'product-item product-target';
            el.innerHTML = `
                <div class="product-header">
                    <div class="product-icon">${p.icon}</div>
                    <div>
                        <div style="font-weight: 700; color: var(--color-text);">${p.name}</div>
                        <div style="font-size: 0.85rem; color: var(--color-text-muted);">${p.desc}</div>
                    </div>
                </div>
            `;
            productsContainer.appendChild(el);
        });
    } else if (currentState === 'process') {
        const el = document.createElement('div');
        el.className = 'info-box';
        el.innerHTML = `
            <div class="info-title">Waste Processing Overview</div>
            <ul class="info-list">
                <li><span>📦</span> Collection & Sorting</li>
                <li><span>✂️</span> Shredding & Size Reduction</li>
                <li><span>⚗️</span> Specialized Processing</li>
                <li><span>✅</span> Finishing & Quality Control</li>
            </ul>
        `;
        productsContainer.appendChild(el);
    } else {
        subProducts.forEach(p => {
            const el = document.createElement('div');
            el.className = 'product-item product-target';
            el.innerHTML = `
                <div class="product-header">
                    <div class="product-icon">${p.icon}</div>
                    <div>
                        <div style="font-weight: 700; color: var(--color-text);">${p.name}</div>
                        <div style="font-size: 0.85rem; color: var(--color-text-muted);">${p.desc}</div>
                    </div>
                </div>
                <button class="btn btn-primary btn-sm" style="width: 100%; justify-content: center; margin-top: 0.5rem;">
                    View Detailed Process (${p.steps.length} Steps) →
                </button>
            `;
            el.querySelector('button').addEventListener('click', () => showDetailedModal(p));
            productsContainer.appendChild(el);
        });
    }
}

// Modal Logic
function showDetailedModal(product) {
    // Build Vertical Timeline HTML
    let timelineHTML = `
        <div style="text-align: center; margin-bottom: 2rem;">
            <h2 style="font-size: 2rem; color: var(--color-text); margin-bottom: 0.5rem;">${product.name}</h2>
            <p style="color: var(--color-text-muted);">Detailed Production Process</p>
        </div>
        <div class="timeline">
            <div class="timeline-flow" id="modal-flow-line"></div>
    `;

    product.steps.forEach((step, index) => {
        timelineHTML += `
            <div class="timeline-item" data-step="${index + 1}">
                <div class="timeline-dot"></div>
                <div class="timeline-content">
                    <div class="timeline-card">
                        <h4>${index + 1}. ${step.name}</h4>
                        <p>${step.desc}</p>
                    </div>
                </div>
            </div>
        `;
    });

    timelineHTML += `</div>`;

    modalBody.innerHTML = timelineHTML;
    modal.classList.add('open');

    // Start Timeline Animation
    startTimelineAnimation();
}

function closeModal() {
    modal.classList.remove('open');
    if (timelineAnimationFrameId) cancelAnimationFrame(timelineAnimationFrameId);
}

function startTimelineAnimation() {
    const flowLine = document.getElementById('modal-flow-line');
    const items = document.querySelectorAll('.timeline-item');
    const duration = 6000;
    let start = null;

    function animate(timestamp) {
        if (!modal.classList.contains('open')) return;
        if (!start) start = timestamp;
        const elapsed = timestamp - start;
        const progress = (elapsed % duration) / duration;

        if (flowLine) flowLine.style.height = `${progress * 100}%`;

        items.forEach((item, index) => {
            const threshold = (index + 0.2) / items.length;
            if (progress >= threshold) item.classList.add('active');
            else item.classList.remove('active');
        });

        if (progress < 0.05) items.forEach(i => i.classList.remove('active'));

        timelineAnimationFrameId = requestAnimationFrame(animate);
    }

    timelineAnimationFrameId = requestAnimationFrame(animate);
}

// SVG Connections
function updateConnections() {
    const sourceEl = document.getElementById('material-source');
    const centerEl = document.getElementById('processing-center');
    const productTargets = document.querySelectorAll('.product-target');

    if (!sourceEl || !centerEl) return;

    const containerRect = app.getBoundingClientRect();
    const sourceRect = sourceEl.getBoundingClientRect();
    const centerRect = centerEl.getBoundingClientRect();

    svgLayer.innerHTML = '';

    // Source -> Center
    const p1 = {
        x: sourceRect.right - containerRect.left,
        y: sourceRect.top + sourceRect.height / 2 - containerRect.top
    };
    const p2 = {
        x: centerRect.left - containerRect.left,
        y: centerRect.top + centerRect.height / 2 - containerRect.top
    };

    // drawConnection(p1, p2);

    // Center -> Products
    if (currentState === 'process') {
        const infoBox = productsContainer.querySelector('.info-box');
        if (infoBox) {
            const infoRect = infoBox.getBoundingClientRect();
            const p3 = {
                x: centerRect.right - containerRect.left,
                y: centerRect.top + centerRect.height / 2 - containerRect.top
            };
            const p4 = {
                x: infoRect.left - containerRect.left,
                y: infoRect.top + infoRect.height / 2 - containerRect.top
            };
            // drawConnection(p3, p4);
        }
    } else {
        // Re-query targets to ensure we have the latest DOM
        const currentTargets = productsContainer.querySelectorAll('.product-target');
        currentTargets.forEach(target => {
            const targetRect = target.getBoundingClientRect();

            // Skip if target is not visible or has invalid coordinates
            if (targetRect.height === 0 || targetRect.width === 0) return;

            const p3 = {
                x: centerRect.right - containerRect.left,
                y: centerRect.top + centerRect.height / 2 - containerRect.top
            };
            const p4 = {
                x: targetRect.left - containerRect.left,
                y: targetRect.top + targetRect.height / 2 - containerRect.top
            };
            // drawConnection(p3, p4);
        });
    }
}

function drawConnection(from, to) {
    // Safety check for coordinates
    if (isNaN(from.x) || isNaN(from.y) || isNaN(to.x) || isNaN(to.y)) return;

    const path = document.createElementNS('http://www.w3.org/2000/svg', 'path');
    const d = `M ${from.x} ${from.y} C ${from.x + 100} ${from.y}, ${to.x - 100} ${to.y}, ${to.x} ${to.y}`;

    path.setAttribute('d', d);
    path.setAttribute('fill', 'none');
    path.setAttribute('stroke', 'var(--color-primary)');
    path.setAttribute('stroke-width', '2');
    path.setAttribute('stroke-opacity', '0.3');

    svgLayer.appendChild(path);
}

function animateParticles() {
    // Particles removed as per user request
}

init();