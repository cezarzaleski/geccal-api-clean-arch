#!/bin/sh

npm run cti create './src/@shared/application' -- -i '*spec.ts' -b &&
npm run cti create './src/@shared/domain' -- -i '*spec.ts' -b &&

npm run cti create './src/loan/application' -- -i '*spec.ts' -b &&
npm run cti create './src/loan/domain' -- -i '*spec.ts' -b &&

npm run cti create './src/collection/application' -- -i '*spec.ts' -b &&
npm run cti create './src/collection/domain' -- -i '*spec.ts' -b &&
npm run cti create './src/collection/infra' -- -i '*spec.ts' -b &&

npm run cti create './src/enrollment/application' -- -i '*spec.ts' -b &&
npm run cti create './src/enrollment/domain' -- -i '*spec.ts' -b &&
npm run cti create './src/enrollment/infra' -- -i '*spec.ts' -b
