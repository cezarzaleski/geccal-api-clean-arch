#!/bin/sh

npm run cti create './src/@shared/application' -- -i '*spec.ts' -b &&
npm run cti create './src/@shared/domain' -- -i '*spec.ts' -b &&
npm run cti create './src/@shared/infra' -- -i '*spec.ts' -b &&

npm run cti create './src/book/application' -- -i '*spec.ts' -b &&
npm run cti create './src/book/domain' -- -i '*spec.ts' -b &&
npm run cti create './src/book/infra' -- -i '*spec.ts' -b &&

npm run cti create './src/collection/application' -- -i '*spec.ts' -b &&
npm run cti create './src/collection/domain' -- -i '*spec.ts' -b &&
npm run cti create './src/collection/infra' -- -i '*spec.ts' -b
