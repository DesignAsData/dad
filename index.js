
const fs = require('fs');

// Extractor
const extractor = require('./extractor.js');

const in_design_dir = "./design/in";
const in_design_files = [
    "seq1.puml"
]
const out_data_dir = "./data/out";
let out_data_files = [];

in_design_files.forEach((in_design_file) => {
    const design = fs.readFileSync(`${in_design_dir}/${in_design_file}`, 'utf8');
    let data = extractor.extractData(design);
    const data_file = `${in_design_file.replace('.puml', '.csv')}`;
    out_data_files.push(data_file);
    fs.writeFileSync(`${out_data_dir}/${data_file}`, data, 'utf8');
});
console.log(`Generated data files: \n- ${out_data_files.join('\n- ')}`);


// Generator

const generator = require('./generator.js');

const in_data_dir = "./data/in";
const in_data_files = [
    "seq1.csv"
];
const out_design_dir = "./design/out";
const out_design_files = [];

in_data_files.forEach((in_data_file) => {
    var data = fs.readFileSync(`${in_data_dir}/${in_data_file}`, 'utf8');
    const design = generator.generateDesign(data);
    const out_design_file = `${in_data_file.replace('.csv', '.puml')}`;
    out_design_files.push(out_design_file);
    fs.writeFileSync(`${out_design_dir}/${out_design_file}`, design, 'utf8');
});
console.log(`Generated design files: \n- ${out_design_files.join('\n- ')}`);