async function parseKMZ(file) {
  const zip = await JSZip.loadAsync(file);
  const kmlFile = Object.keys(zip.files).find(f => f.endsWith(".kml"));
  const kmlText = await zip.files[kmlFile].async("text");

  const parser = new DOMParser();
  const kmlDoc = parser.parseFromString(kmlText, "text/xml");

  return kmlToGeoJSON(kmlDoc);
}
