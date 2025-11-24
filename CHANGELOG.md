# Changelog

All notable changes to the "See How Your AI Usage Impacts the Environment" extension will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [2.3] - 2025-11-24

### Added
- **Added "Methodology" tab**
  - New dedicated tab explaining the Community Estimates methodology
  - Displays energy consumption formulas and calculations
  - Includes model assumptions (GPT-5: 300B parameters, MoE architecture)
  - Links to EcoLogits methodology and data sources
  - Beautiful formatting matching the dark theme
  - Professional presentation of technical information

- **Added energy comparison placeholders**
  - 4 placeholder comparison items under "Today" tab
  - 4 placeholder comparison items under "Lifetime" tab
  - Ready for team to add custom comparisons (e.g., "X Wh = Y toasters")
  - Dashed border design matching UI theme
  - Clearly labeled for team implementation

### Removed
- **Removed Global Scale Perspective section**
  - Removed global scale comparison from Lifetime tab
  - Removed `global-scale.js` dependency
  - Simplified dashboard focus on direct energy metrics

- **Removed branding elements**
  - Removed "View methodology" button from header
  - Removed disclaimer text from footer
  - Removed GitHub contributions text from Methodology tab

### Changed
- **Replaced extension icons with placeholders**
  - All icon files (16x16, 32x32, 48x48, 128x128) now use simple gray placeholders
  - Dashed border design matching the UI theme
  - Ready for designer to create final branded icons

- **Updated all "AI Impact Tracker" references**
  - Changed to "See How Your AI Usage Impacts the Environment" throughout codebase
  - Updated in comments, documentation, and all user-facing text
  - Consistent branding across all files
- **Rebranded extension**
  - Rebranded extension with new name "See How Your AI Usage Impacts the Environment"
  - Updated all UI text and documentation

- **Redesigned with ChatGPT dark mode theme**
  - Applied dark color scheme matching ChatGPT's interface
  - Background: `#212121`, Cards: `#2f2f2f`, Text: `#ececf1`
  - Improved visual consistency for ChatGPT users
  - Better readability with dark theme

- **Added logo/icon placeholders**
  - Replaced all icons and logos with clearly marked placeholders
  - Dashed border boxes with "LOGO" and "ICON" labels
  - Ready for designer to add final branding assets

- **Added "Learn More" tab**
  - New educational section in dashboard
  - Video placeholder with clear instructions for embedding
  - Space for educational content about AI's environmental impact

- **Replaced popup with full-page dashboard**
  - Created new `dashboard.html` and `dashboard.js` for a dedicated web page
  - Clicking the notification on ChatGPT now opens a new tab with the dashboard
  - Clicking the extension icon opens the dashboard
  - Better user experience with more space for information display
  - All statistics and information from the popup are now on the dashboard page

### Removed
- **Removed popup functionality**
  - Removed `popup.html` functionality (file kept for reference but not used)
  - Removed `popup.js` logic related to popup display (dashboard.js now handles this)
  - Popup no longer opens when clicking extension icon or notification

- **Removed Sam Altman's estimation method**
  - Extension now uses only community estimates based on EcoLogits methodology
  - Removed estimation method selector dropdown from UI
  - Simplified codebase by removing dual-method logic
  
- **Removed environmental equivalents**
  - Removed YouTube streaming time comparison
  - Removed 60W light bulb runtime comparison
  - Removed phone charges comparison
  - Removed elevator travel comparison
  - Focus is now on direct energy (Wh) measurements and global scale comparison

### Updated
- Updated `background.js` to handle opening dashboard in new tab
- Updated `content.js` to open dashboard instead of popup
- Updated `manifest.json` to remove popup reference
- Simplified UI with focus on energy consumption (Wh) and global scale perspective
- Updated methodology.md to reflect single estimation method
- Updated README.md to describe new features

## [2.2] - 2025-10-17

### Changed
- **Updated model to GPT-5 specifications**
  - Total parameters: 440B → 300B
  - Active parameters: 55B → 60B (average, range: 30-90B)
  - Activation ratio: 12.5% → 20%
  - GPU requirements: 4 GPUs → 3 GPUs
  - Energy per 100 tokens: ~4.15 Wh → ~3.32 Wh (community method)

### Updated
- Updated energy-calculator.js with GPT-5 parameters
- Updated all test files with new expected values
- Updated methodology.md with GPT-5 specifications
- Updated popup.html tooltips to reflect new model
- Updated TESTING.md with new energy benchmarks

## [2.1] - 2025-10-17

### Changed
- **Replaced water consumption metric with light bulb runtime** (Issue #16)
  - Changed from abstract "water evaporated" to relatable "60W bulb runtime"
  - Updated emoji from 💧 to 💡
  - New metric shows runtime in seconds/minutes/hours based on value
  - Benefits: More intuitive, direct energy comparison, no regional variance
  - Formula: `lightBulbMinutes = (energyWh / 60) * 60`

### Updated
- Updated manifest description to reflect new metrics
- Updated methodology.md with light bulb runtime explanation
- Updated TESTING.md to reflect new metric expectations

## [2.0] - 2025-10-17

### Removed
- **Removed email collection feature** (Issue #15)
  - Removed email input overlay and all related code
  - Simplified lifetime stats display
  - No more data collection or storage of personal information

### Changed
- Improved privacy by removing all user data collection

## [1.9] - 2025-10-17

### Fixed
- **Fixed critical energy calculation bug** (Issue #13)
  - Corrected popup.js calculation that was underestimating by 5.46x
  - Energy values now correctly show ~4.15 Wh per 100 tokens (was 0.76 Wh)
  - Recalculation when switching estimation methods now works properly

### Improved
- **Eliminated code duplication** (Issue #14)
  - Created shared `energy-calculator.js` module
  - Both content script and popup now use same calculation logic
  - Ensures consistency across all components
  - Easier to maintain and update

### Added
- Comprehensive testing documentation in TESTING.md
- Verification scripts for calculation accuracy

## [1.8] - 2025-10-15

### Added
- Initial release with basic energy tracking
- Support for ChatGPT (chatgpt.com)
- Dual estimation methods (Community estimates vs Sam Altman's estimation)
- Environmental equivalents:
  - YouTube streaming time
  - Water consumption (replaced in v2.1)
  - Phone charges
  - Elevator travel
- Daily and lifetime statistics tracking
- Draggable notification widget
- Dark mode support
