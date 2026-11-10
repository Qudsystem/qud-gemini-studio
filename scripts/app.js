/**
 * PixShop - Main Application Script
 * Optimized logic ported from Chrome Extension
 */

document.addEventListener('DOMContentLoaded', () => {
    initApp();
});

function initApp() {
    const appFrame = document.getElementById('appFrame');
    const overlay = document.getElementById('penrate-loading-overlay');

    // Handle IFrame loading
    appFrame.addEventListener('load', () => {
        console.log('🖼️ PixShop: IFrame loaded, starting cleanup');
        setTimeout(() => {
            hideLoadingOverlay();
            startElementHiding();
        }, 1500);
    });

    // Auto-retry if IFrame fails to connect (detected by timeout)
    const loadTimeout = setTimeout(() => {
        if (!appFrame.dataset.loaded) {
            console.warn('⚠️ PixShop: Connection sluggish, retrying...');
            refreshApp();
        }
    }, 8000);

    appFrame.addEventListener('load', () => {
        appFrame.dataset.loaded = 'true';
        clearTimeout(loadTimeout);
    });

    // Register Service Worker
    registerServiceWorker();

    // Listen for fullscreen changes
    document.addEventListener('fullscreenchange', handleFullscreenChange);
}

// =============================================
// UI Cleaning Logic (Ported & Optimized)
// =============================================

const SELECTORS_TO_HIDE = [
    '.page-header', '[role="banner"]', '.ms-app-header', 'ms-app-header',
    '.v3-left-nav', 'ms-code-assistant-chat', 'ms-app-sidebar', '.ms-sidebar',
    'mat-drawer', 'mat-sidenav', '.mat-sidenav', '.mat-drawer',
    'ms-console-view-selector', 'mat-tab-header', '.mat-tab-header',
    '.floating-toggle-button', '.footer', 'footer', '.ms-app-footer',
    '.mat-toolbar:first-of-type', '[class*="branding"]', '[class*="powered-by"]'
];

function hideUnwantedElements() {
    try {
        const iframe = document.getElementById('appFrame');
        if (iframe.contentDocument || iframe.contentWindow?.document) {
            const iframeDoc = iframe.contentDocument || iframe.contentWindow.document;

            SELECTORS_TO_HIDE.forEach(selector => {
                iframeDoc.querySelectorAll(selector).forEach(el => {
                    if (el.style.display !== 'none') {
                        el.style.setProperty('display', 'none', 'important');
                        el.style.setProperty('visibility', 'hidden', 'important');
                    }
                });
            });

            // Handle bscframe
            iframeDoc.querySelectorAll('iframe[src*="bscframe"]').forEach(frame => {
                frame.style.setProperty('position', 'absolute', 'important');
                frame.style.setProperty('left', '-9999px', 'important');
                frame.style.setProperty('top', '-9999px', 'important');
                frame.style.setProperty('opacity', '0', 'important');
            });

            injectHidingCSS(iframeDoc);
        }
    } catch (e) {
        // CORS restriction is likely
    }
}

function injectHidingCSS(doc) {
    if (doc.getElementById('pixshop-cleaner-styles')) return;

    const style = doc.createElement('style');
    style.id = 'pixshop-cleaner-styles';
    style.textContent = `
        ${SELECTORS_TO_HIDE.join(', ')} {
            display: none !important;
            visibility: hidden !important;
            pointer-events: none !important;
        }
        iframe[src*="bscframe"] {
            position: absolute !important;
            left: -9999px !important;
            top: -9999px !important;
            opacity: 0 !important;
        }
    `;
    doc.head.appendChild(style);
}

// Throttled Observer for dynamic content
let isCleaningScheduled = false;
function startElementHiding() {
    hideUnwantedElements();

    try {
        const iframe = document.getElementById('appFrame');
        const iframeDoc = iframe.contentDocument || iframe.contentWindow.document;

        const observer = new MutationObserver(() => {
            if (isCleaningScheduled) return;
            isCleaningScheduled = true;
            requestAnimationFrame(() => {
                hideUnwantedElements();
                isCleaningScheduled = false;
            });
        });

        observer.observe(iframeDoc.body, { childList: true, subtree: true });

        // Stop observer after a while to save resources
        setTimeout(() => observer.disconnect(), 10000);
    } catch (e) {
        // Fallback to interval if CORS blocks observer
        let count = 0;
        const interval = setInterval(() => {
            hideUnwantedElements();
            if (++count > 10) clearInterval(interval);
        }, 3000);
    }
}

// =============================================
// Interface Controls
// =============================================

function hideLoadingOverlay() {
    const overlay = document.getElementById('penrate-loading-overlay');
    if (overlay) {
        overlay.classList.add('fade-out');
        setTimeout(() => {
            overlay.style.display = 'none';
        }, 600);
    }
}

function toggleFullScreen() {
    const container = document.querySelector('.app-container');
    if (!document.fullscreenElement) {
        if (container.requestFullscreen) container.requestFullscreen();
        else if (container.webkitRequestFullscreen) container.webkitRequestFullscreen();
    } else {
        if (document.exitFullscreen) document.exitFullscreen();
    }
}

function handleFullscreenChange() {
    const container = document.querySelector('.app-container');
    if (document.fullscreenElement) container.classList.add('fullscreen');
    else container.classList.remove('fullscreen');
}

function refreshApp() {
    const overlay = document.getElementById('penrate-loading-overlay');
    const iframe = document.getElementById('appFrame');
    overlay.classList.remove('fade-out');
    overlay.style.display = 'flex';
    iframe.src = iframe.src;
}

// =============================================
// Infrastructure
// =============================================

async function registerServiceWorker() {
    if ('serviceWorker' in navigator) {
        try {
            await navigator.serviceWorker.register('/service-worker.js');
        } catch (e) {
            console.warn('SW registration skipped');
        }
    }
}

window.toggleFullScreen = toggleFullScreen;
window.refreshApp = refreshApp;
