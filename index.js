const fs = require('fs');
const processMIB = require('./mibParser');

// Aquí debes definir el nombre de tu archivo MIB
const MIB_FILENAME = './hpe-dhcp.mib';

// Procesa el archivo MIB y obtiene el mapa OID-Descripción
const oidMap = processMIB(MIB_FILENAME);
console.log('OID-Descripción:', oidMap);

// Función para generar la tabla HTML
function generateTable(data) {
    let tableHTML = '<table>';
    tableHTML += '<tr><th>Name</th><th>OID</th><th>Type</th><th>Max Access</th><th>Indexes</th><th>MIB Module</th><th>Description</th></tr>';

    for (const key in data) {
        const entry = data[key];
        tableHTML += '<tr>';
        tableHTML += `<td>${key}</td>`;
        tableHTML += `<td>${entry.oid}</td>`;
        tableHTML += `<td>${entry.type}</td>`;
        tableHTML += `<td>${entry.maxAccess.trim()}</td>`;
        tableHTML += `<td>${entry.indexes.join(', ')}</td>`;
        tableHTML += `<td>${entry.mibModule}</td>`;
        tableHTML += `<td>${entry.description}</td>`;
        tableHTML += '</tr>';
    }

    tableHTML += '</table>';
    return tableHTML;
}

// Genera el contenido de la tabla
const tableContent = generateTable(oidMap);

// Guarda el contenido de la tabla en un archivo HTML
const htmlOutputFilename = './mib_table.html';
fs.writeFileSync(htmlOutputFilename, generateStyledTable(tableContent));

function generateStyledTable(tableContent) {
    return `
        <html>
        <head>
            <title>MIB Data Table</title>
            <style>
                table {
                    width: 100%;
                    border-collapse: collapse;
                    font-family: Arial, sans-serif;
                }
                
                th, td {
                    padding: 8px;
                    text-align: left;
                    border-bottom: 1px solid #ddd;
                }
                
                th {
                    background-color: #f2f2f2;
                }
                
                tr:hover {
                    background-color: #f5f5f5;
                }
            </style>
        </head>
        <body>
            ${tableContent}
        </body>
        </html>
    `;
}
