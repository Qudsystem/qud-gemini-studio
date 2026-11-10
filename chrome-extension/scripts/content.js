// 🚀 PenRate UI Cleaner: v7.0 - Performance Optimized Edition
// Shows loading overlay, cleans UI, then reveals the app!
// ✅ Fixed: MutationObserver throttling, pointer-events, bscframe handling

(function () {
    'use strict';
    console.log('🎨 PenRate: Starting with loading screen (v7.0 - Performance Optimized)');

    // ═══════════════════════════════════════════════════════════════════════
    // 🎬 CREATE LOADING OVERLAY IMMEDIATELY
    // ═══════════════════════════════════════════════════════════════════════

    const createLoadingOverlay = () => {
        // Check if overlay already exists
        if (document.getElementById('penrate-loading-overlay')) return;

        const overlay = document.createElement('div');
        overlay.id = 'penrate-loading-overlay';
        overlay.innerHTML = `
            <div class="brand">✨ PixShop</div>
            <div class="spinner"></div>
            <div class="loading-text">جاري التحميل...</div>
            <div class="progress-bar">
                <div class="progress-fill"></div>
            </div>
        `;

        // Inject immediately at document start
        const target = document.body || document.documentElement;
        if (target) {
            target.insertBefore(overlay, target.firstChild);
        }
    };

    // Create overlay ASAP
    if (document.body) {
        createLoadingOverlay();
    } else {
        // If body doesn't exist yet, wait for it
        const bodyObserver = new MutationObserver(() => {
            if (document.body) {
                createLoadingOverlay();
                bodyObserver.disconnect();
            }
        });
        bodyObserver.observe(document.documentElement, { childList: true });
    }

    // ═══════════════════════════════════════════════════════════════════════
    // 🧹 CSS INJECTION FOR CLEANUP (Performance Optimized)
    // ═══════════════════════════════════════════════════════════════════════

    const style = document.createElement('style');
    style.id = 'penrate-cleaner-v7';
    style.textContent = `
        /* Hide SPECIFIC UI elements only */
        .page-header, [role="banner"], .ms-app-header, ms-app-header,
        .v3-left-nav, ms-code-assistant-chat, ms-app-sidebar, .ms-sidebar,
        mat-drawer, mat-sidenav, .mat-sidenav, .mat-drawer,
        ms-console-view-selector, mat-tab-header, .mat-tab-header,
        .floating-toggle-button, .footer, footer, .ms-app-footer,
        .mat-toolbar:first-of-type {
            display: none !important;
            visibility: hidden !important;
        }

        /* Force iframe fullscreen (EXCLUDE internal frames!) */
        iframe:not([src*="bscframe"]):not([src*="blank"]):not([src*="accounts.google"]) {
            position: fixed !important;
            top: 0 !important;
            left: 0 !important;
            width: 100vw !important;
            height: 100vh !important;
            z-index: 999999 !important;
            border: none !important;
        }

        /* ✅ FIXED: Hide bscframe visually but keep it functional */
        iframe[src*="bscframe"] {
            position: absolute !important;
            left: -9999px !important;
            top: -9999px !important;
            width: 1px !important;
            height: 1px !important;
            opacity: 0 !important;
            /* ❌ NO display:none - keeps iframe functional for Google API */
        }

        html, body {
            margin: 0 !important;
            padding: 0 !important;
            overflow: hidden !important;
        }

        /* ✅ FIXED: Allow interaction with content */
        .mat-drawer-content, .mat-sidenav-content {
            margin-left: 0 !important;
            padding: 0 !important;
            /* ❌ REMOVED pointer-events: none - was blocking interactions */
        }

        .mat-drawer-container, .mat-sidenav-container {
            /* ❌ REMOVED pointer-events: none - was blocking interactions */
        }

        /* Enable interaction with iframe */
        iframe {
            pointer-events: auto !important;
        }
    `;
    (document.head || document.documentElement).appendChild(style);

    // ═══════════════════════════════════════════════════════════════════════
    // 🧹 DOM CLEANUP FUNCTION (Lightweight version)
    // ═══════════════════════════════════════════════════════════════════════

    const cleanupNow = () => {
        const hideSelectors = [
            '.page-header', '.v3-left-nav', 'ms-code-assistant-chat',
            'ms-console-view-selector', '.footer', '.ms-app-header',
            'ms-app-header', 'ms-app-sidebar', '.ms-sidebar',
            'mat-drawer', 'mat-sidenav', '.mat-sidenav', '.mat-drawer',
            'mat-tab-header', '.mat-tab-header', '.floating-toggle-button',
            '.ms-app-footer'
        ];

        hideSelectors.forEach(selector => {
            try {
                document.querySelectorAll(selector).forEach(el => {
                    if (el.style.display !== 'none') {
                        el.style.setProperty('display', 'none', 'important');
                    }
                });
            } catch (e) { /* Ignore */ }
        });

        // ✅ FIXED: Move bscframe off-screen instead of hiding
        document.querySelectorAll('iframe[src*="bscframe"]').forEach(frame => {
            frame.style.setProperty('position', 'absolute', 'important');
            frame.style.setProperty('left', '-9999px', 'important');
            frame.style.setProperty('top', '-9999px', 'important');
            frame.style.setProperty('width', '1px', 'important');
            frame.style.setProperty('height', '1px', 'important');
            frame.style.setProperty('opacity', '0', 'important');
            // ❌ NO display:none - keeps iframe functional
        });

        // Force app iframe fullscreen (exclude internal frames)
        document.querySelectorAll('iframe:not([src*="bscframe"]):not([src*="blank"]):not([src*="accounts.google"])').forEach(iframe => {
            iframe.style.setProperty('position', 'fixed', 'important');
            iframe.style.setProperty('top', '0', 'important');
            iframe.style.setProperty('left', '0', 'important');
            iframe.style.setProperty('width', '100vw', 'important');
            iframe.style.setProperty('height', '100vh', 'important');
            iframe.style.setProperty('z-index', '999999', 'important');
            iframe.style.setProperty('border', 'none', 'important');
            iframe.style.setProperty('display', 'block', 'important');
            iframe.style.setProperty('visibility', 'visible', 'important');
            iframe.style.setProperty('pointer-events', 'auto', 'important');
        });

        // ✅ FIXED: Allow interaction with drawer content
        document.querySelectorAll('.mat-drawer-content, .mat-sidenav-content, .mat-drawer-container, .mat-sidenav-container').forEach(el => {
            el.style.setProperty('margin-left', '0', 'important');
            el.style.setProperty('padding', '0', 'important');
            // ❌ NO pointer-events:none - allows interactions
        });
    };

    // ═══════════════════════════════════════════════════════════════════════
    // 🎬 HIDE LOADING OVERLAY WHEN APP IS READY
    // ═══════════════════════════════════════════════════════════════════════

    const hideLoadingOverlay = () => {
        const overlay = document.getElementById('penrate-loading-overlay');
        if (overlay) {
            overlay.classList.add('fade-out');
            // Remove from DOM after animation
            setTimeout(() => {
                if (overlay.parentNode) {
                    overlay.parentNode.removeChild(overlay);
                }
            }, 600);
            console.log('🎨 PenRate: Loading complete, revealing app!');
        }
    };

    // Check if app iframe is ready
    const checkAppReady = () => {
        const appIframe = document.querySelector('iframe:not([src*="bscframe"]):not([src*="blank"]):not([src*="accounts.google"])');
        return appIframe && appIframe.offsetWidth > 0;
    };

    // ═══════════════════════════════════════════════════════════════════════
    // 🔄 EXECUTION FLOW (Performance Optimized)
    // ═══════════════════════════════════════════════════════════════════════

    // Run initial cleanup
    cleanupNow();

    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', () => {
            createLoadingOverlay();
            cleanupNow();
        });
    }

    window.addEventListener('load', () => {
        cleanupNow();
        // Start checking for app readiness
        let readyCheckCount = 0;
        const readyCheckInterval = setInterval(() => {
            cleanupNow();
            readyCheckCount++;

            if (checkAppReady() || readyCheckCount >= 10) {
                hideLoadingOverlay();
                clearInterval(readyCheckInterval);
            }
        }, 300);
    });

    // ═══════════════════════════════════════════════════════════════════════
    // ✅ FIXED: Throttled MutationObserver (Performance Critical!)
    // ═══════════════════════════════════════════════════════════════════════

    let isCleaningScheduled = false;
    let observerActive = true;

    const observer = new MutationObserver((mutations) => {
        // ✅ Skip if observer is deactivated or cleanup already scheduled
        if (!observerActive || isCleaningScheduled) return;

        // ✅ Only react to significant changes (new elements added)
        const hasRelevantChanges = mutations.some(mutation =>
            mutation.addedNodes.length > 0 &&
            Array.from(mutation.addedNodes).some(node =>
                node.nodeType === 1 && // Element node
                (node.tagName === 'MAT-DRAWER' ||
                    node.tagName === 'MAT-SIDENAV' ||
                    node.tagName === 'MS-APP-HEADER' ||
                    node.classList?.contains('page-header') ||
                    node.classList?.contains('v3-left-nav'))
            )
        );

        if (hasRelevantChanges) {
            isCleaningScheduled = true;
            // ✅ Use requestAnimationFrame for smooth, throttled updates
            requestAnimationFrame(() => {
                cleanupNow();
                isCleaningScheduled = false;
            });
        }
    });

    // ✅ Start observing with limited scope
    if (document.body) {
        observer.observe(document.body, {
            childList: true,
            subtree: true
        });
    } else {
        document.addEventListener('DOMContentLoaded', () => {
            observer.observe(document.body, {
                childList: true,
                subtree: true
            });
        });
    }

    // ✅ FIXED: Stop observer after 3 seconds to prevent performance issues
    setTimeout(() => {
        observerActive = false;
        observer.disconnect();
        console.log('🎨 PenRate: Observer stopped for optimal performance');
    }, 3000);

    // Initial cleanup cycles (first 3 seconds only)
    let count = 0;
    const interval = setInterval(() => {
        cleanupNow();
        if (++count >= 6) clearInterval(interval);
    }, 500);

    // Fallback: Hide overlay after max 4 seconds regardless
    setTimeout(() => {
        hideLoadingOverlay();
    }, 4000);

    console.log('🎨 PenRate: v7.0 loaded - Performance optimized, all features preserved!');

})();
