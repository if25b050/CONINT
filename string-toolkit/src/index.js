module.exports = {
  toSnakeCase: function (string) {
    return string?.toLowerCase()?.replaceAll(" ", "_");
  },
   toKebabCase: function (string) {
    return string?.toLowerCase()?.replaceAll(" ", "-");
  }
}
