/**
 * See How Your AI Usage Impacts the Environment - Dashboard Script
 * =================================================================
 * This script handles the dashboard page functionality including loading,
 * displaying usage logs and environmental metrics.
 *
 * Note: energy-calculator.js is loaded before this file
 */

/**
 * Safely access chrome.storage API
 * Returns null if not available
 */
const getChromeStorage = () => {
  try {
    if (typeof chrome !== 'undefined' && chrome.storage && chrome.storage.local) {
      return chrome.storage.local;
    }
  } catch (e) {
    console.error("Error accessing chrome storage API:", e);
  }
  return null;
};

document.addEventListener('DOMContentLoaded', function() {
  try {
    // Set up tab switching
    document.getElementById('lifetime-tab').addEventListener('click', function() {
      switchTab('lifetime');
    });

    document.getElementById('today-tab').addEventListener('click', function() {
      switchTab('today');
    });

    document.getElementById('methodology-tab').addEventListener('click', function() {
      switchTab('methodology');
    });

    document.getElementById('learn-more-tab').addEventListener('click', function() {
      switchTab('learn-more');
    });

    // Initialize with empty data
    updateTodayStats([]);
    updateLifetimeStats([]);

    // Load logs from storage
    loadLogs();
  } catch(err) {
    console.error("Error initializing dashboard:", err);
  }
});

/**
 * Switches between lifetime and today tabs
 * @param {string} tabId - The ID of the tab to switch to ('lifetime' or 'today')
 */
function switchTab(tabId) {
  // Hide all tabs
  document.querySelectorAll('.content-section').forEach(container => {
    container.classList.remove('active');
  });
  
  // Remove active class from all tab buttons
  document.querySelectorAll('.tab').forEach(tab => {
    tab.classList.remove('active');
  });
  
  // Show the selected tab
  document.getElementById(`${tabId}-stats`).classList.add('active');
  document.getElementById(`${tabId}-tab`).classList.add('active');
}

/**
 * Loads logs from Chrome storage and updates the UI
 */
function loadLogs() {
  try {
    const storage = getChromeStorage();
    if (!storage) {
      console.warn('Chrome storage API not available - showing empty stats');
      return;
    }
    
    storage.get(['chatgptLogs', 'extensionVersion'], function(result) {
      const lastError = chrome.runtime && chrome.runtime.lastError;
      if (lastError) {
        console.error('Error loading logs:', lastError);
        return;
      }
      
      const logs = result.chatgptLogs || [];
      const version = result.extensionVersion || 'unknown';
      console.log(`Loaded ${logs.length} logs from storage (extension version: ${version})`);
      
      if (!Array.isArray(logs)) {
        console.error('Invalid logs format in storage!');
        updateTodayStats([]);
        updateLifetimeStats([]);
        return;
      }
      
      updateTodayStats(logs);
      updateLifetimeStats(logs);
    });
  } catch (e) {
    console.error('Error in loadLogs:', e);
    updateTodayStats([]);
    updateLifetimeStats([]);
  }
}

/**
 * Updates the "Today" section with statistics for today
 * @param {Array} logs - Array of conversation log entries
 */
function updateTodayStats(logs) {
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  
  const todayLogs = logs.filter(log => new Date(log.timestamp) >= today);
  
  let todayMessages = todayLogs.length;
  let todayEnergyUsage = 0;
  
  if (todayLogs.length === 0) {
    todayEnergyUsage = 0;
  } else {
    todayLogs.forEach(log => {
      const logEnergy = log.energyUsage || 0;
      todayEnergyUsage += logEnergy;
    });
  }
  
  document.getElementById('today-messages').textContent = formatNumber(todayMessages);
  document.getElementById('today-energy').textContent = formatNumber(todayEnergyUsage.toFixed(2), true);
}

/**
 * Updates the lifetime statistics section
 * @param {Array} logs - Array of conversation log entries
 */
function updateLifetimeStats(logs) {
  let totalMessages = logs.length;
  let totalEnergyUsage = 0;
  
  if (logs.length === 0) {
    totalEnergyUsage = 0;
  } else {
    logs.forEach(log => {
      const logEnergy = log.energyUsage || 0;
      totalEnergyUsage += logEnergy;
    });
  }
  
  document.getElementById('lifetime-messages').textContent = formatNumber(totalMessages);
  document.getElementById('lifetime-energy').textContent = formatNumber(totalEnergyUsage.toFixed(2), true);
}

/**
 * Formats numbers with commas for better readability
 * For watt-hour values over 1000, uses k format (e.g., 1.4k)
 * @param {number} num - Number to format
 * @param {boolean} isEnergy - Whether this is an energy value (Wh)
 * @returns {string} Formatted number string
 */
function formatNumber(num, isEnergy = false) {
  const value = parseFloat(num);
  
  // For energy values (Wh) over 1000, use k format
  if (isEnergy && value >= 1000) {
    return (value / 1000).toFixed(1) + 'k';
  }
  
  // Otherwise use comma format
  return value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}

