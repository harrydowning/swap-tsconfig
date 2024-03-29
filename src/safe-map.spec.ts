import { SafeMap } from "./safe-map";

describe("safe-map", () => {
  const key = "key";
  const valueFactory = () => "new value";
  const valueFactorySpy = jest.fn(valueFactory);

  it("returns a new value for a key not already in the map using the value factory", () => {
    const safeMap = new SafeMap(valueFactorySpy);
    expect(safeMap.get(key)).toEqual(valueFactory());
    expect(valueFactorySpy).toHaveBeenCalledTimes(1);
  });

  it("returns the existing value for a key already in the map", () => {
    const safeMap = new SafeMap(valueFactorySpy);
    const existingValue = "existing value";
    safeMap.set(key, existingValue);
    expect(safeMap.get(key)).toEqual(existingValue);
    expect(valueFactorySpy).toHaveBeenCalledTimes(0);
  });

  it("extends the inbuilt Map class", () => {
    expect(new SafeMap(valueFactory)).toBeInstanceOf(Map);
  });

  it("can be pre-populated on construction", () => {
    const entries: [string, string][] = [["key", "value"]];
    const safeMap = new SafeMap(valueFactory, entries);
    expect([...safeMap.entries()]).toStrictEqual(entries);
  });
});
