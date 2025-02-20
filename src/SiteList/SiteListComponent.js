function SiteListComponent() {
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        height: "30vh"
      }}
    >
      <h2>
        Download the PDF for the pilon 2 data that you are interested in, from
        the providers:
      </h2>
      <a
        href={
          "https://www.pensiibcr.ro/ro/utile/pensia-obligatorie-pilon-2/rapoarte/structura-detaliata-a-portofoliului-de-investitii"
        }
        rel="noreferrer"
        target="_blank"
      >
        BCR
      </a>
      <a
        href={"https://www.nn.ro/rapoarte-financiare#tab-other-4/"}
        rel="noreferrer"
        target="_blank"
      >
        NN
      </a>
      <a
        href={
          "https://www.generali.ro/pensii/pensii-obligatorii/acte-si-rapoarte/date-financiare-fondul-aripi/"
        }
        rel="noreferrer"
        target="_blank"
      >
        Generali
      </a>
      <a
        href={
          "https://www.aztpensii.ro:7777/employer/prc_rap_web_new_49?p_fond=VIITORUL"
        }
        rel="noreferrer"
        target="_blank"
      >
        Allianz Tiriac
      </a>
      <a
        href={
          "https://www.metropolitanlife.ro/pensie-pilon-2/informatii-si-materiale/informatii-financiare/raportare-privind-situatia-detaliata-a-investitiilor/"
        }
        rel="noreferrer"
        target="_blank"
      >
        Metropolitan Life
      </a>
      <a
        href={
          "https://www.carpathiapensii.ro/index.php/rapoarte-carpathia-pensii/structura-detaliata-a-portofoliului-de-investitii-pilon-ii-si-pilon-iii/"
        }
        rel="noreferrer"
        target="_blank"
      >
        Carpathia
      </a>
    </div>
  );
}

export default SiteListComponent;
