/**
 * Format Table of contents items.
 */

function renderSubcontents(contents, c) {
  return `
    <div class="list">
      ${contents.map(q => `<a data-lid="${++c.counter}" class="item${getTimerClass(q)}" href="${q.url}">${q.title}</a>`).join("")}
    </div>
  `;
}

//generate html for Contents
export function format(book, unit, cntr) {

  //${unit.contents ? renderSubcontents(unit.contents, cntr) : ""}
  let html = `
      <div class="item">
        <a data-lid="${++cntr.counter}" class="" href="${unit.url}">${unit.title}</a>
      </div>
    `;

  return html;
}

