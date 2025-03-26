/* Auto Clicker for Websites */

// Create a full-screen interface
document.body.style.margin = "0";
document.body.style.overflow = "hidden";

document.body.innerHTML = `
    <div id="header" style="position: fixed; top: 0; left: 0; width: 100%; height: 50px; background: #333; color: white; display: flex; align-items: center; padding: 0 10px; z-index: 9999;">
        <span style="font-size: 18px; font-weight: bold;">AutoClicker</span>
        <input id="search" type="text" placeholder="Search..." style="margin-left: auto; padding: 5px; border: none; outline: none;"/>
        <button id="searchBtn" style="padding: 5px; margin-left: 5px; cursor: pointer;">🔍</button>
    </div>
    <iframe id="siteFrame" style="position: fixed; top: 50px; left: 0; width: 100vw; height: calc(100vh - 50px); border: none;"></iframe>
`;

document.getElementById("searchBtn").addEventListener("click", () => {
    const query = document.getElementById("search").value;
    if (query) {
        document.getElementById("siteFrame").src = `https://search.brave.com/search?q=${encodeURIComponent(query)}`;
    }
});

const iframe = document.getElementById("siteFrame");
iframe.src = "https://example.com"; // Change this to the target website

iframe.onload = function () {
    try {
        const iframeDoc = iframe.contentDocument || iframe.contentWindow.document;
        iframeDoc.body.style.cursor = "pointer"; // Change cursor to indicate interaction
        
        setTimeout(() => {
            const links = iframeDoc.querySelectorAll("a");
            if (links.length > 0) {
                document.getElementById("header").style.display = "none"; // Hide header
                links[0].click(); // Click the first link found
            }
        }, 2000); // Wait 2 seconds before clicking
    } catch (error) {
        console.error("Error accessing iframe contents. Some sites block cross-origin access.");
    }
};
