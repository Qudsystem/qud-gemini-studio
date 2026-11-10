package com.penrat.studio;

import android.annotation.SuppressLint;
import android.os.Bundle;
import android.os.Handler;
import android.os.Looper;
import android.view.View;
import android.view.animation.AlphaAnimation;
import android.webkit.WebChromeClient;
import android.webkit.WebSettings;
import android.webkit.WebView;
import android.webkit.WebViewClient;
import android.widget.LinearLayout;
import androidx.appcompat.app.AppCompatActivity;

public class MainActivity extends AppCompatActivity {

    private WebView webView;
    private LinearLayout loadingOverlay;
    private boolean isLoadingHidden = false;

    // URL to load - Google AI Studio PixShop
    private static final String TARGET_URL = "https://aistudio.google.com/u/1/apps/bundled/pixshop?showPreview=true&showAssist=false";

    // The Enhanced Magic JS Payload to Clean UI (v7.0 - Performance Optimized)
    private static final String CLEANER_JS = 
        "javascript:(function() {" +
        "    if (window.__pixshopCleaned) return; window.__pixshopCleaned = true;" +
        "    const style = document.createElement('style'); " +
        "    style.textContent = ` " +
        "        .page-header, [role='banner'], .ms-app-header, ms-app-header, " +
        "        .v3-left-nav, ms-code-assistant-chat, ms-app-sidebar, .ms-sidebar, " +
        "        mat-drawer, mat-sidenav, .mat-sidenav, .mat-drawer, " +
        "        ms-console-view-selector, mat-tab-header, .mat-tab-header, " +
        "        .floating-toggle-button, .footer, footer, .ms-app-footer, " +
        "        .mat-toolbar:first-of-type { " +
        "            display: none !important; visibility: hidden !important; " +
        "        } " +
        "        iframe:not([src*='bscframe']):not([src*='blank']):not([src*='accounts.google']) { " +
        "            position: fixed !important; top: 0 !important; left: 0 !important; " +
        "            width: 100vw !important; height: 100vh !important; " +
        "            z-index: 999999 !important; border: none !important; " +
        "        } " +
        "        iframe[src*='bscframe'] { " +
        "            position: absolute !important; left: -9999px !important; top: -9999px !important; " +
        "            width: 1px !important; height: 1px !important; opacity: 0 !important; " +
        "        } " +
        "        html, body { margin: 0 !important; padding: 0 !important; overflow: hidden !important; background: #1e1e1e !important; } " +
        "        .mat-drawer-content, .mat-sidenav-content { margin-left: 0 !important; padding: 0 !important; } " +
        "        iframe { pointer-events: auto !important; } " +
        "    `; " +
        "    (document.head || document.documentElement).appendChild(style); " +
        "    const cleanup = () => { " +
        "        document.querySelectorAll('.page-header, .v3-left-nav, ms-code-assistant-chat, .footer, mat-drawer, mat-sidenav, mat-tab-header, .floating-toggle-button, .ms-app-header, ms-app-header, ms-app-sidebar, .ms-sidebar, .ms-app-footer').forEach(el => { " +
        "            if (el.style.display !== 'none') el.style.setProperty('display', 'none', 'important'); " +
        "        }); " +
        "        document.querySelectorAll('iframe[src*=\"bscframe\"]').forEach(f => { " +
        "            f.style.setProperty('position', 'absolute', 'important'); " +
        "            f.style.setProperty('left', '-9999px', 'important'); " +
        "            f.style.setProperty('opacity', '0', 'important'); " +
        "        }); " +
        "    }; " +
        "    cleanup(); " +
        "    let isScheduled = false; " +
        "    const observer = new MutationObserver((mutations) => { " +
        "        if (isScheduled) return; " +
        "        const hasRelevantChanges = mutations.some(m => m.addedNodes.length > 0); " +
        "        if (hasRelevantChanges) { " +
        "            isScheduled = true; " +
        "            requestAnimationFrame(() => { cleanup(); isScheduled = false; }); " +
        "        } " +
        "    }); " +
        "    observer.observe(document.documentElement, {childList: true, subtree: true}); " +
        "    setTimeout(() => observer.disconnect(), 5000); " +
        "})()";

    @SuppressLint("SetJavaScriptEnabled")
    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        
        if (getSupportActionBar() != null) {
            getSupportActionBar().hide();
        }

        getWindow().getDecorView().setSystemUiVisibility(
            View.SYSTEM_UI_FLAG_LAYOUT_STABLE
            | View.SYSTEM_UI_FLAG_LAYOUT_HIDE_NAVIGATION
            | View.SYSTEM_UI_FLAG_LAYOUT_FULLSCREEN
            | View.SYSTEM_UI_FLAG_HIDE_NAVIGATION
            | View.SYSTEM_UI_FLAG_FULLSCREEN
            | View.SYSTEM_UI_FLAG_IMMERSIVE_STICKY);

        setContentView(R.layout.activity_main);

        webView = findViewById(R.id.webview);
        loadingOverlay = findViewById(R.id.loading_overlay);

        WebSettings webSettings = webView.getSettings();
        
        webSettings.setJavaScriptEnabled(true);
        webSettings.setDomStorageEnabled(true);
        webSettings.setDatabaseEnabled(true);
        webSettings.setBuiltInZoomControls(true);
        webSettings.setDisplayZoomControls(false);
        webSettings.setLoadWithOverviewMode(true);
        webSettings.setUseWideViewPort(true);
        webSettings.setAllowFileAccess(true);
        webSettings.setCacheMode(WebSettings.LOAD_DEFAULT);
        
        // Desktop UA for better AI Studio compatibility
        webSettings.setUserAgentString("Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36");

        webView.setWebChromeClient(new WebChromeClient());
        webView.setWebViewClient(new WebViewClient() {
            @Override
            public void onPageFinished(WebView view, String url) {
                super.onPageFinished(view, url);
                if (url.contains("aistudio.google.com") && !url.contains("accounts.google.com")) {
                    // Inject cleaner script
                    view.evaluateJavascript(CLEANER_JS, null);
                    
                    // Hide loading overlay with fade animation
                    hideLoadingOverlay();
                }
            }
        });

        if (savedInstanceState == null) {
            webView.loadUrl(TARGET_URL);
        }

        // Fallback: Hide loading after max 6 seconds
        new Handler(Looper.getMainLooper()).postDelayed(this::hideLoadingOverlay, 6000);
    }

    private void hideLoadingOverlay() {
        if (!isLoadingHidden && loadingOverlay != null) {
            isLoadingHidden = true;
            
            // Fade out animation
            AlphaAnimation fadeOut = new AlphaAnimation(1.0f, 0.0f);
            fadeOut.setDuration(500);
            fadeOut.setFillAfter(true);
            
            loadingOverlay.startAnimation(fadeOut);
            
            // Hide completely after animation
            new Handler(Looper.getMainLooper()).postDelayed(() -> {
                loadingOverlay.setVisibility(View.GONE);
            }, 500);
        }
    }
    
    @Override
    public void onBackPressed() {
        if (webView.canGoBack()) {
            webView.goBack();
        } else {
            super.onBackPressed();
        }
    }
}

