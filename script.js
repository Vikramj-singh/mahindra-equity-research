/* ========= PEER COMPARISON ========= */
const peerCtx = document.getElementById('peerChart');

new Chart(peerCtx, {
    type: 'bar',
    data: {
        labels: ['Maruti Suzuki', 'Mahindra & Mahindra', 'Hyundai'],
        datasets: [{
            label: 'Market Cap (₹ Cr)',
            data: [515685, 449045, 185926],
            backgroundColor: ['#4da3ff', '#7dd3fc', '#94a3b8']
        }]
    },
    options: {
        responsive: true,
        plugins: {
            tooltip: {
                callbacks: {
                    afterLabel: function(context) {
                        const pe = [34.9, 31.6, 33.1];
                        return 'P/E: ' + pe[context.dataIndex];
                    }
                }
            },
            legend: { display: false }
        },
        scales: {
            y: {
                ticks: {
                    color: '#9aa4b2'
                },
                grid: {
                    color: 'rgba(255,255,255,0.05)'
                }
            },
            x: {
                ticks: {
                    color: '#9aa4b2'
                },
                grid: { display: false }
            }
        }
    }
});

/* ========= SCROLL-TRIGGERED MARKET SHARE BAR CHART ========= */

const marketBarCanvas = document.getElementById('marketShareBar');
let marketShareChartInitialized = false;

const marketShareObserver = new IntersectionObserver(
    (entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting && !marketShareChartInitialized) {
                marketShareChartInitialized = true;

                new Chart(marketBarCanvas, {
                    type: 'bar',
                    data: {
                        labels: ['Tractor', '3W / LMM', 'CV / LCV', 'PV / SUV'],
                        datasets: [{
                            label: 'Market Share (%)',
                            data: [43.32, 11.58, 46.17, 19.72],
                            backgroundColor: ['#4da3ff', '#22c55e', '#f97316', '#eab308']
                        }]
                    },
                    options: {
                        responsive: true,
                        animation: {
                            duration: 1400,
                            easing: 'easeOutQuart'
                        },
                        plugins: {
                            legend: { display: false }
                        },
                        scales: {
                            y: {
                                beginAtZero: true,
                                max: 50,
                                ticks: {
                                    callback: value => value + '%',
                                    color: '#9aa4b2'
                                },
                                grid: {
                                    color: 'rgba(255,255,255,0.05)'
                                }
                            },
                            x: {
                                ticks: {
                                    color: '#9aa4b2'
                                },
                                grid: {
                                    display: false
                                }
                            }
                        }
                    }
                });
            }
        });
    },
    {
        threshold: 0.4   // chart triggers when ~40% visible
    }
);

// Observe the chart canvas
marketShareObserver.observe(marketBarCanvas);

document.addEventListener('DOMContentLoaded', () => {

    const revenueChartObserver = new IntersectionObserver(
        entries => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    initRevenueScenarioChart();
                }
            });
        },
        { threshold: 0.4 }
    );

    const revenueChartCanvas = document.getElementById('revenueScenarioChart');
    if (revenueChartCanvas) {
        revenueChartObserver.observe(revenueChartCanvas);
    }

});

/* ========= GLOBAL AUTO INDUSTRY PIE ========= */

const globalPie = document.getElementById('globalAutoPie');
let globalPieInit = false;

const globalPieObserver = new IntersectionObserver(entries => {
    entries.forEach(entry => {
        if (entry.isIntersecting && !globalPieInit) {
            globalPieInit = true;

            new Chart(globalPie, {
                type: 'pie',
                data: {
                    labels: ['China', 'USA', 'India', 'Japan', 'Others'],
                    datasets: [{
                        data: [30, 18.5, 5.1, 5, 41.4],
                        backgroundColor: [
                            '#94a3b8',
                            '#60a5fa',
                            '#22c55e', // India highlight
                            '#f97316',
                            '#4da3ff'
                        ],
                        offset: context =>
                            context.dataIndex === 2 ? 18 : 0   // India extruded
                    }]
                },
                options: {
                    animation: {
                        duration: 1400,
                        easing: 'easeOutQuart'
                    },
                    plugins: {
                        legend: {
                            position: 'bottom',
                            labels: {
                                color: '#cfd6e4',
                                padding: 12
                            }
                        },
                        tooltip: {
                            callbacks: {
                                label: ctx => `${ctx.label}: ${ctx.raw}%`
                            }
                        }
                    }
                }
            });
        }
    });
}, { threshold: 0.4 });

