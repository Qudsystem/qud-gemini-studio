document.addEventListener('DOMContentLoaded', function () {
    const openBtn = document.getElementById('open-studio-btn');
    if (openBtn) {
        openBtn.addEventListener('click', function () {
            chrome.tabs.create({
                url: 'https://ai.studio/apps/drive/1u11BlKEmCusmNyUX3YIWFtPOML-7vXvU'
            });
        });
    }
});
