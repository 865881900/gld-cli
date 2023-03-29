export class GenVueFileError extends Error{
  constructor(...args) {
    super(...args);
    this.name = 'GenVueFile';
  }
}
