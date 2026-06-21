// Fatores de emissão médios (kg de CO2 por km por passageiro)
const emissionFactors = {
    'car-petrol': 0.18,   // Carro a gasolina médio
    'car-electric': 0.05, // Carro elétrico (considerando a matriz energética)
    'bus': 0.03,          // Ônibus intermunicipal ocupado
    'train': 0.01,         // Trem / Metrô
    'plane': 0.25         // Avião comercial por passageiro
};

document.getElementById('ecoForm').addEventListener('submit', function(event) {
    event.preventDefault();

    // Capturando os dados digitados pelo usuário
    const distance = parseFloat(document.getElementById('distance').value);
    const transport = document.getElementById('transport').value);
    const profileMultiplier = parseFloat(document.getElementById('profile').value);

    // Validação simples
    if (isNaN(distance) || distance <= 0) return;

    // Cálculo da pegada de carbono
    // Fórmula: Distância * Fator do Transporte * Multiplicador do Perfil do Trajeto
    const factor = emissionFactors[transport];
    const totalCO2 = distance * factor * profileMultiplier;

    // Cálculo estimado de árvores para compensar (1 árvore absorve cerca de 15kg de CO2/ano)
    const treesRequired = Math.ceil(totalCO2 / 15);

    // Gerando uma dica personalizada baseada no transporte escolhido
    let tip = "";
    if (transport === 'plane') {
        tip = "💡 Dica: Voos curtos geram muito CO₂ na decolagem. Para distâncias menores, considere trens ou ônibus.";
    } else if (transport === 'car-petrol') {
        tip = "💡 Dica: Dividir caronas ou migrar para transporte público reduz consideravelmente essa pegada.";
    } else if (transport === 'car-electric' || transport === 'train') {
        tip = "🌱 Excelente escolha! Meios de transporte eletrificados são ótimas alternativas sustentáveis.";
    } else {
        tip = "💡 Dica: Caminhar ou usar bicicleta para trechos finais da viagem zera as emissões desses percursos!";
    }

    // Exibindo os resultados na tela
    document.getElementById('co2Result').innerText = totalCO2.toFixed(2);
    document.getElementById('treesResult').innerText = treesRequired;
    document.getElementById('ecoTip').innerText = tip;

    // Mostrando a caixinha com o resultado animado/visível
    document.getElementById('result').classList.remove('hidden');
});
