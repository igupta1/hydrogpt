/**
 * See How Your AI Usage Impacts the Environment - Background Script
 * ==================================================================
 * This script handles extension initialization and background tasks.
 */

chrome.runtime.onInstalled.addListener((details) => {
  console.log("See How Your AI Usage Impacts the Environment installation type:", details.reason);
  
  // Different handling for install vs. update
  if (details.reason === 'install') {
    // Fresh install
    console.log("Fresh install - initializing storage");
    chrome.storage.local.set({ 
      chatgptLogs: [], 
      extensionVersion: chrome.runtime.getManifest().version 
    });
  } else if (details.reason === 'update') {
    // Handle upgrade - preserve existing data
    console.log("Extension update detected - preserving data");
    
    try {
      chrome.storage.local.get(['chatgptLogs', 'extensionVersion'], (result) => {
        // Check for runtime errors
        if (chrome.runtime.lastError) {
          console.error("Error accessing storage during update:", chrome.runtime.lastError);
          return;
        }

        // Store the new version
        const oldVersion = result.extensionVersion || '0.0';
        const newVersion = chrome.runtime.getManifest().version;
        
        console.log(`Updating from version ${oldVersion} to ${newVersion}`);
        
        // Extra log to debug upgrade path
        console.log("Existing data:", {
          hasLogs: !!result.chatgptLogs,
          logsIsArray: Array.isArray(result.chatgptLogs),
          logsCount: Array.isArray(result.chatgptLogs) ? result.chatgptLogs.length : 0
        });
        
        // Make sure chatgptLogs exists and is valid
        if (!result.chatgptLogs || !Array.isArray(result.chatgptLogs)) {
          console.warn("Invalid logs format detected during update, repairing...");
          chrome.storage.local.set({ 
            chatgptLogs: [], 
            extensionVersion: newVersion 
          });
        } else {
          // Just update the version while preserving logs
          chrome.storage.local.set({ 
            extensionVersion: newVersion 
          });
        }
      });
    } catch (err) {
      console.error("Critical error during update:", err);
    }
  }
});

// Handle message from content script to open dashboard
chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
  if (message.action === "openDashboard") {
    // Open the dashboard page in a new tab
    chrome.tabs.create({ url: chrome.runtime.getURL('dashboard.html') });
    console.log("Opened dashboard in new tab");
    return true;
  }
});

// Handle extension icon click to open dashboard
chrome.action.onClicked.addListener(() => {
  chrome.tabs.create({ url: chrome.runtime.getURL('dashboard.html') });
  console.log("Extension icon clicked - opened dashboard");
});