#!/bin/sh

npm run cti create './src/@shared/domain' -- -i '*spec.ts' -b &&
npm run cti create './src/book/domain' -- -i '*spec.ts' -b &&
npm run cti create './src/acervo/livro/domain' -- -i '*spec.ts' -b
