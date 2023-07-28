// @ts-check

import "./main.css";

const generateToC = () => {
  const root = document.body;
  const headings = root.querySelectorAll("h1, h2, h3, h4, h5, h6");

  const tocContainer = document.getElementById("table-of-contents-list");

  if (!tocContainer) {
    throw new Error("Table of Contents container not found.");
  }

  let higherContainers = [tocContainer];
  let higherIds = [];

  headings.forEach((heading) => {
    let level = parseInt(heading.localName.replace("h", ""));
    let title = heading.textContent;

    let selfId = (heading.textContent || "").toLowerCase().replace(/ /g, "-");
    higherIds[level - 1] = selfId;

    let formattedId = [...higherIds.slice(0, level - 1), selfId].join("-");

    heading.setAttribute("id", formattedId);

    let link = document.createElement("a");
    link.setAttribute("href", "#" + formattedId);
    link.textContent = title;

    let item = document.createElement("li");
    item.appendChild(link);

    if (level == 1) {
      tocContainer.appendChild(item);
    } else {
      higherContainers[level - 1] = document.createElement("ul");
      higherContainers[level - 1].appendChild(item);
      higherContainers[level - 2].appendChild(higherContainers[level - 1]);
    }
  });
};

generateToC();
