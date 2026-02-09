async function parseKMZ(file) {
  const zip = await JSZip.loadAsync(file);
  const kmlFile = Object.keys(zip.files).find(f => f.endsWith(".kml"));
  const kmlText = await zip.files[kmlFile].async("text");

  const parser = new DOMParser();
  const xml = parser.parseFromString(kmlText, "text/xml");

  const placemarks = [...xml.getElementsByTagName("Placemark")];
  const features = [];

  placemarks.forEach(pm => {
    const name = pm.getElementsByTagName("name")[0]?.textContent || "HP";
    const coordNode = pm.getElementsByTagName("coordinates")[0];
    if (!coordNode) return;

    const [lon, lat] = coordNode.textContent.trim().split(",").map(Number);

    features.push({
      type: "Feature",
      properties: { name },
      geometry: {
        type: "Point",
        coordinates: [lon, lat]
      }
    });
  });

  console.log("PARSED:", features.length);
  return { type: "FeatureCollection", features };
}
