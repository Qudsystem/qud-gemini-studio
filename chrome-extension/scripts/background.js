/**
 * PenRate UI Cleaner - Background Service Worker
 */

// استماع لتثبيت الإضافة
chrome.runtime.onInstalled.addListener(() => {
    console.log('🎨 PenRate UI Cleaner installed!');
});

// استماع للنقر على أيقونة الإضافة
chrome.action.onClicked.addListener((tab) => {
    // يمكن إضافة وظائف إضافية هنا
    console.log('PenRate UI Cleaner clicked on tab:', tab.url);
});
