const xmlData = `
<list>
  <student>
    <name lang="en">
      <first>Ivan</first>
      <second>Ivanov</second>
    </name>
    <age>35</age>
    <prof>teacher</prof>
  </student>
  <student>
    <name lang="ru">
      <first>Петр</first>
      <second>Петров</second>
    </name>
    <age>58</age>
    <prof>driver</prof>
  </student>
</list>
`;

const parser = new DOMParser();
const doc = parser.parseFromString(xmlData, 'application/xml');
const list = doc.querySelector('list');
const res = {
  list: [],
};

function Student(node) {
  const name = node.getElementsByTagName('name')[0];
  this.name = `${name.getElementsByTagName('first')[0].textContent} 
                ${name.getElementsByTagName('second')[0].textContent}`;
  this.age = node.querySelector('age').textContent;
  this.prof = node.querySelector('prof').textContent;
  this.lang = name.getAttribute('lang');
}

for (const node of list.children) {
  res.list.push(new Student(node));
};

console.log(res);
