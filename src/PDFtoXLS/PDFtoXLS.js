import pdfToText from "react-pdftotext";
import * as FileSaver from "file-saver";
import * as XLSX from "xlsx";

function extractText(event) {
  for (let i = 0; i < event.target.files.length; i++) {
    let file = event.target.files.item(i);
    pdfToText(file)
      .then((text) => {
        //all text from PDF document
        const match = text.match(/d\. Acţiuni(.*?)e\. Obligatiuni/);
        if (match) {
          //excel data
          const excelData = [];
          //am gasit text intre "d. Acţiuni" si "e. Obligatiuni"
          const textBetweenWords = match[1].trim();

          //reduc spatiile multiple la ;
          const textDividedBySemicolumn = textBetweenWords.replace(
            /\s{2,}/g,
            ";"
          );
          //salvez primele 2 valor
          const list = textDividedBySemicolumn.trim().split(";");
          excelData.push({
            "Valoare actualizată lei": list.shift(),
            "Pondere în activul total al fondului": list.shift()
          });
          //salvez restul valorilor
          while (list.length > 0) {
            excelData.push({
              "Denumire emitent": list.shift(),
              "ISIN activ": list.shift(),
              "Valoare actualizată lei": list.shift(),
              "Pondere în activul total al fondului": list.shift()
            });
          }
          //console.log(excelData);
          //export excel
          const ws = XLSX.utils.json_to_sheet(excelData);
          const wb = { Sheets: { data: ws }, SheetNames: ["data"] };
          const excelBuffer = XLSX.write(wb, {
            bookType: "xlsx",
            type: "array"
          });
          const data = new Blob([excelBuffer], { type: ".xlsx" });
          FileSaver.saveAs(data, file.name.slice(0, -4) + ".xlsx");
        } else {
          console.error(
            "No match found. Does the file have d. Acţiuni and e. Obligatiuni"
          );
        }
      })
      .catch((error) => console.error("Text extraction failed", error));
  }
}

function PDFtoXLS() {
  return (
    <div className="App">
      <header className="App-header">
        <input
          type="file"
          accept="application/pdf"
          onChange={(event) => extractText(event)}
          multiple
        />
      </header>
    </div>
  );
}

export default PDFtoXLS;
