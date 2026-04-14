# @if25b050/string-toolkit

> This is a library with some simple string manipulation functions.

## Table of Contents

- [Installation](#installation)
- [Usage](#usage)
- [Contribution](#contribution)
- [Security](#security)
- [License](#license)

## Installation

Install via npm:

```bash
npm install @if25b050/string-toolkit
```
Install via yarn:

```bash
yarn add @if25b050/string-toolkit
```

## Usage

Basic Usage

```js
import * as stringToolkit from '@if25b050/string-toolkit';

const string = "Hello World!";
const snakeString = stringToolkit.toSnakeCase(string);
const kebabString = stringToolkit.toKebabCase(string);

console.log(string);       // e.g., "Hello World!"
console.log(snakeString); // e.g., "hello_world!"
console.log(kebabString); // e.g., "hello-world!"
```

## Contribution

Contributions are welcome! Please see [CONTRIBUTING.md](/string-toolkit/CONTRIBUTING.md) for more details.

## Security

Please refer to our [SECURITY.md](/string-toolkit/SECURITY.md) for information about our security policies, how to report vulnerabilities, and our approach to handling security concerns.

## License

This project is licensed under the [MIT License](/string-toolkit/LICENSE.md).
