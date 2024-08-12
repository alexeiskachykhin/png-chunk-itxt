# png-chunk-itxt

Create or parse a PNG iTXt chunk for storing international text data in PNG images.

Can be used in combination with [png-chunks-extract](https://github.com/hughsk/png-chunks-extract) and [png-chunks-encode](https://github.com/hughsk/png-chunks-encode) for reading and adding metadata to PNG images.

## Usage

```
import { encodeSync, decodeSync } from 'png-chunk-itxt';
```

### Decode chunk

```typescript
import extract from "png-chunks-extract";
import { decodeSync } from "png-chunk-itxt";

const buffer = fs.readFileSync("test.png");
const chunks = extract(buffer);
const iTxtChunk = chunks.find(c => c.name === "iTXt");

const iTxtData = decodeSync(iTxtChunk.data);

// Output

{
    keyword: "metadata",
    compressionFlag: false,
    compressionMethod: 0,
    languageTag: "",
    translatedKeyword: "",
    text: "Your text metadata"
}
```

### Encode chunk

```typescript
import extract from "png-chunks-extract";
import encode from "png-chunks-encode";
import { encodeSync } from "png-chunk-itxt";

const buffer = fs.readFileSync("test.png");
const chunks = extract(buffer);

const iTxtChunk = {
  name: "iTXt",
  data: encodeSync({
    keyword: "metadata",
    compressionFlag: false,
    compressionMethod: 0,
    languageTag: "",
    translatedKeyword: "",
    text: "Your text metadata"
  })
};

// Insert iTXt chunk before the first IDAT chunk
chunks.splice(
  chunks.findIndex(p => p.name === "IDAT"),
  0,
  iTxtChunk
);

fs.writeFileSync("test-out.png", Buffer.from(encode(chunks)));
```

## See Also

- [png-chunks-extract](https://github.com/hughsk/png-chunks-extract)
- [png-chunks-encode](https://github.com/hughsk/png-chunks-encode)
- [png-chunk-text](https://github.com/hughsk/png-chunk-text)
