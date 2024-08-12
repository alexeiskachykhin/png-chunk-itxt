import assert from "assert";

import { encodeSync, decodeSync } from "../src/index";

describe("decodeSync", () => {
  it("given correct iTXt chunk it decodes it", () => {
    const expected = {
      keyword: "metadata",
      compressionFlag: false,
      compressionMethod: 0,
      languageTag: "EN",
      translatedKeyword: "Keyword translation",
      text: "Your text metadata"
    };

    const actual = decodeSync(encodeSync(expected));

    assert.deepStrictEqual(actual, expected);
  });

  it("given incorrect iTXt chunk it throws an error", () => {
    assert.throws(() => {
      decodeSync(Uint8Array.from([23, 0]));
    }, new RangeError("Offset is outside the bounds of the DataView"));
  });

  it("given compressed iTXt chunk it decompresses it", () => {
    const expected = {
      keyword: "metadata",
      compressionFlag: true,
      compressionMethod: 0,
      languageTag: "",
      translatedKeyword: "",
      text: "Your text metadata"
    };

    const actual = decodeSync(encodeSync(expected));

    assert.deepStrictEqual(actual, expected);
  });
});
