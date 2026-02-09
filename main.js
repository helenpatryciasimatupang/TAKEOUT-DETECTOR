console.log("MAIN JS LOADED");

async function processKMZ() {
  try {
    alert("TOMBOL KEKLIK");

    const surveiFile = document.getElementById("kmzSurvei").files[0];
    const designFile = document.getElementById("kmzDesign").files[0];

    if (!surveiFile || !designFile) {
      alert("KMZ SURVEI & KMZ DESIGN WAJIB DIISI");
      return;
    }

    const survei = await parseKMZ(surveiFile);
    const design = await parseKMZ(designFile);

    const hasil = analyzeHP(survei, design);

    const tbody = document.getElementById("resultBody");
    tbody.innerHTML = "";

    hasil.forEach(h => {
      const tr = document.createElement("tr");
      tr.innerHTML = `
        <td>${h.id}</td>
        <td>${h.status}</td>
        <td>${h.alasan}</td>
      `;
      tbody.appendChild(tr);
    });

    console.log("SELESAI:", hasil.length);

  } catch (err) {
    console.error(err);
    alert("ERROR, CEK CONSOLE");
  }
}
