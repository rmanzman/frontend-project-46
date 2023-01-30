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
	npm test
test-coverage:
	npm test -- --coverage
