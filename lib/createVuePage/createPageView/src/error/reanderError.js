export default class RenderError extends Error {
  constructor(e) {
    super(e);
    this.name = RenderError
  }
}