globalPieObserver.observe(globalPie);

/* ========= UV vs OTHER PV ========= */

const uvPvChart = document.getElementById('uvVsPvChart');
let uvPvInit = false;

const uvPvObserver = new IntersectionObserver(entries => {
    entries.forEach(entry => {
        if (entry.isIntersecting && !uvPvInit) {
            uvPvInit = true;

            new Chart(uvPvChart, {
                type: 'bar',
                data: {
                    labels: ['2022', '2023', '2024', '2025'],
                    datasets: [
                        {
                            label: 'Utility Vehicles',
                            data: [1489219, 2003718, 2520691, 2797229],
                            backgroundColor: '#4da3ff'
                        },
                        {
                            label: 'Other Passenger Cars',
                            data: [1467039, 1747376, 1548947, 1353287],
                            backgroundColor: '#94a3b8'
                        }
                    ]
                },
                options: {
                    responsive: true,
                    animation: {
                        duration: 1500,
                        easing: 'easeOutQuart'
                    },
                    plugins: {
                        legend: {
                            labels: { color: '#cfd6e4' }
                        }
                    },
                    scales: {
                        y: {
                            ticks: {
                                color: '#9aa4b2',
                                callback: v => (v / 1000000).toFixed(1) + 'M'
                            },
                            grid: {
                                color: 'rgba(255,255,255,0.05)'
                            }
                        },
                        x: {
                            ticks: { color: '#9aa4b2' },
                            grid: { display: false }
                        }
                    }
                }
            });
        }
    });
}, { threshold: 0.4 });

uvPvObserver.observe(uvPvChart);

/* ========= TRACTOR MONTHLY SALES ========= */

/* const tractorChart = document.getElementById('tractorMonthlyChart');
let tractorInit = false;

const tractorObserver = new IntersectionObserver(entries => {
    entries.forEach(entry => {
        if (entry.isIntersecting && !tractorInit) {
            tractorInit = true;

            new Chart(tractorChart, {
                type: 'bar',
                data: {
                    labels: [
                        'Sep-24','Oct-24','Nov-24','Dec-24',
                        'Jan-25','Feb-25','Mar-25','Apr-25',
                        'May-25','Jun-25','Jul-25','Aug-25',
                        'Sep-25','Oct-25'
                    ],
                    datasets: [{
                        label: 'Tractor Domestic Sales',
                        data: [
                            100542,144675,71300,50993,
                            61923,58797,79946,82839,
                            90500,112677,64320,64322,
                            146180,166145
                        ],
                        backgroundColor: '#22c55e'
                    }]
                },
                options: {
                    responsive: true,
                    animation: {
                        duration: 1600,
                        easing: 'easeOutQuart'
                    },
                    plugins: {
                        legend: { display: false }
                    },
                    scales: {
                        y: {
                            ticks: {
                                color: '#9aa4b2'
                            },
                            grid: {
                                color: 'rgba(255,255,255,0.05)'
                            }
                        },
                        x: {
                            ticks: {
                                color: '#9aa4b2',
                                maxRotation: 0
                            },
                            grid: { display: false }
                        }
                    }
                }
            });
        }
    });
}, { threshold: 0.35 });

tractorObserver.observe(tractorChart); */

