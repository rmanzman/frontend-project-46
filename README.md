### Hexlet tests and linter status:
[![Actions Status](https://github.com/rmanzman/frontend-project-46/workflows/hexlet-check/badge.svg)](https://github.com/rmanzman/frontend-project-46/actions)
[![Maintainability](https://api.codeclimate.com/v1/badges/2690700a2c00f5bce7e3/maintainability)](https://codeclimate.com/github/rmanzman/frontend-project-46/maintainability)
[![Test Coverage](https://api.codeclimate.com/v1/badges/2690700a2c00f5bce7e3/test_coverage)](https://codeclimate.com/github/rmanzman/frontend-project-46/test_coverage)
[![Tests](https://github.com/rmanzman/frontend-project-46/actions/workflows/gendiff.yml/badge.svg)](https://github.com/rmanzman/frontend-project-46/actions/workflows/gendiff.yml)

## Gendiff 
***

### Description:
Gendiff is a CLI utility compares two configuration files and shows a difference.

### System requirements and Installation guide:
Make sure you have Node.js (14.0.x.x or higher) and npm installed.

1. Clone the project
```bash
git clone https://github.com/rmanzman/frontend-project-46.git
```
2. Install the project
```bash
cd frontend-project-46
npm ci
```
3. Install dependencies
```bash
npm link
```

### Usage
```
Usage: gendiff [options] <filepath1> <filepath2>

Compares two configuration files and shows a difference.

Options:
  -V, --version        output the version number
  -f, --format <type>  output format (default: "stylish")
  -h, --help           display help for command
```

### Supported files and formats
Input formats: **.json, .yaml, .yml**.  
Output formats: **stylish, plain, JSON**.

### Usage examples and demonstration
For stylish output:
```bash
gendiff path/to/file1.json path/to/file2.json
```
or
```bash
gendiff -f stylish path/to/file1.json path/to/file2.json
```

Stylish output demonstration:
[![asciicast](https://asciinema.org/a/f3hz8UmzipMi7VSbBE58u6nM2.svg)](https://asciinema.org/a/f3hz8UmzipMi7VSbBE58u6nM2)

For plain output:
```bash
gendiff -f plain path/to/file1.json path/to/file2.json
```

Plain output demonstration:
[![asciicast](https://asciinema.org/a/FdZzW1c3wp4767KgVc10v8uma.svg)](https://asciinema.org/a/FdZzW1c3wp4767KgVc10v8uma)

For JSON output:
```bash
gendiff -f json path/to/file1.json path/to/file2.json
```

JSON output demonstration:
[![asciicast](https://asciinema.org/a/KkaQllbvmpATilKNn9Jey50Cz.svg)](https://asciinema.org/a/KkaQllbvmpATilKNn9Jey50Cz)