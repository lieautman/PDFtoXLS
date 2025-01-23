function PDFtoXLSComponent({ extractText }) {
  return (
    <input
      type="file"
      accept="application/pdf"
      onChange={(event) => extractText(event)}
      multiple
    />
  );
}

export default PDFtoXLSComponent;