function animateNumber(element, start, end, duration = 700, formatter = v => v) {
    let startTime = null;

    function animationStep(timestamp) {
        if (!startTime) startTime = timestamp;
        const progress = Math.min((timestamp - startTime) / duration, 1);

        // easeOutCubic
        const easedProgress = 1 - Math.pow(1 - progress, 3);
        const current = start + (end - start) * easedProgress;

        element.textContent = formatter(current);

        if (progress < 1) {
            requestAnimationFrame(animationStep);
        }
    }

    requestAnimationFrame(animationStep);
}



const financialData = {
    base: {
        revenue: [134983,156013,179751,206452,236368],
        revenueGrowth: ['16%','16%','15%','15%','14%'],
        ebitda: [20418,24261,28711,33843,39735],
        ebit: [19101,22567,26596,31261,36634],
        pat: [14212,16812,19834,23332,27362],
        patGrowth: ['20%','18%','18%','18%','17%'],
        eps: [114,135,159,188,220]
    },
    bull: {
        revenue: [137693,162285,190599,223071,260154],
        revenueGrowth: ['18%','18%','17%','17%','17%'],
        ebitda: [21415,26610,32846,40288,49117],
        ebit: [20046,24796,30525,37393,45574],
        pat: [14921,18484,22781,27931,34067],
        patGrowth: ['26%','24%','23%','23%','22%'],
        eps: [120,149,183,225,274]
    },
    bear: {
        revenue: [132276,149883,169365,190851,214458],
        revenueGrowth: ['14%','13%','13%','13%','12%'],
        ebitda: [18852,20687,22610,24610,26674],
        ebit: [17588,19111,20692,22321,23980],
        pat: [13078,14220,15406,16627,17872],
        patGrowth: ['10%','9%','8%','8%','7%'],
        eps: [105,114,124,134,144]
    }
};

function renderPLTable(scenario) {
    const d = financialData[scenario];
    const tbody = document.getElementById('pl-table-body');

    tbody.innerHTML = `
        <tr class="strong">
            <td>Revenue</td>
            ${d.revenue.map(v => `<td>${v.toLocaleString()}</td>`).join('')}
        </tr>
        <tr>
            <td>Revenue Growth</td>
            ${d.revenueGrowth.map(v => `<td>${v}</td>`).join('')}
        </tr>
        <tr>
            <td>EBITDA</td>
            ${d.ebitda.map(v => `<td>${v.toLocaleString()}</td>`).join('')}
        </tr>
        <tr>
            <td>EBIT</td>
            ${d.ebit.map(v => `<td>${v.toLocaleString()}</td>`).join('')}
        </tr>
        <tr class="strong">
            <td>Net Income</td>
            ${d.pat.map(v => `<td>${v.toLocaleString()}</td>`).join('')}
        </tr>
        <tr>
            <td>PAT Growth</td>
            ${d.patGrowth.map(v => `<td>${v}</td>`).join('')}
        </tr>
        <tr>
            <td>EPS (₹)</td>
            ${d.eps.map(v => `<td>${v}</td>`).join('')}
        </tr>
    `;
}

let revenueChartInitialized = false;

function initRevenueScenarioChart() {
    if (revenueChartInitialized) return;

    const canvas = document.getElementById('revenueScenarioChart');
    if (!canvas) return;   // ⬅ critical safety check

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    new Chart(ctx, {
        type: 'line',
        data: {
            labels: ['FY26E','FY27E','FY28E','FY29E','FY30E'],
            datasets: [
                {
                    label: 'Base',
                    data: financialData.base.revenue,
                    borderColor: '#4da3ff',
                    tension: 0.4
                },
                {
                    label: 'Bull',
                    data: financialData.bull.revenue,
                    borderColor: '#22c55e',
                    tension: 0.4
                },
                {
                    label: 'Bear',
                    data: financialData.bear.revenue,
                    borderColor: '#f97316',
                    tension: 0.4
                }
            ]
        },
        options: {
            animation: {
                duration: 900,
                easing: 'easeOutQuart'
            },
            plugins: {
                legend: {
                    labels: { color: '#cfd6e4' }
                }
            },
            scales: {
                y: {
                    ticks: {
                        callback: v => (v / 100000).toFixed(1) + 'L',
                        color: '#9aa4b2'
                    }
                },
                x: {
                    ticks: { color: '#9aa4b2' }
                }
            }
        }
    });

    revenueChartInitialized = true;
}

