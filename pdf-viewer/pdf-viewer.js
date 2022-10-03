function makeItDraggable(divId) {
  const div = document.getElementById(divId);
  let initX, initY, firstX, firstY, touch, contact;

  function dragIt(e) {
    this.style.left = initX + e.pageX - firstX + "px";
    this.style.top = initY + e.pageY - firstY + "px";
  }

  function swipeIt(e) {
    contact = e.touches;
    this.style.left = initX + contact[0].pageX - firstX + "px";
    this.style.top = initY + contact[0].pageY - firstY + "px";
  }

  div.addEventListener(
    "mousedown",
    function (e) {
      e.preventDefault();
      initX = this.offsetLeft;
      initY = this.offsetTop;
      firstX = e.pageX;
      firstY = e.pageY;

      div.addEventListener("mousemove", dragIt, false);

      window.addEventListener(
        "mouseup",
        function () {
          div.removeEventListener("mousemove", dragIt, false);
        },
        false
      );
    },
    false
  );

  div.addEventListener(
    "touchstart",
    function (e) {
      e.preventDefault();
      initX = this.offsetLeft;
      initY = this.offsetTop;
      touch = e.touches;
      firstX = touch[0].pageX;
      firstY = touch[0].pageY;

      div.addEventListener("touchmove", swipeIt, false);

      window.addEventListener(
        "touchend",
        function (e) {
          e.preventDefault();
          div.removeEventListener("touchmove", swipeIt, false);
        },
        false
      );
    },
    false
  );
}

makeItDraggable("pdf-viewer-modal");

/**
 *
 * @param {string} url - iserver url
 * @returns
 */
async function fetchPdf(url) {
  const res = await fetch(url);

  const data = await res.arrayBuffer();

  return `data:application/pdf;base64, ${btoa(
    String.fromCharCode(...new Uint8Array(data))
  )}`;
}

/**
 * @param {string} url - pdf link url
 */
async function showPdf(url) {
  const closeBtn = document.getElementById("close-pdf");
  closeBtn.replaceWith(closeBtn.cloneNode(true));

  const content = document.getElementById("pdf-content");
  content.removeChild(content.firstChild);

  const pdfUrl = new URL(url).pathname.split("/");
  let pdfTItle = pdfUrl[pdfUrl.length - 1];

  if (!pdfTItle.includes(".pdf")) {
    pdfTItle = "Attachment";
  }

  const embed = document.createElement("embed");
  embed.setAttribute("type", "application/pdf");
  embed.setAttribute("title", pdfTItle);

  const data64 = await fetchPdf(url);
  embed.setAttribute("src", data64);

  content.appendChild(embed);

  document.getElementById("pdf-viewer-modal").classList.add("visible");
  document.getElementById("pdf-title").innerText = pdfTItle;

  document.getElementById("close-pdf").addEventListener("click", () => {
    document.getElementById("pdf-viewer-modal").classList.remove("visible");
  });
}
