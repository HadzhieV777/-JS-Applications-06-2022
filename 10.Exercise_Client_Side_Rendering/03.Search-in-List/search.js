import { html, render } from '../node_modules/lit-html/lit-html.js';

import { towns } from './towns.js';

const townsContainer = document.getElementById('towns');
const input = document.getElementById('searchText');
const button = document.querySelector('button');
const result = document.getElementById('result');

const townTemplate = (towns) => html`
<ul>
   ${towns.map(town => html`<li>${town}</li>`)}
</ul>
`;

render(townTemplate(towns), townsContainer);

function search(e) {
  if (input.value != '') {
   const list = [...townsContainer.querySelectorAll('li')];
   list.forEach(t => t.className = '');
   result.textContent = '';

   const matches = list.filter(e => e.textContent.toLowerCase().includes(input.value.toLowerCase()));
   matches.forEach(m => m.className = 'active');
   result.textContent = `${matches.length} matches found`;
   // input.value = ''
  }
}

button.addEventListener('click', search);