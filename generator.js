
// Generating design from data
// Supports
//   - puml 
//     - message lines

function generateDesign(data) {
    var jsonData = convertCsvToJson(data);
    let design = generatePuml(jsonData);
    return design;
}

function convertCsvToJson(csvContent) {
    const data = csvContent.split(/\r?\n/).map((line) => {
        const [sender, arrow, receiver, message] = line.split(',');
        return {
            sender: sender.trim(),
            arrow: arrow.trim(),
            receiver: receiver.trim(),
            message: message.trim()
        };
    });
    return data;
}

function generatePuml(data) {
    let puml = "@startuml\n";
    data.forEach((row) => {
        puml += `${row.sender} ${row.arrow} ${row.receiver} : ${row.message}\n`;
    });
    puml += "@enduml";
    return puml;
}

module.exports = {
    generateDesign
};