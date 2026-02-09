async function processKMZ() {
  try {
    const surveiFile = document.getElementById("kmzSurvei").files[0];
    const designFile = document.getElementById("kmzDesign").files[0];

    if (!surveiFile || !designFile) {
      alert("KMZ belum lengkap");
      return;
    }

    console.log("Parsing SURVEI...");
    const survei = await parseKMZ(surveiFile);

    console.log("Parsing DESIGN...");
    const design = await parseKMZ(designFile);

    console.log("Analyzing...");
    const hasil = analyzeHP(survei, design);

    const tbody = document.querySelector("#resultTable tbody");
    tbody.innerHTML = "";

    hasil.forEach(r => {
      const tr = document.createElement("tr");
      tr.innerHTML = `
        <td>${r.id}</td>
        <td>${r.status}</td>
        <td>${r.alasan}</td>
      `;
      tbody.appendChild(tr);
    });

    console.log("DONE:", hasil.length);

  } catch (e) {
    console.error(e);
    alert("ERROR: cek console");
  }
}
