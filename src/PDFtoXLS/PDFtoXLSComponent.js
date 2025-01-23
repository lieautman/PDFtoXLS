function PDFtoXLSComponent({ extractText }) {
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        height: "100vh"
      }}
    >
      <h1 style={{ padding: "50px" }}>
        Upload one or more files with the specific format.
      </h1>
      <input
        type="file"
        accept="application/pdf"
        onChange={(event) => extractText(event)}
        multiple
      />
    </div>
  );
}

export default PDFtoXLSComponent;
