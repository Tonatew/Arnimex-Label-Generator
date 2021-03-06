var selectedTexel = "none";

const texelSizes = {
  small: 128,
  medium: 256,
  large: 512,
};

function changePrintSize() {
  var selectedSize = document.getElementById("sizeSelect").value;

  document.getElementById("printWidth").value = pageSizes[selectedSize].width;
  document.getElementById("printHeight").value = pageSizes[selectedSize].height;

  configurePrintArea();
}

function changeTexel(imgElement) {
  selectedTexel = imgElement.src;
  printArea.style.backgroundImage = `url("${selectedTexel}")`;
  configurePrintArea();
  location.href = "#";
  location.href = "#page";
}

function changeTexelSize() {
  console.log("Chaging Texel Size");
  let printArea = document.getElementById("printArea");
  let selectedSize = document.getElementById("texelSize").value;
  printArea.style.backgroundSize = `${texelSizes[selectedSize]}px`;
  console.log(printArea.style.backgroundSize);
}

function configurePrintArea() {
  var printArea = document.getElementById("printArea");
  let width = document.getElementById("printWidth").value;
  let height = document.getElementById("printHeight").value;

  //Set page size
  printArea.style.width = `${width}cm`;
  printArea.style.height = `${height}cm`;
}

function loadPatterns() {
  let gallery = document.querySelector(".gallery");

  for (const [key, path] of Object.entries(patterns)) {
    galleryItem = document.createElement("img");
    galleryItem.onclick = function () {
      changeTexel(this);
    };
    galleryItem.src = path;
    galleryItem.setAttribute("class", "galleryItem");

    gallery.appendChild(galleryItem);
  }
}

function saveAsPDF() {
  //page orientation and elements count calculation
  var element = document.getElementById("printArea");
  var selectedSize = document.getElementById("sizeSelect").value;
  console.log(pageSizes[selectedSize].jsPDF);

  var opt = {
    margin: 0,
    filename: "Plantilla.pdf",
    image: { type: "png", quality: 1 },
    html2canvas: { scale: 2 },
    jsPDF: {
      unit: "cm",
      format: pageSizes[selectedSize].jsPDF,
      orientation: "portrait",
    },
  };

  // New Promise-based usage:
  html2pdf().set(opt).from(element).save();
}

function toDataURL() {
  let url = getComputedStyle(printArea).backgroundImage;
  url = url.slice(5, url.length - 2);
  return fetch(url)
    .then((response) => {
      return response.blob();
    })
    .then((blob) => {
      return URL.createObjectURL(blob);
    });
}

async function downloadTexel() {
  const a = document.createElement("a");
  a.href = await toDataURL();
  a.download = "patron";
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
}

function goToConfig() {
  location.href = "#";
  location.href = "#configPattern";
}

document.addEventListener("DOMContentLoaded", () => {
  changePrintSize();
  loadPatterns();
  configurePrintArea();
});
