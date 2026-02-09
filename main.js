async function processKMZ() {
  const surveiFile = document.getElementById("kmzSurvei").files[0];
  const designFile = document.getElementById("kmzDesign").files[0];

  const survei = await parseKMZ(surveiFile);
  const design = await parseKMZ(designFile);

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
}
