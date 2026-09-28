
// Extracting data from design
// Supports
//   - puml 
//     - message lines

function extractData(design) {
    let jsonData = parsePuml(design);
    var csvData = convertJsonToCsv(jsonData);
    return csvData;
}

function parsePuml(content) {
    const data = [];
    const messageLineRegex = /^\s*(.+?)\s+(<[-.ox*]+|[-.ox*]+>|[-.ox*]+[x+])\s+(.+?)\s*:\s*(.*)$/;
    let lines = content.split(/\r?\n/);
    lines.forEach((line) => {
        const match = line.match(messageLineRegex);
        if (match) {
            const [fullMatch, sender, arrow, receiver, message] = match;
            log(`fullmatch: ${fullMatch}`);
            data.push({
                sender: sender.trim(),
                arrow: arrow,
                receiver: receiver.trim(),
                message: message.trim()
            });
        } else {
            log(`No match for line: ${line}`);
        }
    });
    return data;
}

function convertJsonToCsv(data) {
    const csvContent = data.map((row) => {
        var line = `${row.sender},${row.arrow},${row.receiver},${row.message}`;
        log(line);
        return line;
    }).join('\n');
    return csvContent;
}

function log(message) {
    // console.log(message);
}

module.exports = {
    extractData
};