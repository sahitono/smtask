### Requirement
1. Bootstrap 5

### Usage

1. Copy pdf card in index.html

```html
    <div id="pdf-viewer-modal">
        <div class="pdf-header">
            <div id="pdf-title">PDF Name</div>
            <div>
                <button id="close-pdf" type="button" class="btn btn-secondary btn-sm">Close</button>

            </div>

        </div>

        <div id="pdf-content">
            <embed type="application/pdf" title="PDF Demo" src="https://viewerjs.org/demodoc.pdf"></embed>
        </div>
    </div>
```

2. Put `pdf-viewer.css` in head and `pdf-viewer.js` in body

3. Call function `showPdf` with the pdf url as parameter

```js
showPdf("https://viewerjs.org/demodoc.pdf");
```