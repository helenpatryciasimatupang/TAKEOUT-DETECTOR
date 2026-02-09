function analyzeHP(survei, design) {
  const hasil = [];

  survei.features.forEach(hp => {
    let match = false;

    design.features.forEach(d => {
      const dist = turf.distance(hp, d, { units: "meters" });
      if (dist < 5) match = true; // toleransi 5 meter
    });

    hasil.push({
      id: hp.properties.name,
      status: match ? "MATCH" : "TAKEOUT",
      alasan: match ? "-" : "TIDAK ADA DI DESIGN"
    });
  });

  return hasil;
}
