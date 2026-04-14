module.exports = {
  toSnakeCase: function (string) {
    return string?.toLowerCase()?.replaceAll(" ", "_");
  }
}
