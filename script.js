
const GOOGLE_SHEET_CSV_URL = "https://docs.google.com/spreadsheets/d/e/2PACX-1vS6bVa-HAWvu1pZND3pDlhHVFD8rJxpQ1eBOp_Jwcv4WPJAZ8fMe54gnvQTKEco1g7cWR9EHHROU18p/pub?output=csv";

// Ejecutar automáticamente al cargar la página
document.addEventListener("DOMContentLoaded", cargarInterconsultas);

async function cargarInterconsultas() {
    const loadingEl = document.getElementById('loading');
    const errorEl = document.getElementById('error');
    const containerEl = document.getElementById('cards-container');
    
    loadingEl.style.display = "block";
    errorEl.style.display = "none";
    containerEl.innerHTML = "";

    try {
        const response = await fetch(GOOGLE_SHEET_CSV_URL);
        if (!response.ok) throw new Error("Error al obtener datos");
        
        const csvText = await response.text();
        const listaCasos = csvToJSON(csvText);

        if (listaCasos.length === 0) {
            loadingEl.innerText = "No se encontraron interconsultas procesadas aún.";
            return;
        }

        loadingEl.style.display = "none";



        listaCasos.forEach(caso => {
            const card = document.createElement('div');
            card.className = 'report-card';
            
            card.innerHTML = `
                <div class="card-header">
                    <div><strong>Fecha:</strong> ${caso["Fecha"] || 'No especificada'}</div>
                    <div><strong>Origen:</strong> ${caso["Correo Proveniente"] || 'No especificado'}</div>
                </div>
                <div class="card-body">
                    ${formatearTextoIA(caso["Resultado Analisis"])}
                </div>
            `;
            containerEl.appendChild(card);
        });

    } catch (error) {
        console.error(error);
        loadingEl.style.display = "none";
        errorEl.style.display = "block";
    }
}


function csvToJSON(csv) {
    const rows = [];
    let currentRow = [""];
    let dentroDeComillas = false;

    // Recorremos el CSV carácter por carácter para respetar los saltos de línea internos
    for (let i = 0; i < csv.length; i++) {
        let char = csv[i];
        let nextChar = csv[i + 1];

        if (char === '"') {
            dentroDeComillas = !dentroDeComillas;
            continue; // Saltamos las comillas exteriores
        }

        if (char === ',' && !dentroDeComillas) {
            currentRow.push("");
        } else if ((char === '\n' || char === '\r') && !dentroDeComillas) {
            if (char === '\r' && nextChar === '\n') i++; // Evitamos doble salto en Windows
            rows.push(currentRow);
            currentRow = [""];
        } else {
            currentRow[currentRow.length - 1] += char;
        }
    }
    
    if (currentRow.length > 1 || currentRow[0] !== "") {
        rows.push(currentRow);
    }

    if (rows.length < 2) return [];

    // Extraemos las cabeceras limpias
    const headers = rows[0].map(h => h.trim());
    const result = [];

    // Armamos los objetos vinculando columnas
    for (let i = 1; i < rows.length; i++) {
        let row = rows[i];
        let obj = {};
        headers.forEach((header, index) => {
            obj[header] = row[index] ? row[index].trim() : "";
        });
        result.push(obj);
    }
    return result.reverse(); 
}


function formatearTextoIA(texto) {
    if (!texto) return "Sin datos analizados.";
    return texto.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>');
}