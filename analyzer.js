function analyzeHP(survei, design) {
  const result = [];

  survei.features.forEach(hp => {
    const id = hp.properties.name;
    const match = design.features.find(d =>
      turf.booleanEqual(hp.geometry, d.geometry)
    );

    if (!match) {
      const alasan = [];

      if (hp.properties.distance > 250) alasan.push("JARAK > 250M");
      if (hp.properties.splitter === "FULL") alasan.push("SPLITTER FULL");
      if (hp.properties.cross_road > 8) alasan.push("NYEBRANG JALAN");
      if (hp.properties.cross_river === true) alasan.push("CROSS SUNGAI");

      result.push({
        id,
        status: "TAKEOUT",
        alasan: alasan.join(", ")
      });
    } else {
      result.push({
        id,
        status: "MATCH",
        alasan: "-"
      });
    }
  });

  return result;
}
