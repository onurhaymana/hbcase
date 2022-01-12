import { sorter, paginator, flattenArray, priceFormat } from "./index";

const a = { id: 1, salePrice: 1, createdDate: "2021-08-20T00:00:00.000Z" };
const b = { id: 2, salePrice: 2, createdDate: "2020-08-20T00:00:00.000Z" };

describe("unit tests for sorter function", () => {
  it("should sort by newest date first", () => {
    const func = sorter("NEWEST_FIRST");
    expect(func(a, b)).toEqual(1);
    expect(func(b, a)).toEqual(-1);
  });

  it("should sort by oldest date first", () => {
    const func = sorter("OLDEST_FIRST");
    expect(func(a, b)).toEqual(-1);
    expect(func(b, a)).toEqual(1);
  });

  it("should sort by ascending price", () => {
    const func = sorter("PRICE_ASCENDING");
    expect(func(a, b)).toEqual(-1);
    expect(func(b, a)).toEqual(1);
  });

  it("should sort by descending price", () => {
    const func = sorter("PRICE_DESCENDING");
    expect(func(a, b)).toEqual(1);
    expect(func(b, a)).toEqual(-1);
  });

  it("should not sort", () => {
    const func = sorter("");
    expect(func(a, b)).toEqual(-1);
    expect(func(b, a)).toEqual(1);
  });
});

describe("unit tests for paginator function", () => {
  const arr = [a, b];
  it("should paginate the array", () => {
    expect(paginator(arr)).toEqual([arr]);
  });
});

describe("unit tests for flattenArray function", () => {
  const arr = [
    [a, b],
    [b, a],
  ];
  it("should flatten array", () => {
    expect(flattenArray(arr)).toEqual([a, b, b, a]);
  });
});

describe("unit tests for priceFormat function", () => {
  const price = 19.23;

  it("should return formatted price with default suffix", () => {
    expect(priceFormat(price)).toEqual("19,23 TL");
  });

  it("should return formatted price with custom prefix", () => {
    expect(priceFormat(price, "$", "")).toEqual("$19,23");
  });

  it("should return formatted price with custom suffix", () => {
    expect(priceFormat(price, "", " €")).toEqual("19,23 €");
  });
});
