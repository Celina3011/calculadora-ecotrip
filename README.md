# 🌱 Calculadora EcoTrip

Aplicação web simples e responsiva para simular a pegada de carbono (emissões de CO₂) de viagens de acordo com a distância, o meio de transporte escolhido e as condições do trajeto.

> 💡 **Sobre o projeto:** Este foi um dos meus primeiros projetos de desenvolvimento web, criado originalmente para finalizar um bootcamp da **DIO (Digital Innovation One)** e posteriormente aprimorado com novas funcionalidades, melhorias de acessibilidade e responsividade.

## ✨ Funcionalidades

- **Cálculo de emissão de CO₂ (kg):** estima o impacto ambiental com base na distância percorrida (aceita valores decimais) e opção de **ida e volta**.
- **Diversos meios de transporte:** Carro a Gasolina, Carro Flex (Etanol), Carro Elétrico, Moto, Ônibus Intermunicipal, Trem / Metrô, Avião e Bicicleta / A pé.
- **Divisão por passageiros (carona):** para veículos individuais, permite informar o número de ocupantes para dividir a emissão por pessoa.
- **Perfil de trajeto inteligente:** ajusta o consumo conforme o trânsito (*Normal*, *Urbano Intenso* ou *Rodovia Livre*) apenas nos modais em que isso se aplica.
- **Compensação ambiental:** calcula quantas árvores seriam necessárias por ano para absorver o CO₂ emitido (estimativa de 15 kg de CO₂/árvore/ano).
- **Comparativo entre modais:** exibe barras comparativas com a emissão estimada em todos os meios de transporte para a mesma distância.
- **Dicas sustentáveis e validação acessível:** mensagens de erro inline, formatação numérica em `pt-BR` e suporte a leitores de tela (`aria-live`).

## 🛠️ Tecnologias Utilizadas

- **HTML5** semântico e acessível
- **CSS3** com variáveis CSS, Flexbox, animações e layout responsivo
- **JavaScript (ES6+)** puro (sem dependências externas)

## 📊 Fatores de Emissão Utilizados

Os cálculos utilizam fatores médios aproximados (em kg de CO₂ por km):

| Meio de Transporte | Fator (kg CO₂/km) |
| --- | :---: |
| Bicicleta / A pé | `0,00` |
| Trem / Metrô | `0,01` |
| Ônibus Intermunicipal | `0,03` |
| Carro Elétrico | `0,05` |
| Carro Flex (Etanol) | `0,09` |
| Moto | `0,10` |
| Carro a Gasolina | `0,18` |
| Avião | `0,25` |

> **Fórmula:** `(Distância × Fator do Transporte × Multiplicador de Trânsito) ÷ Passageiros`

## 🚀 Como Executar

1. Clone este repositório:
   ```bash
   git clone https://github.com/Celina3011/calculadora-ecotrip.git
   ```
2. Abra o arquivo `index.html` diretamente no navegador (ou utilize uma extensão como **Live Server**).
