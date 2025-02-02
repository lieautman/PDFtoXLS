import pdfToText from "react-pdftotext";
import * as FileSaver from "file-saver";
import * as XLSX from "xlsx";
import PDFtoXLSComponent from "./PDFtoXLSComponent";

function findThirdOccurrenceIndex(words) {
  const regex = /^\d{2}\.\d{2}%$/; // Matches "xx.xx%" format
  let count = 0;

  for (let i = 0; i < words.length; i++) {
    if (regex.test(words[i])) {
      count++;
      if (count === 3) {
        return i; // Return the index of the 3rd occurrence
      }
    }
  }

  return -1; // Return -1 if there are less than 3 occurrences
}
function findForthZeroPercentIndex(words) {
  const target = "0.00%"; // The specific string to find
  let count = 0;

  for (let i = 0; i < words.length; i++) {
    if (words[i] === target) {
      count++;
      if (count === 4) {
        return i; // Return the index of the first occurrence
      }
    }
  }

  return -1; // Return -1 if "0.00%" is not found
}
function extractSublist(arr, start, end) {
  return arr.slice(start, end + 1);
}

function excelWork(list, file) {
  //excel data
  const excelData = [];
  excelData.push({
    "Denumire emitent": "Total",
    "ISIN activ": "Total",
    "Simbol emitent": "",
    "Valoare actualizată lei": list.shift(),
    "Pondere în activul total al fondului": list.shift(),
    "Pret inchidere": "",
    "Numar actiuni": ""
  });
  //salvez restul valorilor
  while (list.length > 0) {
    excelData.push({
      "Denumire emitent": list.shift(),
      "ISIN activ": list.shift(),
      "Simbol emitent": "",
      "Valoare actualizată lei": list.shift(),
      "Pondere în activul total al fondului": list.shift(),
      "Pret inchidere": "",
      "Numar actiuni": ""
    });
  }
  //export excel
  const ws = XLSX.utils.json_to_sheet(excelData);
  const wb = { Sheets: { data: ws }, SheetNames: ["data"] };
  const excelBuffer = XLSX.write(wb, {
    bookType: "xlsx",
    type: "array"
  });
  const data = new Blob([excelBuffer], { type: ".xlsx" });
  FileSaver.saveAs(data, file.name.slice(0, -4) + ".xlsx");
}

function extractText(event) {
  for (let i = 0; i < event.target.files.length; i++) {
    let file = event.target.files.item(i);
    pdfToText(file)
      .then((text) => {
        //all text from PDF document
        const match = text.match(/d. Ac.iuni.{100,}e. Obliga.iuni/);
        if (match) {
          //am gasit text intre "d. Acţiuni" si "e. Obligatiuni"
          const textBetweenWords = match[0].trim();
          //reduc spatiile multiple la ;
          const textDividedBySemicolumn = textBetweenWords.replace(
            /\s{2,}/g,
            ";"
          );
          //salvez primele 2 valor
          const list = textDividedBySemicolumn.trim().split(";");
          excelWork(list, file);
        } else {
          //posible file from Generali
          //reduc spatiile multiple la ;
          const textDividedBySemicolumn = text.replace(/\s{2,}/g, ";");
          //salvez primele 2 valor
          const list = textDividedBySemicolumn.trim().split(";");

          const index1 = findThirdOccurrenceIndex(list);
          const indexFirstEntry = index1 - 1;
          const index2 = findForthZeroPercentIndex(list);
          const indexLastEntry = index2 - 2;
          let listOutput = extractSublist(
            list,
            indexFirstEntry,
            indexLastEntry
          );
          excelWork(listOutput, file);

          console.error(
            "No match found. Does the file have d. Acţiuni and e. Obligaţiuni (not important if Generali format)"
          );
        }
      })
      .catch((error) => console.error("Text extraction failed", error));
  }
}

function PDFtoXLSController() {
  return <PDFtoXLSComponent extractText={extractText} />;
}

export default PDFtoXLSController;
