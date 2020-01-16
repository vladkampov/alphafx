// Function validates the HEX colours
export default string => /^#[0-9A-F]{6}$/i.test(`#${string}`);