function renderValuation(scenario) {
    const d = valuationData[scenario];

    const upside = ((d.targetPrice - d.cmp) / d.cmp * 100).toFixed(1);

    document.getElementById('valuationScenario').innerText =
        scenario.charAt(0).toUpperCase() + scenario.slice(1) + ' Scenario';

    const targetEl = document.getElementById('targetPrice');
     const prevTarget = Number(targetEl.dataset.value || d.cmp);

        animateNumber(
            targetEl,
            prevTarget,
            d.targetPrice,
            700,
            v => '₹' + Math.round(v).toLocaleString()
            );

targetEl.dataset.value = d.targetPrice;
        '₹' + d.targetPrice.toFixed(0);

    const upsideEl = document.getElementById('upsideValue');
const prevUpside = Number(upsideEl.dataset.value || 0);

animateNumber(
    upsideEl,
    prevUpside,
    Number(upside),
    600,
    v => (v >= 0 ? '+' : '') + v.toFixed(1) + '%'
);

    upsideEl.dataset.value = upside;

    const autoEl = document.getElementById('autoValue');
animateNumber(
    autoEl,
    Number(autoEl.dataset.value || d.autoValue),
    d.autoValue,
    600,
    v => '₹' + Math.round(v).toLocaleString()
);
autoEl.dataset.value = d.autoValue;

    const subEl = document.getElementById('subValue');
animateNumber(
    subEl,
    Number(subEl.dataset.value || d.subValue),
    d.subValue,
    600,
    v => '₹' + Math.round(v).toLocaleString()
);
subEl.dataset.value = d.subValue;

    const ratingEl = document.getElementById('ratingValue');
    ratingEl.innerText = d.rating.toUpperCase();

    ratingEl.className = 'value ' + d.rating.toLowerCase();
}



renderPLTable('base');
renderValuation('base');

document.querySelectorAll('.scenario-toggle button').forEach(btn => {
    btn.addEventListener('click', () => {
        document.querySelectorAll('.scenario-toggle button')
            .forEach(b => b.classList.remove('active'));

        btn.classList.add('active');
        renderPLTable(btn.dataset.scenario);
        renderValuation(btn.dataset.scenario);
    });
});



const sections = document.querySelectorAll('section[id]');
const navLinks = document.querySelectorAll('.nav a');

const observerOptions = {
    root: null,
    rootMargin: '-40% 0px -40% 0px',
    threshold: 0
};

const sectionObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const id = entry.target.getAttribute('id');

            navLinks.forEach(link => {
                link.classList.remove('active');
                if (link.getAttribute('href') === `#${id}`) {
                    link.classList.add('active');
                }
            });
        }
    });
}, observerOptions);

sections.forEach(section => {
    sectionObserver.observe(section);
});


let currentScroll = window.scrollY;
let targetScroll = window.scrollY;
let isScrolling = false;

window.addEventListener('wheel', (e) => {
    e.preventDefault();

    targetScroll += e.deltaY;
    targetScroll = Math.max(
        0,
        Math.min(targetScroll, document.body.scrollHeight - window.innerHeight)
    );

    if (!isScrolling) smoothScroll();
}, { passive: false });

function smoothScroll() {
    isScrolling = true;

    currentScroll += (targetScroll - currentScroll) * 0.12;

    if (Math.abs(targetScroll - currentScroll) < 0.5) {
        isScrolling = false;
        currentScroll = targetScroll;
    }

    window.scrollTo(0, currentScroll);

    if (isScrolling) {
        requestAnimationFrame(smoothScroll);
    }
}
