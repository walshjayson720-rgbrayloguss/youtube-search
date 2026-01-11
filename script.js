const INSTANCES = [
  "https://invidious.lunar.icu",
  "https://vid.puffyan.us",
  "https://invidious.privacydev.net"
];

async function search() {
  const query = document.getElementById("searchInput").value.trim();
  if (!query) return;

  const results = document.getElementById("results");
  results.innerHTML = "<p>Loading...</p>";

  for (const instance of INSTANCES) {
    try {
      const res = await fetch(
        `${instance}/api/v1/search?q=${encodeURIComponent(query)}&type=video`
      );

      if (!res.ok) throw new Error("Bad response");

      const data = await res.json();
      if (!data.length) throw new Error("No results");

      results.innerHTML = "";

      data.slice(0, 12).forEach(video => {
        results.innerHTML += `
          <div class="video">
            <iframe
              src="https://www.youtube.com/embed/${video.videoId}"
              frameborder="0"
              allowfullscreen>
            </iframe>
            <h3>${video.title}</h3>
          </div>
        `;
      });

      return; // SUCCESS — stop trying others
    } catch (err) {
      console.warn(`Failed using ${instance}`);
    }
  }

  results.innerHTML = "<p>❌ Search failed. Try again later.</p>";
}

function toggleTheme() {
  document.body.classList.toggle("light");
}
