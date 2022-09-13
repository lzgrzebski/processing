class MockImageData {
    constructor(data, width, height) {
        this.data = data;
        this.width = width;
        this.height = height;
    }
}

globalThis.ImageData = MockImageData;
