// Configuração dos meios de transporte:
// Fatores médios de emissão em kg de CO2 por km
const TRANSPORT_MODES = {
    'car-petrol': {
        label: 'Carro a Gasolina',
        factor: 0.18,
        supportsTraffic: true,
        supportsPassengers: true,
        tip: '💡 Dica: Dividir caronas ou migrar para transporte público reduz consideravelmente essa pegada.'
    },
    'car-ethanol': {
        label: 'Carro Flex (Etanol)',
        factor: 0.09,
        supportsTraffic: true,
        supportsPassengers: true,
        tip: '🌱 Boa escolha frente à gasolina! Compartilhar a viagem com mais passageiros reduz ainda mais o impacto.'
    },
    'car-electric': {
        label: 'Carro Elétrico',
        factor: 0.05,
        supportsTraffic: true,
        supportsPassengers: true,
        tip: '🌱 Excelente escolha! Veículos elétricos reduzem drasticamente as emissões diretas.'
    },
    'motorcycle': {
        label: 'Moto',
        factor: 0.10,
        supportsTraffic: true,
        supportsPassengers: true,
        tip: '💡 Dica: Manter a manutenção em dia e calibrar os pneus ajuda a economizar combustível e reduzir emissões.'
    },
    'bus': {
        label: 'Ônibus Intermunicipal',
        factor: 0.03,
        supportsTraffic: true,
        supportsPassengers: false,
        tip: '🌱 Ótima opção coletiva! O transporte público dilui as emissões por passageiro.'
    },
    'train': {
        label: 'Trem / Metrô',
        factor: 0.01,
        supportsTraffic: false,
        supportsPassengers: false,
        tip: '🌱 Excelente escolha! Meios de transporte sobre trilhos e eletrificados são altamente sustentáveis.'
    },
    'plane': {
        label: 'Avião',
        factor: 0.25,
        supportsTraffic: false,
        supportsPassengers: false,
        tip: '💡 Dica: Voos curtos geram muito CO₂ na decolagem. Para distâncias menores, considere trens ou ônibus.'
    },
    'bike-walk': {
        label: 'Bicicleta / A pé',
        factor: 0,
        supportsTraffic: false,
        supportsPassengers: false,
        tip: '🚴 Perfeito! Deslocamentos ativos zeram as emissões de CO₂ e ainda fazem bem à saúde.'
    }
};

// 1 árvore absorve cerca de 15 kg de CO2 por ano
const TREE_ABSORPTION_KG_PER_YEAR = 15;

const form = document.getElementById('ecoForm');
const distanceInput = document.getElementById('distance');
const roundTripInput = document.getElementById('roundTrip');
const transportSelect = document.getElementById('transport');
const passengersGroup = document.getElementById('passengersGroup');
const passengersInput = document.getElementById('passengers');
const profileSelect = document.getElementById('profile');
const profileHint = document.getElementById('profileHint');
const errorBox = document.getElementById('errorMessage');
const resetBtn = document.getElementById('resetBtn');
const resultSection = document.getElementById('result');
const co2ResultEl = document.getElementById('co2Result');
const treesResultEl = document.getElementById('treesResult');
const ecoTipEl = document.getElementById('ecoTip');
const comparisonEl = document.getElementById('comparison');

/**
 * Formata valores numéricos no padrão brasileiro (pt-BR).
 */
function formatNumberBR(value, decimals = 2) {
    return value.toLocaleString('pt-BR', {
        minimumFractionDigits: decimals,
        maximumFractionDigits: decimals
    });
}

/**
 * Exibe mensagem de erro inline no formulário.
 */
function showError(message) {
    errorBox.textContent = message;
    errorBox.classList.remove('hidden');
}

/**
 * Oculta a mensagem de erro inline.
 */
function clearError() {
    errorBox.textContent = '';
    errorBox.classList.add('hidden');
}

/**
 * Atualiza a disponibilidade dos campos de passageiros e perfil de trânsito
 * conforme o meio de transporte selecionado.
 */
function syncDependentFields() {
    const mode = TRANSPORT_MODES[transportSelect.value];

    if (!mode || mode.supportsTraffic) {
        profileSelect.disabled = false;
        profileHint.classList.add('hidden');
    } else {
        profileSelect.value = '1.0';
        profileSelect.disabled = true;
        profileHint.classList.remove('hidden');
    }

    if (mode && mode.supportsPassengers) {
        passengersGroup.classList.remove('hidden');
    } else {
        passengersGroup.classList.add('hidden');
        passengersInput.value = '1';
    }
}

