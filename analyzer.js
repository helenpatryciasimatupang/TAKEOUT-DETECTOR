function analyzeHP(survei, design) {
  const hasil = [];

  survei.features.forEach(hp => {
    let match = false;

    design.features.forEach(d => {
      const jarak = turf.distance(hp, d, { units: "meters" });
      if (jarak < 5) match = true;
    });

    hasil.push({
      id: hp.properties.name,
      status: match ? "MATCH" : "TAKEOUT",
      alasan: match ? "-" : "TIDAK ADA DI DESIGN"
    });
  });

  return hasil;
}
