install:
	npm ci
link:
	npm link
publish:
	npm publish --dry-run
lint:
	npx eslint .
gendiff:
	node bin/gendiff.js
test:
	NODE_OPTIONS=--experimental-vm-modules NODE_NO_WARNINGS=1 npx jest
test-coverage:
	NODE_OPTIONS=--experimental-vm-modules NODE_NO_WARNINGS=1 npx jest --coverage