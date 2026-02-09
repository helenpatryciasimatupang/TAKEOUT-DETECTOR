async function parseKMZ(file) {
  const zip = await JSZip.loadAsync(file);
  const kmlName = Object.keys(zip.files).find(n => n.endsWith(".kml"));
  const kmlText = await zip.files[kmlName].async("text");

  const parser = new DOMParser();
  const xml = parser.parseFromString(kmlText, "text/xml");

  const placemarks = [...xml.getElementsByTagName("Placemark")];
  const features = [];

  placemarks.forEach(pm => {
    const name = pm.getElementsByTagName("name")[0]?.textContent || "UNKNOWN";
    const coordText = pm.getElementsByTagName("coordinates")[0]?.textContent;

    if (!coordText) return;

    const [lon, lat] = coordText.trim().split(",").map(Number);

    features.push({
      type: "Feature",
      properties: { name },
      geometry: {
        type: "Point",
        coordinates: [lon, lat]
      }
    });
  });

  console.log("Parsed features:", features.length);
  return { type: "FeatureCollection", features };
}