/**
 * Gera o comparativo visual de emissões entre diferentes meios de transporte
 * para a mesma distância efetiva.
 */
function renderComparison(effectiveDistance, selectedKey, selectedCO2) {
    const entries = Object.entries(TRANSPORT_MODES).map(([key, mode]) => {
        const co2 = effectiveDistance * mode.factor;
        return { key, label: mode.label, co2 };
    });

    entries.sort((a, b) => a.co2 - b.co2);
    const maxCO2 = Math.max(...entries.map((item) => item.co2), selectedCO2, 0.01);

    comparisonEl.innerHTML = '';

    const heading = document.createElement('h3');
    heading.textContent = `Comparativo para ${formatNumberBR(effectiveDistance, effectiveDistance % 1 === 0 ? 0 : 1)} km:`;
    comparisonEl.appendChild(heading);

    const list = document.createElement('div');
    list.className = 'comparison-list';

    entries.forEach((item) => {
        const isCurrent = item.key === selectedKey;
        const displayCO2 = isCurrent ? selectedCO2 : item.co2;
        const widthPercent = Math.min(100, (displayCO2 / maxCO2) * 100);

        const row = document.createElement('div');
        row.className = `comparison-item${isCurrent ? ' is-current' : ''}`;

        const header = document.createElement('div');
        header.className = 'comparison-header';

        const nameSpan = document.createElement('span');
        nameSpan.textContent = isCurrent ? `${item.label} (sua escolha)` : item.label;

        const valueSpan = document.createElement('span');
        valueSpan.textContent = `${formatNumberBR(displayCO2)} kg CO₂`;

        header.appendChild(nameSpan);
        header.appendChild(valueSpan);

        const track = document.createElement('div');
        track.className = 'comparison-bar-track';

        const fill = document.createElement('div');
        fill.className = 'comparison-bar-fill';
        fill.style.width = `${widthPercent}%`;

        track.appendChild(fill);
        row.appendChild(header);
        row.appendChild(track);
        list.appendChild(row);
    });

    comparisonEl.appendChild(list);
}

transportSelect.addEventListener('change', () => {
    clearError();
    syncDependentFields();
});

form.addEventListener('submit', (event) => {
    event.preventDefault();
    clearError();

    const distance = parseFloat(distanceInput.value);
    const transportKey = transportSelect.value;
    const mode = TRANSPORT_MODES[transportKey];
    const profileMultiplier = parseFloat(profileSelect.value);
    const passengers = parseInt(passengersInput.value, 10);

    if (!Number.isFinite(distance) || distance <= 0) {
        showError('Informe uma distância válida maior que zero.');
        distanceInput.focus();
        return;
    }

    if (!mode) {
        showError('Selecione um meio de transporte para calcular o impacto.');
        transportSelect.focus();
        return;
    }

    if (!Number.isFinite(profileMultiplier) || profileMultiplier <= 0) {
        showError('Selecione um perfil de trajeto válido.');
        profileSelect.focus();
        return;
    }

    if (mode.supportsPassengers && (!Number.isInteger(passengers) || passengers < 1)) {
        showError('Informe pelo menos 1 passageiro no veículo.');
        passengersInput.focus();
        return;
    }

    const effectiveDistance = roundTripInput.checked ? distance * 2 : distance;
    const effectiveMultiplier = mode.supportsTraffic ? profileMultiplier : 1.0;
    const effectivePassengers = mode.supportsPassengers ? passengers : 1;

    const totalCO2 = (effectiveDistance * mode.factor * effectiveMultiplier) / effectivePassengers;
    const treesRequired = Math.ceil(totalCO2 / TREE_ABSORPTION_KG_PER_YEAR);
    const treeLabel = treesRequired === 1 ? 'árvore' : 'árvores';

    co2ResultEl.textContent = formatNumberBR(totalCO2);
    treesResultEl.textContent = `${treesRequired} ${treeLabel}`;
    ecoTipEl.textContent = mode.tip;

    renderComparison(effectiveDistance, transportKey, totalCO2);

    resultSection.classList.remove('hidden', 'animate-in');
    // Força reflow para reiniciar a animação a cada novo cálculo
    void resultSection.offsetWidth;
    resultSection.classList.add('animate-in');
});

resetBtn.addEventListener('click', () => {
    form.reset();
    clearError();
    syncDependentFields();
    resultSection.classList.add('hidden');
    resultSection.classList.remove('animate-in');
    comparisonEl.innerHTML = '';
    distanceInput.focus();
});

syncDependentFields();
