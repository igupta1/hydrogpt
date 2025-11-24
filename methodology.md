# See How Your AI Usage Impacts the Environment - Methodology

This page tries to outline the methodology used by the "See How Your AI Usage Impacts the Environment" extension to calculate energy consumption of LLM interactions.

## Features

- **Real-time Tracking**: Monitors your conversations with ChatGPT and calculates energy consumption based on token usage.
- **Daily & Total Usage**: Tracks both your daily usage and your cumulative impact over time.
- **Community Estimates**: Uses academic research and the EcoLogits methodology to calculate energy consumption.
- **Global Scale Comparison**: Provides context by comparing your usage to global energy consumption of countries and continents.
- **Movable Interface**: The overlay notification can be dragged and positioned anywhere on the screen for convenience.

## How energy consumption of LLMs is calculated

The extension uses community estimates based on academic research and the EcoLogits methodology, modeling the model behind ChatGPT as a large Mixture of Experts (MoE).

### Core methodology

The calculations focus on inference-time energy consumption, which represents the energy used when interacting with an LLM.

Key components:
* **Token-based estimation**: Energy consumption is calculated per output token, using character count as a proxy (roughly 4 characters = 1 token)
* **Real-time calculation**: Energy consumption is calculated as conversations happen based on the per-token estimates

### Energy consumption formula

The energy consumption per token is calculated using the EcoLogits methodology:

```
energyPerToken = ENERGY_ALPHA * activeParamsBillions + ENERGY_BETA
totalEnergy = outputTokens * energyPerToken * PUE
```

Where:
* **ENERGY_ALPHA** = 8.91e-5 Wh/token/B-params (Energy coefficient for model parameters)
* **ENERGY_BETA** = 1.43e-3 Wh/token (Base energy per token)
* **activeParamsBillions** = 60 billion (20% of 300B total parameters)
* **PUE** = 1.2 (Power Usage Effectiveness for data center overhead)

This formula is derived from academic research on LLM energy consumption, scaling with both the number of active parameters and the total tokens processed.

### Assumptions for ChatGPT (GPT-5)

* **Total parameters**: 300 billion parameters
* **Active parameters**: 60 billion (average, range: 30-90B)
* **Activation ratio**: 20% (Mixture of Experts architecture)
* **Quantization**: 4-bit precision
* **Data center PUE**: 1.2
* **GPU configuration**: Estimated 8 GPUs per server, 80GB memory per GPU

## Global Scale Perspective

**New Feature**: The extension now provides a global scale perspective to help visualize what your personal AI usage would mean if everyone in the world consumed the same amount.

### Methodology

The global scale comparison calculates hypothetical worldwide energy consumption based on your daily average usage:

```
dailyAverage = totalLifetimeEnergy / numberOfDaysTracked
globalAnnualConsumption = dailyAverage × worldPopulation × 365 days
```

Where:
* **worldPopulation** = 8.2 billion people (2025 estimate)
* **numberOfDaysTracked** = Days between your first and last tracked conversation
* **globalAnnualConsumption** = Result in TWh (Terawatt-hours) per year

### Geographic Comparisons

The calculated global consumption is then compared against the annual energy consumption of real geographic entities:

**Reference data includes**:
* **Small nations**: Malta (2.3 TWh/year), Luxembourg (5.87 TWh/year), Iceland (19.6 TWh/year)
* **Medium countries**: Singapore (55 TWh/year), Portugal (50 TWh/year), Austria (72 TWh/year)
* **Large countries**: Germany (510 TWh/year), Japan (939 TWh/year), India (1,463 TWh/year), United States (4,065 TWh/year), China (8,539 TWh/year)
* **Continents**: Africa (870 TWh/year), Europe (3,400 TWh/year), Asia (13,500 TWh/year)

**Comparison algorithm**:
* Uses logarithmic distance to find the best match across orders of magnitude
* Provides clear, readable comparisons:
  * When higher: "2.5× more than Malta"
  * When similar: "about the same as Singapore"
  * When lower: "88% of Europe" or "about half of Thailand"
* Uses friendly phrases for common ratios (half, one-third, one-quarter)
* Automatically selects the most appropriate entity for context

**Data sources**:
* International Energy Agency (IEA) - 2024 electricity consumption data
* Enerdata - World Energy Statistics 2024
* Our World in Data - Energy consumption by country
* U.S. Energy Information Administration (EIA) - City-level consumption

### Display Format

The global scale message appears in the "Lifetime" tab and follows this format:

> "You consume **X Wh** per day on average. If everyone in the world consumed as much per day, in a year it would represent **Y TWh** — **Z×** more/less than **[Entity]**'s annual energy consumption (**W TWh**)."

**Examples**:
> "You consume **42.5 Wh** per day on average. If everyone in the world consumed as much per day, in a year it would represent **127.2 TWh** — **2.3×** more than **Singapore**'s annual energy consumption (55 TWh)."

> "You consume **200 Wh** per day on average. If everyone in the world consumed as much per day, in a year it would represent **598.6 TWh** — **about the same as South Korea**'s annual energy consumption (607 TWh)."

> "You consume **1000 Wh** per day on average. If everyone in the world consumed as much per day, in a year it would represent **2993 TWh** — **88% of Europe**'s annual energy consumption (3,400 TWh)."

### Why This Matters

The global scale perspective helps answer the question: *"What if everyone used AI like I do?"*

* **Contextualizes individual impact**: Your personal usage might seem small, but scaled globally it becomes significant
* **Encourages mindful usage**: Understanding potential global impact can inform more conscious AI interaction patterns
* **Provides tangible comparisons**: Comparing to countries/cities makes abstract TWh numbers relatable
* **Highlights scaling concerns**: As AI adoption grows, understanding these projections becomes increasingly important

**Important notes**:
* This is a hypothetical calculation for perspective, not a prediction
* Actual global AI energy consumption depends on many factors (adoption rates, efficiency improvements, etc.)
* The comparison assumes uniform distribution of usage, which is not realistic but useful for illustration

# Conclusion

The extension provides research-based estimates of LLM energy consumption using community estimates and the EcoLogits methodology.

**Important Note**: These are estimates based on available information and academic research. Exact energy measurements would require direct data from model providers, which is currently not publicly available. The need for more transparency from AI providers regarding their actual energy usage remains critical.

Contributions to improve these calculations are welcome. If you have suggestions, corrections, or additional data sources that could enhance the accuracy of the estimates, please open an issue or submit a pull request.

