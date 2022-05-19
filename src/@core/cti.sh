#!/bin/sh

npm run cti create './src/@shared/application' -- -i '*spec.ts' -b &&
npm run cti create './src/@shared/domain' -- -i '*spec.ts' -b &&
npm run cti create './src/@shared/infra' -- -i '*spec.ts' -b &&

npm run cti create './src/book/application' -- -i '*spec.ts' -b &&
npm run cti create './src/book/domain' -- -i '*spec.ts' -b &&
npm run cti create './src/book/infra' -- -i '*spec.ts' -b &&

npm run cti create './src/acervo/autor/application' -- -i '*spec.ts' -b &&
npm run cti create './src/acervo/autor/domain' -- -i '*spec.ts' -b
npm run cti create './src/acervo/autor/domain' -- -i '*spec.ts' -b