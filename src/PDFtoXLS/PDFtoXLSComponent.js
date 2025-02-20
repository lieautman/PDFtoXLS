function PDFtoXLSComponent({ extractText }) {
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        height: "70vh"
      }}
    >
      <h1 style={{ padding: "50px" }}>
        Upload one or more files with the specific format, downloaded from the
        providers above.
      </h1>
      <input
        type="file"
        accept="application/pdf"
        onChange={(event) => extractText(event)}
        multiple
      />
      <h2 style={{ padding: "50px" }}>
        The files downloaded have the data parsed into Excel format
      </h2>
    </div>
  );
}

export default PDFtoXLSComponent;
